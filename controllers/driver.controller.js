const Driver = require('../models/driver.model')

//Add Request
exports.addDriver = async function (req, res) {
    let driverData = req.body;
    let driver = new Driver(driverData);
    driver.save(async (error, addedDriver) => {
            if (error) {
                res.status(400).json("Error"+ error)
              } else {
                res.status(200).json(addedDriver);
              }
        });
  };

//Get Drivers
exports.getAllDrivers = async function (req, res) {
    Driver.find({})
        .exec(function (err, drivers) {
            if(err){
                res.status(400).json("Not success");
            } else {
                res.status(200).json(drivers);
            }
        })
}

//Get Available Drivers 
exports.getAvailableDrivers = async function (req, res) {
    let date = req.params.date;
    Driver.find({ WorkingDates : {$ne: date}})
        .exec(function (err, drivers) {
            if(err){
                res.status(400).json("Not success");
            } else {
                res.status(200).json(drivers);
            }
        })
}
