const validator = require('../helpers/validate');

const signup = (req, res, next) => {
    const validationRule = {
        "email": "required|email",
        "password": "required|string|min:6"
    }

    const body = {
        email: req.body.email,
        password: req.body.password
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

module.exports = { 
  signup
}
