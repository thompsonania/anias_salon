import {pool} from '../data/database.js';

export const createSrvc_employee = async (req, res, _next) => {

    let sqlQuery = 
    `INSERT INTO srvc_employee 
     (service_id, employee_id)
     VALUES (?, ?)
    `;
    const [srvc_employee] = await pool.query(sqlQuery, 
        [req.body.service_id, req.body.employee_id]
    );
    if(srvc_employee.length <= 0) {
        res.status(400).json({
            status: 'error', 
            message: 'Unable To Create Record'
        });
    } else {    
        res.status(200).json({
            status: 'success',
            recordId: srvc_employee.insertId
        });
    }
}



export const getAllSrvc_employees = async (req, res, next) => {
    let sqlQuery = `
            SELECT 
                srvc.style_nm, srvc.price, 
                empl.frst_nm, empl.last_nm, 
                emplsv.id, emplsv.service_id, emplsv.employee_id
            FROM 
                service srvc, employee empl, srvc_employee emplsv
            WHERE 
                emplsv.service_id = srvc.id
                 AND emplsv.employee_id = empl.id
                `;
    const [srvc_employees] = await pool.query(sqlQuery);
    if(srvc_employees.length > 0) {
        res.status(200).json({
            status: 'success',
            results: srvc_employees.length,
            data: { srvc_employees: srvc_employees}
        });
    } else {    
        res.status(404).json({
            status: 'error',
            message: 'Server error'
        });
    }
}
export const getAllSrvc_employeesById = async (req, res, next) => {
    let id = req.params.id;
    let sqlQuery = `
            SELECT 
                srvc.style_nm, srvc.price, 
                empl.frst_nm, empl.last_nm, 
                emplsv.id, emplsv.service_id, emplsv.employee_id
            FROM 
                service srvc, employee empl, srvc_employee emplsv
            WHERE 
                emplsv.service_id = srvc.id
                 AND emplsv.employee_id = empl.id
                 And emplsv.service_id = ?
                `;
    const [srvc_employees] = await pool.query(sqlQuery, [id]);
    if(srvc_employees.length > 0) {
        res.status(200).json({
            status: 'success',
            results: srvc_employees.length,
            data: { srvc_employees: srvc_employees}
        });
    } else {    
        res.status(404).json({
            status: 'error',
            message: 'Server error'
        });
    }
}
export const getSingleSrvc_employee = async (req, res, next) => {
    const id = req.params.id;

    let sqlQuery = `
            SELECT 
                srvc.style_nm, srvc.price, 
                empl.frst_nm, empl.last_nm, 
                emplsv.id, emplsv.service_id, emplsv.employee_id
            FROM 
                service srvc, employee empl, srvc_employee emplsv
            WHERE emplsv.id = ?
                 AND emplsv.service_id = srvc.id
                 AND emplsv.employee_id = empl.id
                `;
    const [srvc_employees] = await pool.query(sqlQuery, [id]);
    console.log(`srvc_employees ${JSON.stringify(srvc_employees)}`);
    if(srvc_employees.length > 0) {
        res.status(200).json({
            status: 'success',
            data: { srvc_employees: srvc_employees[0]}
        });
    } else {    
        res.status(404).json({
            status: 'error',
            message: 'Server error'
        });
    }
}

export const updateSrvc_employee = async (req, res, next) => {
    // const id = req.params.id;

    let sqlQuery = 
    `UPDATE srvc_employee 
    SET service_id = ?, employee_id = ?

    WHERE id = ?
    `;
    const [srvc_employee] = await pool.query(sqlQuery, 
        [req.body.service_id, req.body.employee_id, req.params.id]
    );
    if(srvc_employee.affectedRows <= 0) {
        res.status(400).json({
            status: 'error', 
            // data: { srvc_employees: srvc_employee[0]}
        });
    } else {    
        res.status(200).json({
            status: 'success',
            affectedRows: srvc_employee.affectedRows
        });
    }
}
export const deleteSrvc_employee = async (req, res, next) => {
    const id = req.params.id;

    let sqlQuery = 
    `DELETE FROM srvc_employee 
     WHERE id = ?
    `;
    const [srvc_employee] = await pool.query(sqlQuery, [id]);

    if(srvc_employee.affectedRows <= 0) {
        res.status(400).json({
            status: 'error', 
            message: 'Unable To Delete Record'
        });
    } else {    
        res.status(200).json({
            status: 'success',
            affectedRows: srvc_employee.affectedRows
        });
    }
}