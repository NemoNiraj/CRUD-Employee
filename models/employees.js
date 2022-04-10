var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var employeesSchema = new Schema({
  name: { type: String, required: true },
  empid: { type: String, required: true },
  phone: { type: String, required: true },
});

module.exports = mongoose.model('employees', employeesSchema);
