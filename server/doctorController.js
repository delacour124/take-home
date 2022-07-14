const db = require('./models/PostgreSQLModel.js');
const doctorController = {};

doctorController.getDoctors = (req, res, next) => {
  const query = 'SELECT firstName, lastName FROM doctor';
  db.query(query)
    .then(data => {
      res.locals.doctors = data.rows;
      return next();
    })
    .catch(err => next({
      log: `Error occured at getDoctors middleware: ${err}`,
      message: 'Error occured, not able to get doctors'
    }))
}


module.exports = doctorController;