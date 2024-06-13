import {pool} from '../data/database.js';

export const createService = async (req, res, _next) => {

    let sqlQuery = 
    `INSERT INTO service 
     (style_nm, duration, price)
     VALUES (?, ?, ?)
    `;
    const [service] = await pool.query(sqlQuery, 
        [req.body.style_nm, req.body.duration, req.body.price]
    );
    if(service.length <= 0) {
        res.status(400).json({
            status: 'error', 
            message: 'Unable To Create Record'
        });
    } else {    
        res.status(200).json({
            status: 'success',
            recordId: service.insertId
        });
    }
}



export const getAllServices = async (req, res, next) => {
    let sqlQuery = `SELECT * FROM service`;
    const [services] = await pool.query(sqlQuery);
    if(services.length > 0) {
        res.status(200).json({
            status: 'success',
            results: services.length,
            data: { services: services}
        });
    } else {    
        res.status(404).json({
            status: 'error',
            message: 'Server error'
        });
    }
}
export const getSingleService = async (req, res, next) => {
    const id = req.params.id;

    let sqlQuery = `SELECT * FROM service WHERE id = ?`;
    const [services] = await pool.query(sqlQuery, [id]);
    if(services.length > 0) {
        res.status(200).json({
            status: 'success',
            data: { services: services[0]}
        });
    } else {    
        res.status(404).json({
            status: 'error',
            message: 'Server error'
        });
    }
}

export const updateService = async (req, res, next) => {
    // const id = req.params.id;

    let sqlQuery = 
    `UPDATE service 
    SET style_nm = ?, duration = ?, price = ?
    WHERE id = ?
    `;
    const [service] = await pool.query(sqlQuery, 
        [req.body.style_nm, req.body.duration, req.body.price, req.params.id]
    );
    if(service.affectedRows <= 0) {
        res.status(400).json({
            status: 'error', 
            // data: { services: service[0]}
        });
    } else {    
        res.status(200).json({
            status: 'success',
            affectedRows: service.affectedRows
        });
    }
}
export const deleteService = async (req, res, next) => {
    const id = req.params.id;

    let sqlQuery = 
    `DELETE FROM service 
     WHERE id = ?
    `;
    const [service] = await pool.query(sqlQuery, [id]);

    if(service.affectedRows <= 0) {
        res.status(400).json({
            status: 'error', 
            message: 'Unable To Delete Record'
        });
    } else {    
        res.status(200).json({
            status: 'success',
            affectedRows: service.affectedRows
        });
    }
}