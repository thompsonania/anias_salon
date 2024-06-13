import {pool} from '../data/database.js';

export const createAppointment = async (req, res, _next) => {
    

    let sqlQuery = 
    `INSERT INTO appointment 
     (customer_id, employee_id, appt_date, appt_time, status, service_id)
     VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [appointment] = await pool.query(sqlQuery, 
        [req.body.customer_id, req.body.employee_id, req.body.appt_date, req.body.appt_time, req.body.status, req.body.service_id]
    );
    if(appointment.affectedRows > 0) {
        res.status(200).json({
            status: 'success',
            insertedId: appointment.insertId
            });
        } else {   
            res.status(400).json({ 
            status: 'error', 
            message: 'Unable To Create Record'
        });
    }
}



export const getAllAppointments = async (req, res, next) => {
    let sqlQuery = `
            SELECT 
                cust.frst_nm as cust_frst_nm, cust.last_nm cust_last_nm, cust.phne_nbr, 
                empl.frst_nm as empl_frst_nm, empl.last_nm as empl_last_nm, 
                appt.id, appt.customer_id, appt.employee_id, appt.appt_date, appt.appt_time,
                svc.style_nm, svc.price

            FROM 
                customer cust, employee empl, appointment appt, service svc
            WHERE 
                appt.customer_id = cust.id
                AND appt.employee_id = empl.id
                AND appt.service_id = svc.id
            
                `;
    const [appointments] = await pool.query(sqlQuery);
    if(appointments.length > 0) {
        res.status(200).json({
            status: 'success',
            results: appointments.length,
            data: { appointments}
        });
    } else {    
        res.status(404).json({
            status: 'error',
            message: 'Server error'
        });
    }
}

export const getSingleAppointment = async (req, res, next) => {
    const id = req.params.id;

    let sqlQuery = `
    
            SELECT 
                cust.frst_nm as cust_frst_nm, cust.last_nm cust_last_nm, cust.phne_nbr, 
                empl.frst_nm as empl_frst_nm, empl.last_nm as empl_last_nm, 
                appt.id, appt.customer_id, appt.employee_id, appt.appt_date, appt.appt_time,
                svc.style_nm, svc.price

            FROM 
                customer cust, employee empl, appointment appt, service svc
            WHERE appt.id = ?
                AND appt.customer_id = cust.id
                AND appt.employee_id = empl.id
                AND appt.service_id = svc.id
            `;


    const [appointments] = await pool.query(sqlQuery, [id]);
    if(appointments.length > 0) {
        res.status(200).json({
            status: 'success',
            data: { appointments: appointments[0]}
        });
    } else {    
        res.status(404).json({
            status: 'error',
            message: 'Server error'
        });
    }
}

export const updateAppointment = async (req, res, next) => {

    let sqlQuery = 
    `UPDATE appointment 
    SET customer_id = ?, employee_id = ?, appt_date = ?, appt_time = ?, status = ?, service_id = ?
    WHERE id = ?
    `;
    const [appointment] = await pool.query(sqlQuery, 
        [req.body.customer_id, req.body.employee_id, req.body.appt_date, req.body.appt_time, req.body.status, req.body.service_id, req.params.id]
    );
    if(appointment.affectedRows <= 0) {
        res.status(400).json({
            status: 'error', 
            
        });
    } else {    
        res.status(200).json({
            status: 'success',
            affectedRows: appointment.affectedRows
        });
    }
}
export const deleteAppointment = async (req, res, next) => {
    const id = req.params.id;

    let sqlQuery = 
    `DELETE FROM appointment 
     WHERE id = ?
    `;
    const [appointment] = await pool.query(sqlQuery, [id]);

    if(appointment.affectedRows <= 0) {
        res.status(400).json({
            status: 'error', 
            message: 'Unable To Delete Record'
        });
    } else {    
        res.status(200).json({
            status: 'success',
            affectedRows: appointment.affectedRows
        });
    }

    
}

//==========================================================================
//                 CUSTOMER APPOINTMENTS
//==========================================================================

export const createCustomerAppointment = async (req, res, _next) => {
    
    let status = 'scheduled';
    let sqlQuery = 
    `INSERT INTO appointment 
     (customer_id, employee_id, appt_date, appt_time, status, service_id)
     VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [appointment] = await pool.query(sqlQuery, 
        [req.body.customer_id, req.body.employee_id, req.body.appt_date, req.body.appt_time, status, req.body.service_id]
    );
    if(appointment.affectedRows > 0) {
        res.status(200).json({
            status: 'success',
            insertedId: appointment.insertId
            });
        } else {   
            res.status(400).json({ 
            status: 'error', 
            message: 'Unable To Create Record'
        });
    }
}



