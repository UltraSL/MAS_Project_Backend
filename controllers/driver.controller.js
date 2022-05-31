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


//update working dates
exports.updateWorkingDates = async function (req, res) {
    console.log(req.body)
    let driverId = req.params.driverId;
    let WorkingDates= req.body.workingDates;
    Driver.findByIdAndUpdate(driverId, {
        $push: {
            WorkingDates: WorkingDates
        }
       
    }, { new: true }, function (err, driver) {
        console.log(driver)
        if (err) {
            res.status(400).json("Error"+ err)
        } else {
            res.status(200).json(driver);
        }
    });
}

//update vehicle total milage
exports.updateVehicleTotalMilage = async function (req, res) {
  
    let driverId = req.params.driverId;
    let milage= req.body.milage;
    let driver= await Driver.findById(driverId);
    let vehicleTotalMilage= driver.milage + milage;
  
    Driver.findByIdAndUpdate(driverId, {
        $set: {
            milage: vehicleTotalMilage
        }
    }, { new: true }, function (err, Driver) {
        console.log(Driver)
        if (err) {
            res.status(400).json("Error"+ err)
        } else {
            res.status(200).json(Driver);
        }
    });
} 



