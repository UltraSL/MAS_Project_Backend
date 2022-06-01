const Vehicle = require("../models/vehicle.model");
const cloudinary = require("../lib/cloudinary");

//Add Vehicle
/*exports.addVehicle = async function (req, res) {
  let vehicleData = req.body;
  let vehicle = new Vehicle(vehicleData);
  vehicle.save(async (error, addedVehicle) => {
    if (error) {
      res.status(400).json("Error" + error);
    } else {
      res.status(200).json(addedVehicle);
    }
  });
};
*/
exports.addVehicle = async function (req, res) {
    
let  result= await cloudinary.uploader.upload(req.file.path); 
  
  const vehicle = new Vehicle({
    type: req.body.type,
    image: result.secure_url,
    number: req.body.number,
  });

  try {
    var savedVehicle = await vehicle.save();
    res.status(200).json({
      code: 200,
      success: true,
      data: savedVehicle,
      message: "Vehicle added successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
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

//Get Available Drivers 
exports.getAvailableVehicles = async function (req, res) {
    let date = req.params.date;
    Vehicle.find({ reservedDates : {$ne: date}})
        .exec(function (err, vehicles) {
            if(err){
                res.status(400).json("Not success");
            } else {
                res.status(200).json(vehicles);
            }
        })
}

//update working dates
exports.updateWorkingDates = async function (req, res) {
    console.log(req.body)
    let vehicleId = req.params.vehicleId;
    let WorkingDates= req.body.workingDates;
    Vehicle.findByIdAndUpdate(vehicleId, {
        $push: {
            WorkingDates: WorkingDates
        }
       
    }, { new: true }, function (err, vehicle) {
        console.log(vehicle)
        if (err) {
            res.status(400).json("Error"+ err)
        } else {
            res.status(200).json(vehicle);
        }
    });
}






