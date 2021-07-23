let Room = require('../models/roomModel');

module.exports = {
    getAllRooms: async (req, res) => {
        try {
            const rooms = await Room.find();
            res.status(200).json(rooms)
        } catch (error) {
            res.status(400).json(error);
        }
    },

    getRoom: async (req, res) => {
        try {
            const {id} = req.params;
            const room = await Room.findById(id);
            res.status(200).json(room);
        } catch (error) {
            res.status(400).json(error);
        }
        
    },

    updateRoom: async (req, res) => {
        try {
            const {id} = req.params;

            const room = await Room.findByIdAndUpdate(id, req.body, {
                new: true,
                runValidators: true
            });

            res.status(200).json(room);
            
        } catch (error) {
            res.status(400).json(error)
        }
    },

    deleteRoom: async (req, res) => {
        try {
            const {id} = req.params;
            const room = await Room.findByIdAndDelete(id);
            res.status(200).json(room);
        } catch (error) {
            res.status(400).json(error);
        }
    },

    createRoom: async (req, res) => {
        try {
            console.log(req.body);
            const room = await Room.create(req.body);
            res.status(200).json(room);
        } catch (error) {
            res.status(400).json(error);
        }
        

    }
}