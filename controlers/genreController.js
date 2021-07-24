const Genre = require('../models/genreModel');

module.exports = {
    getAllGenres: async (req, res) => {
        try {
             let queryObj = {...req.query};

             const excludedFields = ['sort', 'limit', 'page', 'fields'];
             excludedFields.forEach(field => delete queryObj[field]);

             let queryStr = JSON.stringify(queryObj);
             queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

             let query = Genre.find(JSON.parse(queryStr));


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

             const genres = await query;

            res.status(200).json(genres);
        } catch (error) {
            res.status(400).json(error);
        }
    },

    getGenre: async (req, res) => {
        try {
            const {id} = req.params;
            const genre = await Genre.findById(id);
            res.status(200).json(genre);
        } catch (error) {
            res.status(400).json(error);
        }
    },

    updateGenre: async (req, res) => {
        try {
            const {id} = req.params;
            const genre = await Genre.findByIdAndUpdate(id, req.body, {
                new: true,
                runValidators: true
            })
            res.status(200).json(genre);
        } catch (error) {
            res.status(400).json(error);
        }
    },

    deleteGenre: async (req, res) => {
        try {
            const {id} = req.params;
            const genre = await Genre.findByIdAndDelete(id);
            res.status(200).json(genre);
        } catch (error) {
            res.status(400).json(error);
        }
        
    },

    createGenre: async (req, res) => {
        try {
            const genre = await Genre.create(req.body);
            res.status(200).json(genre);
        } catch (error) {
            res.status(400).json(error);
        }
    }
}