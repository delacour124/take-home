const { resolvePath } = require('react-router-dom');
const db = require('./models/PostgreSQLModel.js')
const apptController = {};

apptController.getAll = (req, res, next) => {
  const { docId } = req.params;
  const params = [docId];
  const query = 
    'SELECT ptFirstName, ptLastName, date, time, kink FROM appointment WHERE doc_id = $1 ORDER BY time';
    db.query(query, params)
    .then (data => {
      console.log(data.rows);
      res.locals.appointments = data.rows;
      return next();
    })
    .catch(err => next({
      log: `Error occured at getAppointment middleware: ${err}`,
      message: 'Error occured, not able to get appointments'
      }
    ));
}

apptController.getAppointment = (req, res, next) => {
  const { docId } = req.params;
  const { date } = req.body;
  const params = [docId, date];
  const query = 
    'SELECT ptFirstName, ptLastName, date, time, kink FROM appointment WHERE doc_id = $1 AND date = $2 ORDER BY time';
  db.query(query, params)
    .then (data => {
      console.log(data.rows);
      res.locals.appointments = data.rows;
      return next();
    })
    .catch(err => next({
      log: `Error occured at getAppointment middleware: ${err}`,
      message: 'Error occured, not able to get appointments'
      }
    ));
}

apptController.deleteAppointment = (req, res, next) => {
  const { docId, apptId } = req.params;
  const params = [docId, apptId];
  const query = 'DELETE FROM appointment WHERE doc_id = $1 AND appt_id = apptId'
  db.query(query, params)
    .then(data => {
      return next();
    })
    .catch(err => next({
      log: `Error occured at deleteAppointment middleware: ${err}`,
      message: 'Error occured, not able to delete appointment'
    }))
}


apptController.addAppointment = (req, res, next) => {
  const { ptFirstName, ptLastName, date, time, kind } = req.body;
  const { docId } = req.params;
  const values = [docId, ptFirstName, ptLastName, date, time, kind];
  const query = 'INSERT INTO appointments (doc_id, ptFirstName, ptLastName, date, time, kind) VALUES ($1, $2, $3, $4, $5, $6) WHERE (SELECT COUNT(*) FROM appointment WHERE time = $5) <= 3';
  db.query(query)
    .then(data => {
      return next();
    })
    .catch(err => next({
      log: `Error occured at addAppointment middleware: ${err}`,
      message: 'Error occured, not able to add appointment'
    }))
}



module.exports = apptController;