const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const apptController = require('./apptController');
const doctorController = require('./doctorController');
const app = express();
const PORT = 3000;


// parse incoming request with json
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// get all appointments for a particular doctor and particular day
app.get('/doc/:docId/getAppt', apptController.getAppointment, (req, res) => {
  res.status(200).json(res.locals.appointments);
});

// create new appointment for a doctor
app.post('/doc/:docId/addAppt', apptController.addAppointment, (req, res) => {
  res.status(200).send('appointment added');
})

// delete appointment for a doctor
app.delete('doc/:docId/deleteAppt/:apptId', apptController.deleteAppointment, (req, res) => {
  res.status(200).send('appointment deleted')
})

// get all doctors
app.get('/doc', doctorController.getDoctors, (req, res) => {
  res.status(200).json(res.locals.doctors);
})

// serve html page
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'))
})

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.status(404).send('This is not the page you\'re looking for...'));

// globle error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// listen on port
app.listen(PORT, () => {
  console.log(`listening on PORT: ${PORT}`)
});
