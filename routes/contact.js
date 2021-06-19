var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.render('contact', {
        currentUser: req.session.theUser
    });
});

module.exports = router;