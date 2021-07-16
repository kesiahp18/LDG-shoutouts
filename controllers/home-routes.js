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

router.post('/send', (req, res) => {
    console.log(req.body)
    const output = `
    <p>You recieved a new Shoutout!</p>
    <h3>Details</h3>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        <li>Shoutout Message: ${req.body.shoutout}
    </ul>`;
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport( {
        service: 'hotmail',
        auth: {
            user: process.env.MAIL_NAME,
            pass: process.env.MAIL_PW
        }
    })

    const options = {
        from: 'shoutout-services@outlook.com',
        to: req.body.email,
        subject: 'Giving a Shoutout',
        text: req.body.shoutout
    }

    transporter.sendMail(options, function (err, info) {
        if(err) {
            console.log(err);
            return;
        }
        console.log('sent:' + info.response);
    })
})

module.exports = router;