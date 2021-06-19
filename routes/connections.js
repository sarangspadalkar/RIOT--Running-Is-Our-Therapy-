var express = require('express');
var router = express.Router();
var connectionDb = require("../utility/connectionDB");

router.get("/", async function (req, res) {
    // Fetch all the connections from the Database.
    var connectionData = await connectionDb.getConnections();
    if (Object.keys(connectionData).length > 0) {
        res.render("connections.ejs", {
            connectionData: connectionData,
            currentUser: req.session.theUser
        });
    } else {
        res.send("No connections in DB", {
            currentUser: req.session.theUser
        });
    }
});


module.exports = router;