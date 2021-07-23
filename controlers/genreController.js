const Genre = require('../models/genreModel');

module.exports = {
    getAllGenres: async (req, res) => {
        try {
            const genres = await Genre.find();
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