let Room = require("../models/roomModel");
const catchAsync = require("./../utils/catchAsync");

module.exports = {
  getAllRooms: catchAsync(async (req, res) => {
    let queryObj = { ...req.query };

    let excludedFields = ["sort", "fields", "page", "limit"];
    excludedFields.forEach((field) => delete queryObj[field]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Room.find(JSON.parse(queryStr));

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
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    const rooms = await query;
    res.status(200).json(rooms);
  }),

  getRoom: catchAsync(async (req, res) => {
    const { id } = req.params;
    const room = await Room.findById(id);
    res.status(200).json(room);
  }),

  updateRoom: catchAsync(async (req, res) => {
    const { id } = req.params;

    const room = await Room.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json(room);
  }),

  deleteRoom: catchAsync(async (req, res) => {
    const { id } = req.params;
    const room = await Room.findByIdAndDelete(id);
    res.status(200).json(room);
  }),

  createRoom: catchAsync(async (req, res) => {
    console.log(req.body);
    const room = await Room.create(req.body);
    res.status(200).json(room);
  }),
};
