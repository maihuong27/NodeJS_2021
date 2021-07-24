const Review = require('../models/reviewModel');

module.exports = {
    getAllReviews: async (req, res) => {
        try {
            let queryObj = {...req.query};

            let excludedFields = ['sort', 'fields', 'limit', 'page'];
            excludedFields.forEach(field => delete queryObj[field]);

            let queryStr = JSON.stringify(queryObj);
            queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

            let query = Review.find(JSON.parse(queryStr));

            //sort
            if(req.query.sort) {
                const sortBy = req.query.sort.split(',').join(' ');
                query = query.sort(sortBy);
            } else {
                query = query.sort('createAt');
            }

            //fields
            if(req.query.fields) {
                const fields = req.query.fields.split(',').join(' ');
                query = query.select(fields);
            } else {
                query = query.select('-__v');
            }  

            //paginate
            const page = req.query.page * 1 || 1;
            const limit = req.query.limit * 1 || 100;
            const skip = (page - 1) * limit;

            query = query.skip(skip).limit(limit);


            const reviews = await query;
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