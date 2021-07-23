let Chat = require('../models/chatModel');

module.exports = {
    getAllChats: async (req, res) => {
        try {
            const chats = await Chat.find();
            res.status(200).json(chats);
        } catch (error) {
            res.status(400).json(error);
        }
    },

    getChat: async (req, res) => {
        try {
            const {id} = req.params;
            const chat = await Chat.findById(id);
            res.status(200).json(chat);
        } catch (error) {
            res.status(400).json(error);
        }
    },

    updateChat: async(req, res) => {
        try {
            const {id} = req.params;
            const chat = await Chat.findByIdAndUpdate(id, req.body, {
                new: true,
                runValidators: true
            });
            res.status(200).json(chat);
        } catch (error) {
            res.status(400).json(error);
        }
    },

    deleteChat: async (req, res) => {
        try {
            const {id} = req.params;
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
    }
}