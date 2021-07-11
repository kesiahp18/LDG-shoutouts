const router = require('express').Router();
const { Shoutout, User } = require('../../models');

//get all shoutouts
router.get('/', (req, res) => {
    Shoutout.findAll({
        attributes: [
            'id',
            'subject',
            'message',
            'sender_id',
            'recipient_id'
        ],
        order: [['created_at']],
    })
    .then(dbShoutoutData => res.json(dbShoutoutData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

//create a shoutout
router.post('/', (req, res) => {
    Shoutout.create({
        subject: req.body.subject,
        message: req.body.message,
        recipient_id: req.body.recipient_id,
        sender_id: req.body.sender_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;