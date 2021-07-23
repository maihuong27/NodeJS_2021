const Movie = require('../models/movieModel');

module.exports = {
    getAllMovies: async (req, res) => {
        try {
            const movies = await Movie.find();
            res.status(200).json(movies);
        } catch (error) {
            res.status(400).json(error);
        }
    },

    getMovie: async(req, res) => {
        try {
            const movie = await Movie.findById(req.params.id);
            res.status(200).json(movie);
        } catch (error) {
            res.status(400).json(error);
        }
    },

    updateMovie: async(req, res) => {
        try {
            const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true
            });
            res.status(200).json(movie);
        } catch (error) {
            res.status(400).json(error);
        }
    },

    deleteMovie: async(req, res) => {
        try {
            const movie = await Movie.findByIdAndDelete(req.params.id);
            res.status(200).json(movie);
        } catch (error) {
            res.status(400).json(error);
        }
    },

    createMovie: async(req, res) => {
        try {
            const movie = await Movie.create(req.body);
            res.status(200).json(movie);
        } catch (error) {
            res.status(400).json(error);
        }
    }
}