import {pool} from '../data/database.js';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';

function signJWTToken(user){
    return JWT.sign({
        id: user.id,
        email: user.email,
        role: user.role
       },process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    
    });
}
async function userExists(email) {
        let sqlQuery = `
        SELECT * FROM user_login 
        WHERE email = ?
        `;
        const [user] =await pool.query(sqlQuery, [email]);
        if(user.length > 0) {
            return true;
        } else {
            return false;
        }


}

export const createAdminUser = async (req, res) => {
    const {email, password, role, frst_nm, last_nm} = req.body;
    if(await userExists(email)) {
        res.status(400).json({
            status: 'error',
            message: 'User already exists'
        });
            return;
        }

    const pwd = bcrypt.hashSync(password, 12);
    let sqlQuery = `
    INSERT INTO user_login 
        (email, password, role, frst_nm, last_nm)
    VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query(sqlQuery,
        [
            email, pwd, role, frst_nm, last_nm
        ]
    );
    if(result.affectedRows > 0) {
        res.status(200).json({
            status: 'success',
            InsertedID: result.insertId
        });
    }else{
        res.status(400).json({
            status: 'error',
            message: 'error creating user'
    });
        
    }
}

export const registerUser = async (req, res) => {
    const {email, password, frst_nm, last_nm, phne_nbr, gender} = req.body;
    if(await userExists(email)) {
        res.status(400).json({
            status: 'error',
            message: 'User already exists'
        });
            return;
        }

    // let role = 'customer';    
    const pwd = bcrypt.hashSync(password, 12);
    let sqlQuery = `
    INSERT INTO user_login 
        (email, password, frst_nm, last_nm, role)
    VALUES (?, ?, ?, ?,?)
    `;
    const [result] = await pool.query(sqlQuery,
        [
            email, pwd, frst_nm, last_nm, role
        ]
    );
    if(result.affectedRows > 0) {
        let custQuery = `
                    INSERT INTO customer(email, frst_nm, last_nm, phne_nbr, gender, user_id)
                    VALUES (?, ?, ?, ?, ?, ?)
        `
        const [cust] = await pool.query(custQuery, [
            email, frst_nm, last_nm, phne_nbr, gender, result.insertId
        ]);
        const token = signJWTToken({ id: result.insertId, email: email, role: 'customer'});
        const data = req.body;
        data.password = undefined;

        res.status(200).json({
            status: 'success',
            data: {
                token: token,
                customer: data
            }
            
        });
    }else{
        res.status(400).json({
            status: 'error',
            message: 'error creating user'
    });
        
    }
}

export const loginUser = async (req, res) => {
    const {email, password} = req.body;
    let sqlQuery = `SELECT * FROM user_login WHERE email = ?`;
    const [result] = await pool.query(sqlQuery,
        [
            email
        ]
    );
    
    if(!result.length) {
       return res.status(404).json({
        status: 'error',
        message: 'User does not exist'
       });
    } 
    if(!(await bcrypt.compare(password, result[0].password))){
        return res.status(404).json({
            status: 'error',
            message: 'Invalid login credentials'
        });
    }
    let role = result[0].role;
    let loggedInUserQuery = `SELECT * FROM employee WHERE user_id = ?`;
    // if(role === 'employee'){
    //     loggedInUserQuery = `SELECT * FROM employee WHERE user_id = ?`;
    // }
    // if(role === 'stylist'){
    //     loggedInUserQuery = `SELECT * FROM employee WHERE user_id = ?`;
    // }
    // if(role === 'customer' || role === 'Customer'){
    //     loggedInUserQuery = `SELECT * FROM customer WHERE user_id = ?`;
    // }
    const [loggedInUser] = await pool.query(loggedInUserQuery, [result[0].id]);
    const token = signJWTToken({id: result[0].id, email: email, role: result[0].role});
    result[0].password =undefined;
    res.status(200).json({
        status:'success',
        data: {
            token: token,     
            user: result[0], 
            loggedInUser: loggedInUser[0]
        }
    });
}




export const protect = async (req, res, next) => {
    const authorization = req.get('Authorization');
    if(!authorization?.startsWith('Bearer'))
        return res.status(401).json({
            status: 'error',
            message: 'Not Authorized'
        });
    const token = authorization.split(' ')[1];
    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET);
        let strQuery = `SELECT * FROM user_login WHERE id = ?`
        const [user] = await pool.query(strQuery, [decoded.id]);
        if(!user.length) {
            return res.status(401).json({
                status: 'error',
                message: 'Token no longer valid'
            });
        }
       
        user[0].password = undefined;
        //Special User Variable attached to the Request
        req.user = user[0];
        next();
    }catch (e) {
        // console.log(`  PROTECT -> Catch ERROR >> ${e.message}`);
        if(e.message == 'jwt expired'){
            return res.status(401).json({
                status: 'error',
                nessage: 'Token expired'
            });

        }
        next();
    }
}

export const getThisUser = async (req, res, next) => {
    const data = req.user;
    console.log(`DATA: ${JSON.stringify(data)}`)
    if(!data)
    
        return next();
    data.password = undefined;
    let strQuery = `SELECT * FROM user_login WHERE id = ?`
    const [user] =await pool.query(strQuery, [data.id]);

    if(!user.length) {
        return res.status(401).json({
            status: 'error',
            message: 'Invalid request'
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            user: user[0],
            // loggedInUser: loggedInUser[0]
        }
    });
    // let role = user[0].role;
    // let loggedInUserQuery = '';
    // if(role === 'employee'){
    //     loggedInUserQuery = `SELECT * FROM employee WHERE user_id = ?`;
    // }
    // if(role === 'Stylist'){
    //     loggedInUserQuery = `SELECT * FROM employee WHERE user_id = ?`;
    // }
    // if(role === 'customer' || role === 'Customer'){
    //     loggedInUserQuery = `SELECT * FROM customer WHERE user_id = ?`;
    // }
    // const [loggedInUser] = await pool.query(loggedInUserQuery, [user[0].id]);
    //     //next();
    //     user[0].password = undefined;
    //     return 
    }

   