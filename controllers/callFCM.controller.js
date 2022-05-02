const axios = require('axios');

exports.getfcmCall = function(req, res) {

    var data = JSON.stringify({
        "to": req.query.to,
        "notification": {
            "body": req.query.body,
            "title": req.query.title
        },
    });

    var config = {
        method: 'post',
        url: 'https://fcm.googleapis.com/fcm/send',
        headers: {
            'Authorization': 'key=AAAA6Mzidcc:APA91bEWKlcqkdq40DwE6UWpbKF-XlqPTiMb8rxL9vM0vJBeNiVH-SRnMdAj5p50DNZVQZuawpX4lX8JOVDp6_gTa7hBu6wq0Z2NiWa8gmkw16aq8pp-8WZcfQoBb48UCbhHasqAmR2W',
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios(config)
        .then(function(response) {
            res.send(JSON.stringify(response.data));
        })
        .catch(function(error) {
            res.send(error);
        })
};