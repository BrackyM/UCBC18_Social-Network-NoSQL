const router = require('express').Router();
const { 
    createThought, updateThought, deleteThought, getAllThoughts, getOneThought, addReact, deleteReact, 
} = require('../../controllers/thought-controller');

router.route('/').get(getAllThoughts).post(createThought);

router.route('/:thoughtId').get(getOneThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions').post(addReact);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReact);

module.exports = router;