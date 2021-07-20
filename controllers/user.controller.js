const User = require("../models/user.model.js");

exports.update = async(req, res, next) => {
    // Validate Request
    if (!req.params.userId || !req.body.user_name || !req.body.email) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        res.end();
        return
    }
    if(req.user.userId != req.params.userId){
        res.status(401).send({
            message: "Unauthorized"
        });
        res.end();
        return
    }

    User.updateById(
        req.params.userId,
        new User(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Customer with id ${req.params.userId}.`
                    });
                    res.end();
                } else {
                    res.status(500).send({
                        message: "Error updating Customer with id " + req.params.userId
                    });
                    res.end();
                }
            } else {
                res.status(200).send(data);
                res.end();
            }
        }
    );
};