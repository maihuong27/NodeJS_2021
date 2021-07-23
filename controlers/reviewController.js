const Review = require('../models/reviewModel');

module.exports = {
    getAllReviews: async (req, res) => {
        try {
            const reviews = await Review.find();
            res.status(200).json(reviews);
        } catch (error) {
            res.status(400).json(error);
        }
    },

    getReview: async (req, res) => {
        try {
            const {id} = req.params;
            const review = await Review.findById(id);
            res.status(200).json(review);
        } catch (error) {
            res.status(400).json(error);
        }
    },

    updateReview: async (req, res) => {
        try {
            const id = req.params.id;
            const review = await Review.findByIdAndUpdate(id, req.body, {
                new: true,
                runValidators: true,
            });
            res.status(200).json(review);
        } catch (error) {
            res.status(400).json(error);
        }
        
    },

    deleteReview: async (req, res) => {
        try {
            const review = await Review.findByIdAndDelete(req.params.id);
            res.status(200).json(review);
        } catch (error) {
            res.status(400).json(error);
        }
    },

    create: async (req, res) => {
        try {
            const review = await Review.create(req.body);
            res.status(200).json(review);
        } catch (error) {
            res.status(400).json(error);
        }
    }
}