const Request = require("../models/transportRequest.model");
const mongoose = require("mongoose");

//Add Request
exports.sendRequest = async function (req, res) {
    let requestData = req.body;
    let request = new Request(requestData);

        request.save(async (error, addedRequest) => {
            if (error) {
                console.log(error)
              } else {
                res.status(200).json(addedRequest);
              }
        });
  };

//Get Requests
exports.getAllRequests = async function (req, res) {
    Request.find({})
        .exec(function (err, requests) {
            if(err){
                res.status(400).json("Not success");
            } else {
                res.status(200).json(requests);
            }
        })
}

//Update Request By Id
exports.updateRequestById = async function (req, res) {
    Request.findByIdAndUpdate(req.params.id,
    {
      $set: {
        reason: req.body.reason, dateOfReservation: req.body.dateOfReservation, timeOfReservation: req.body.timeOfReservation,
        dateOfTrip: req.body.dateOfTrip,
        timeOfTrip: req.body.timeOfTrip, locationFrom: req.body.locationFrom, locationTo: req.body.locationTo,
        vehicleType: req.body.vehicleType
      }
    },
    {
      new: true
    },
    function (err, updatedRequest) {
      if (err) {
        res.status(400).json("Error updating teacher");
      } else {
        res.status(200).json(updatedRequest);
      }
    });
}

//Delete Request By Id
exports.deleteRequestById = async function (req, res) {
    Request.findByIdAndRemove(req.params.id, function (err, deletedRequest) {
        if (err) {
            res.status(400).json("Not success");
          } else {
            res.status(200).json(deletedRequest);
          }
    })
}