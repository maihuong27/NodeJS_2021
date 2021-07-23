const express = require('express');
const router = express.Router();

const genreController = require('../controlers/genreController');

router
    .route('/')
    .get(genreController.getAllGenres)
    .post(genreController.createGenre);

router
    .route('/:id')
    .get(genreController.getGenre)
    .patch(genreController.updateGenre)
    .delete(genreController.deleteGenre);

module.exports = router;