import {pool} from '../data/database.js';

export const createCustomer = async (req, res, _next) => {
    

    let sqlQuery = 
    `INSERT INTO customer 
     (frst_nm, last_nm, Email, phne_nbr, Gender)
     VALUES (?, ?, ?, ?, ?)
    `;
    const [customer] = await pool.query(sqlQuery, 
        [req.body.frst_nm, req.body.last_nm, req.body.Email, req.body.phne_nbr, req.body.Gender]
    );
    if(customer.length <= 0) {
        res.status(400).json({
            status: 'error', 
            message: 'Unable To Create Record'
        });
    } else {    
        res.status(200).json({
            status: 'success',
            recordId: customer.insertId
        });
    }
}



export const getAllCustomers = async (req, res, next) => {
    let sqlQuery = `SELECT * FROM customer`;
    const [customers] = await pool.query(sqlQuery);
    if(customers.length > 0) {
        res.status(200).json({
            status: 'success',
            results: customers.length,
            data: { customers}
        });
    } else {    
        res.status(404).json({
            status: 'error',
            message: 'Server error'
        });
    }
}
export const getSingleCustomer = async (req, res, next) => {
    const id = req.params.id;

    let sqlQuery = `SELECT * FROM customer WHERE id = ?`;
    const [customers] = await pool.query(sqlQuery, [id]);
    if(customers.length > 0) {
        res.status(200).json({
            status: 'success',
            data: { customers: customers[0]}
        });
    } else {    
        res.status(404).json({
            status: 'error',
            message: 'Server error'
        });
    }
}

export const updateCustomer = async (req, res, next) => {
    // const id = req.params.id;

    let sqlQuery = 
    `UPDATE customer 
    SET frst_nm = ?, last_nm = ?, Email = ?, phne_nbr = ?, Gender = ?
    WHERE id = ?
    `;
    const [customer] = await pool.query(sqlQuery, 
        [req.body.frst_nm, req.body.last_nm, req.body.Email, req.body.phne_nbr, req.body.Gender, req.params.id]
    );
    if(customer.affectedRows <= 0) {
        res.status(400).json({
            status: 'error', 
            
        });
    } else {    
        res.status(200).json({
            status: 'success',
            affectedRows: customer.affectedRows
        });
    }
}
export const deleteCustomer = async (req, res, next) => {
    const id = req.params.id;

    let sqlQuery = 
    `DELETE FROM customer 
     WHERE id = ?
    `;
    const [customer] = await pool.query(sqlQuery, [id]);

    if(customer.affectedRows <= 0) {
        res.status(400).json({
            status: 'error', 
            message: 'Unable To Delete Record'
        });
    } else {    
        res.status(200).json({
            status: 'success',
            affectedRows: customer.affectedRows
        });
    }
}