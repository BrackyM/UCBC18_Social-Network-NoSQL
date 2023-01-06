const { User, Thought } = require('../models');

const userController = {
    createUser(req,res) {
        User.create(req.body)
        .then((databaseUserData) => {
            res.json(databaseUserData);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body},
            { runValidators: true, new: true, }
        )
        .then((databaseUserData) => {
            if (!databaseUserData) {
                return res.status(404).json({ message: 'Id has no user associated' });
            }
            res.json(databaseUserData);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
    },

    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((databaseUserData) => {
            if (!databaseUserData) {
                return res.status(404).json({ message: 'Id has no user associated' });
            }

            return Thought.deleteMany({ _id: { $in: databaseUserData.thoughts }});
        })
        .then(() => {
            res.json({ message: 'User and their thoughts are deleted' });
        })
        .catch((err) => {
            res.status(500).json(err);
        });
    },

    getAllUsers(req, res) {
        User.find()
            .select('-__v')
            .then((databaseUserData) => {
                res.json(databaseUserData);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },

    getOneUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('friends')
            .populate('thoughts')
            .then((databaseUserData) => {
                if (!databaseUserData) {
                    return res.status(404).json({ message: 'Id has no user'});
                }
                res.json(databaseUserData);
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },

    addFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId }}, { new: true })
        .then((databaseUserData) => {
            if (!databaseUserData) {
                return res.status(404).json({ message: 'Id has no user'});
            }
            res.json(databaseUserData);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
    },

    deleteFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId }}, { new: true })
        .then((databaseUserData) => {
            if (!databaseUserData) {
                return res.status(404).json({ message: 'Id has no user'});
            }
            res.json(databaseUserData);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
    },
};

module.exports = userController;