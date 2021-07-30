const Movie = require("../models/movieModel");
const catchAsync = require("./../utils/catchAsync");

module.exports = {
  getAllMovies: catchAsync(async (req, res) => {
    try {
      let queryObj = { ...req.query };

      const excludeFields = ["sort", "page", "fields", "limit"];
      excludeFields.forEach((field) => delete queryObj[field]);

      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      );

      let query = Movie.find(JSON.parse(queryStr));

      //sort
      if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy);
      } else {
        query = query.sort("createAt");
      }

      //fields
      if (req.query.fields) {
        const fields = req.query.fields.split(",").join(" ");
        query = query.select(fields);
      } else {
        query = query.select("-__v");
      }

      //paginate
      let page = req.query.page * 1 || 1;
      let limit = req.query.limit * 1 || 100;
      let skip = (page - 1) * limit;

      query = query.skip(skip).limit(limit);

      const movies = await query;
      res.status(200).json(movies);
    } catch (error) {
      res.status(400).json(error);
    }
  }),

  getMovie: async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id);
      res.status(200).json(movie);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  updateMovie: async (req, res) => {
    try {
      const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json(movie);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  deleteMovie: async (req, res) => {
    try {
      const movie = await Movie.findByIdAndDelete(req.params.id);
      res.status(200).json(movie);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  createMovie: async (req, res) => {
    try {
      const movie = await Movie.create(req.body);
      res.status(200).json(movie);
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
