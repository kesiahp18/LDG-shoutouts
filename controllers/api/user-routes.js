const router = require('express').Router();
const { User } = require('../../models');

//Get user /api/users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password']}
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

//Create a user /api/users
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => {
        req.session.save(() => {
            req.session.sender_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json(dbUserData);
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET /api/users/1
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        // TODO: Include details about a single users sent and recieved shoutouts
        //include: [
        //     {
        //         model: Shout,
        //         attributes: ['id', 'subject', 'created_at']
        //     }
        // ]
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

//Route to login
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        if(!dbUserData) {
            res.status(400).json({message: 'No user with that email address!'});
            return;
        }
        //verify
        const validPassword = dbUserData.checkPassword(req.body.password);
        if(!validPassword) {
            res.status(400).json({message: 'Incorrect password!'});
            return;
        }
        req.session.save(() => {
            //Save session and declare session variables
            req.session.user_id = dbUserData.id,
            req.session.username = dbUserData.username,
            req.session.email = dbUserData.email,
            req.session.loggedIn = true;
            res.json({ user: dbUserData, message: 'You are now logged in!' });
        })
    });
});

//Logout route
router.post('/logout', (req, res) => {
    if(req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        })
    } else {
        res.status(404).end();
    }
});

//Delete user /api/users/:id
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({message: 'No user found with this id'})
            return;
        }
        res.json(dbUserData);
    })
});

module.exports = router;