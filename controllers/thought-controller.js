const { Thought, User } = require('../models');

const thoughtController ={
    
    createThought(req, res) {
        Thought.create(req.body)
            .then((databaseThoughtData) => {
                return User.findOneUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: databaseThoughtData._id }},
                    { new: true }
                );
            })
            .then((databaseUserData) => {
                if (!databaseUserData) {
                    return res.status(404).json({ message: 'Thought successful. Error: No user with id'});
                }
                res.json({ message: 'Thought Successful' });
            })
            .catch((err) => {
                res.status(500).json(err);
            });
    },

    updateThought(req, res) {
        Thought.findOneUpdate({ _id: req.params.thoughtId }, { $set: req.body }, { runValidators: true, new: true })
        .then((databaseThoughtData) => {
            if(!databaseThoughtData) {
                return res.status(404).json({ message: 'no id associated with thought'});
            }
            res.json(databaseThoughtData);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
    },

    deleteThought(req, res) {
        Thought.findOneRemove({ _id: req.params.thoughtId })
        .then((databaseThoughtData) => {
            if (!databaseThoughtData) {
                return res.status(404).json({ message: 'no id associated with thought'});
            }

            return User.findOneUpdate(
                { thoughts: req.params.thougtId },
                { $pull: { thoughts: req.params.thoughtId }},
                { new: true }
            );
        })
        .then((databaseUserData) => {
            if (!databaseUserData) {
                return res.status(404).json({ message: 'Thought created. Error: no user with id'});
            }
            res.json({ message: 'Thought deleted'});
        })
        .catch((err) => {
            res.status(500).json(err);
        });
    },

    getAllThoughts(req, res) {
        Thought.find()
        .sort({ createdAt: -1 })
        .then((databaseThoughtData) => {
            res.json(databaseThoughtData);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
    },

    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .then((databaseThoughtData) => {
            if (!databaseThoughtData) {
                return res.status(404).json({ message: 'no id associated with thought'});
            }
            res.json(databaseThoughtData);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
    },

    addReact(req, res) {
        Thought.findOneUpdate(
        {_id: req.params.thoughtId },
        { $addToSet: { reactions: req.body }},
        { runValidators: true, new: true }
        )
        .then((databaseThoughtData) => {
            if (!databaseThoughtData) {
                return res.status(404).json({ message: 'No id matches this thought'});
            }
            res.json(databaseThoughtData);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
    },

    deleteReact(req, res) {
        Thought.findOneUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId }}},
            { runValidators: true, new: true }
        )
        .then((databaseThoughtData) => {
            if (!databaseThoughtData) {
                return res.status(404).json({ message: 'No id matches this thought'});
            }
            res.json(databaseThoughtData);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
    },
};

module.exports = thoughtController;