const Emergency = require("../models/emergency.model");
const User = require("../models/user.model");
//Add Emergency
exports.sendEmergency = async function (req, res) {
    let emergencyData = req.body;
const user = await User.findById(emergencyData.user_id);

const emergency = new Emergency({
    user_id: user._id,
    username: user.username,
    message: emergencyData.message,
    date: new Date()
});



    
        emergency.save(async (error, addedEmergency) => {
            if (error) {
                res.status(400).json("Error"+ error)
              }
                else {
                    res.status(200).json(addedEmergency);
                }
        });
    };

    //Get Emergencies
    exports.getAllEmergencies = async function (req, res) {
        Emergency.find({})
            .exec(function (err, emergencies) {
                if(err){
                    res.status(400).json("Not success");
                } else {
                    res.status(200).json(emergencies);
                }
            })
    }

    //Get Emergencies By User Id
    exports.getAllEmergenciesByUserId = async function (req, res) {
        Emergency.find({user_id : req.params.id})
            .exec(function (err, emergencies) {
                if(err){
                    res.status(400).json("Not success");
                } else {
                    res.status(200).json(emergencies);
                }
            })
    }