export const getAllCustomerAppointments = async (req, res, next) => {
    let custID = req.params.customer_id;

    let sqlQuery = `
            SELECT 
                cust.frst_nm as cust_frst_nm, cust.last_nm cust_last_nm, cust.phne_nbr, 
                empl.frst_nm as empl_frst_nm, empl.last_nm as empl_last_nm, 
                appt.id, appt.customer_id, appt.employee_id, appt.appt_date, appt.appt_time,
                svc.style_nm, svc.price, appt.status

            FROM 
                customer cust, employee empl, appointment appt, service svc
            WHERE 
                appt.customer_id = cust.id
                AND appt.employee_id = empl.id
                AND appt.service_id = svc.id
                AND appt.customer_id = ?
            
                `;
    const [appointments] = await pool.query(sqlQuery, [custID]);
    if(appointments.length > 0) {
        res.status(200).json({
            status: 'success',
            results: appointments.length,
            data: { appointments}
        });
    } else {    
        res.status(404).json({
            status: 'error',
            message: 'Server error'
        });
    }
}

export const getSingleCustomerAppointment = async (req, res, next) => {
    const id = req.params.id;

    let sqlQuery = `
    
            SELECT 
                cust.frst_nm as cust_frst_nm, cust.last_nm cust_last_nm, cust.phne_nbr, 
                empl.frst_nm as empl_frst_nm, empl.last_nm as empl_last_nm, 
                appt.id, appt.customer_id, appt.employee_id, appt.appt_date, appt.appt_time,
                svc.style_nm, svc.price

            FROM 
                customer cust, employee empl, appointment appt, service svc
            WHERE appt.id = ?
                AND appt.customer_id = cust.id
                AND appt.employee_id = empl.id
                AND appt.service_id = svc.id
            `;


    const [appointments] = await pool.query(sqlQuery, [id]);
    if(appointments.length > 0) {
        res.status(200).json({
            status: 'success',
            data: { appointments: appointments[0]}
        });
    } else {    
        res.status(404).json({
            status: 'error',
            message: 'Server error'
        });
    }
}

//============================================================================
/// employees
//============================================================================




export const getAllEmployeeAppointments = async (req, res, next) => {
    let emplID = req.params.employee_id;
   
    let sqlQuery = `
            SELECT 
                cust.frst_nm as cust_frst_nm, cust.last_nm cust_last_nm, cust.phne_nbr, 
                empl.frst_nm as empl_frst_nm, empl.last_nm as empl_last_nm, 
                appt.id, appt.customer_id, appt.employee_id, appt.appt_date, appt.appt_time,
                svc.style_nm, svc.price, appt.status

            FROM 
                customer cust, employee empl, appointment appt, service svc
            WHERE 
                appt.customer_id = cust.id
                AND appt.employee_id = empl.id
                AND appt.service_id = svc.id
                AND appt.customer_id = ?
            
                `;
    const [appointments] = await pool.query(sqlQuery, [emplID]);
    if(appointments.length > 0) {
        res.status(200).json({
            status: 'success',
            results: appointments.length,
            data: { appointments}
        });
    } else {    
        res.status(404).json({
            status: 'error',
            message: 'No Appointments were found'
        });
    }
}
    
  
   
