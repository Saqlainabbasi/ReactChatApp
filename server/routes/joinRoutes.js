const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send("Joining the Chat" ).status(200)
})

module.exports = router;