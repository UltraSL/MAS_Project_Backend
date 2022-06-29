const Emergency = require("../models/emergency.model");
const User = require("../models/user.model");
const date = require("date-and-time");
//Add Emergency
exports.sendEmergency = async function (req, res) {
  let emergencyData = req.body;
  const user = await User.findById(emergencyData.user_id);
  const now = new Date();
  const value1 = date.format(now, "YYYY/MM/DD");
  const value2 = date.format(now, "HH:mm:ss");

  const emergency = new Emergency({
    user_id: user._id,
    mobile: user.mobile,
    username: user.username,
    message: emergencyData.message,
    date: value1 + " " + value2,
  });

  emergency.save(async (error, addedEmergency) => {
    if (error) {
      res.status(400).json("Error" + error);
    } else {
      res.status(200).json(addedEmergency);
    }
  });
};

//Get Emergencies
exports.getAllEmergencies = async function (req, res) {
  Emergency.find({}).exec(function (err, emergencies) {
    if (err) {
      res.status(400).json("Not success");
    } else {
      res.status(200).json(emergencies);
    }
  });
};

//Get Emergencies By User Id
exports.getAllEmergenciesByUserId = async function (req, res) {
  
  Emergency.find({ user_id: req.params.id }).exec(function (err, emergencies) {
    if (err) {
      res.status(400).json("Not success");
    } else {
      res.status(200).json(emergencies);
    }
  });
};

//delete Emergency By Id
exports.deleteEmergencyById = async function (req, res) {
    Emergency.findByIdAndDelete(req.params.id, function (err, emergencies) {
        if (err) {
        res.status(400).json("Not success");
        } else {
        res.status(200).json(emergencies);
        }
    });
    }
    
