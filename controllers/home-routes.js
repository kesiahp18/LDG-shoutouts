const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Shoutout } = require('../models');

router.get('/', (req, res) => {
    Shoutout.findAll({
        attributes: [
            'id',
            'subject',
            'message'
        ]
    })
    .then(dbShoutoutData => {
        console.log(dbShoutoutData[0]);
        res.render('homepage', {
            loggedIn: req.session.loggedIn
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;