let Chat = require("../models/chatModel");
const catchAsync = require("./../utils/catchAsync");

module.exports = {
  getAllChats: catchAsync(async (req, res) => {
    try {
      let queryObj = { ...req.query };

      const excludedFields = ["sort", "fields", "limit", "page"];
      excludedFields.forEach((field) => delete queryObj[field]);

      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      );

      let query = Chat.find(JSON.parse(queryStr));

      //sort
      if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy);
      } else {
        query = query.sort("createdAt");
      }

      //field
      if (req.query.fields) {
        const fields = req.query.fields.split(",").join(" ");
        query = query.select(fields);
      } else {
        query = query.select("-__v");
      }

      //page
      let page = req.query.page * 1 || 1;
      let limit = req.query.limit * 1 || 1000;
      let skip = (page - 1) * limit;

      query = query.skip(skip).limit(limit);

      let chats = await query;
      res.status(200).json(chats);
    } catch (error) {
      res.status(400).json(error);
    }
  }),

  getChat: async (req, res) => {
    try {
      const { id } = req.params;
      const chat = await Chat.findById(id);
      res.status(200).json(chat);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  updateChat: async (req, res) => {
    try {
      const { id } = req.params;
      const chat = await Chat.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json(chat);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  deleteChat: async (req, res) => {
    try {
      const { id } = req.params;
      const chat = await Chat.findByIdAndDelete(id);
      res.status(200).json(chat);
    } catch (error) {
      res.status(400).json(error);
    }
  },

  createChat: async (req, res) => {
    try {
      const chat = await Chat.create(req.body);
      res.status(200).json(chat);
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
