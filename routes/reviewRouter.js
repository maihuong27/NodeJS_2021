const express = require('express');
const router = express.Router();

const reviewController = require('../controlers/reviewController');

router 
    .route('/')
    .get(reviewController.getAllReviews)
    .post(reviewController.create)

router
    .route('/:id')
    .get(reviewController.getReview)
    .patch(reviewController.updateReview)
    .delete(reviewController.deleteReview)

module.exports = router;