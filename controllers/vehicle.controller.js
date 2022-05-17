const Vehicle = require('../models/vehicle.model')

//Add Vehicle
exports.addVehicle = async function (req, res) {
    let vehicleData = req.body;
    let vehicle = new Vehicle(vehicleData);
    vehicle.save(async (error, addedVehicle) => {
            if (error) {
                res.status(400).json("Error"+ error)
              } else {
                res.status(200).json(addedVehicle);
              }
        });
  };

//Get Vehicles
exports.getAllVehicles = async function (req, res) {
    Vehicle.find({})
        .exec(function (err, vehicles) {
            if(err){
                res.status(400).json("Not success");
            } else {
                res.status(200).json(vehicles);
            }
        })
}