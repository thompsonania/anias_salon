import {pool} from '../data/database.js';

export const createEmployee = async (req, res, _next) => {

    let sqlQuery = 
    `INSERT INTO employee 
     (user_id, frst_nm, last_nm, status, position)
     VALUES (?, ?, ?, ?, ?)
    `;
    const [employee] = await pool.query(sqlQuery, 
        [req.body.user_id, req.body.frst_nm, req.body.last_nm, req.body.status, req.body.position]
    );
    if(employee.length <= 0) {
        res.status(400).json({
            status: 'error', 
            message: 'Unable To Create Record'
        });
    } else {    
        res.status(200).json({
            status: 'success',
            recordId: employee.insertId
        });
    }
}



export const getAllEmployees = async (req, res, next) => {
    let sqlQuery = `SELECT * FROM employee`;
    const [employees] = await pool.query(sqlQuery);
    if(employees.length > 0) {
        res.status(200).json({
            status: 'success',
            results: employees.length,
            data: { employees}
        });
    } else {    
        res.status(404).json({
            status: 'error',
            message: 'Server error'
        });
    }
}
export const getSingleEmployee = async (req, res, next) => {
    const id = req.params.id;

    let sqlQuery = `SELECT * FROM employee WHERE id = ?`;
    const [employees] = await pool.query(sqlQuery, [id]);
    if(employees.length > 0) {
        res.status(200).json({
            status: 'success',
            data: { employees: employees[0]}
        });
    } else {    
        res.status(404).json({
            status: 'error',
            message: 'Server error'
        });
    }
}

export const updateEmployee = async (req, res, next) => {
    // const id = req.params.id;

    let sqlQuery = 
    `UPDATE employee 
    SET user_id = ?, frst_nm = ?, last_nm = ?, status = ?, position = ?
    WHERE id = ?
    `;
    const [employee] = await pool.query(sqlQuery, 
        [req.body.user_id, req.body.frst_nm, req.body.last_nm, req.body.status, req.body.position, req.params.id]
    );
    if(employee.affectedRows <= 0) {
        res.status(400).json({
            status: 'error', 
            // data: { employees: employee[0]}
        });
    } else {    
        res.status(200).json({
            status: 'success',
            affectedRows: employee.affectedRows
        });
    }
}
export const deleteEmployee = async (req, res, next) => {
    const id = req.params.id;

    let sqlQuery = 
    `DELETE FROM employee 
     WHERE id = ?
    `;
    const [employee] = await pool.query(sqlQuery, [id]);

    if(employee.affectedRows <= 0) {
        res.status(400).json({
            status: 'error', 
            message: 'Unable To Delete Record'
        });
    } else {    
        res.status(200).json({
            status: 'success',
            affectedRows: employee.affectedRows
        });
    }
}