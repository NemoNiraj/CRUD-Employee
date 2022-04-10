var express = require('express');
var mongoose = require('mongoose');
var body_parser = require('body-parser');

var db_name = 'employee_db';
mongoose.connect('mongodb://localhost/' + db_name, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var app = express();
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));

var server = app.listen(4000, console.log('Server Started listening requests'));

var Emp_Model = require('./models/employees');

//CRUD

//Create
app.post('/create_employee', function (req, res) {
  var user_obj = new Emp_Model(req.body);

  var return_arr = {};
  user_obj.save(function (err) {
    if (err) {
      return_arr.status = 0;
      return_arr.message = err.message;
    } else {
      return_arr.status = 1;
      return_arr.message = 'Employee Created Successfully';
    }
    res.json(return_arr);
  });
});

//Read
app.get('/get_all_employees', function (req, res) {
  Emp_Model.find({}, function (err, data) {
    var return_arr = {};
    if (err) {
      return_arr.status = 0;
      return_arr.message = err.message;
    } else {
      return_arr.status = 1;
      return_arr.employees = data;
    }
    res.json(return_arr);
  });
});

//Update
app.put('/update_employee/:employee_id', function (req, res) {
  var return_arr = {};

  Emp_Model.findByIdAndUpdate(
    req.params.employee_id,
    req.body,
    { new: true },
    function (err) {
      if (err) {
        return_arr.status = 0;
        return_arr.message = err.message;
      } else {
        return_arr.status = 1;
        return_arr.message = 'Employee Updated';
      }

      res.json(return_arr);
    }
  );
});

//Delete
app.delete('/delete_employee/:employee_id', function (req, res) {
  var return_arr = {};
  Emp_Model.findByIdAndRemove(req.params.employee_id, function (err) {
    if (err) {
      return_arr.status = 0;
      return_arr.message = err.message;
    } else {
      return_arr.status = 1;
      return_arr.message = 'Employee Deleted';
    }
    res.json(return_arr);
  });
});
