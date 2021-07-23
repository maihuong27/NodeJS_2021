const express = require('express');
const router = express.Router();

const chatController = require('../controlers/chatController');

router  
    .route('/')
    .get(chatController.getAllChats)
    .post(chatController.createChat);

router
    .route('/:id')
    .get(chatController.getChat)
    .patch(chatController.updateChat)
    .delete(chatController.deleteChat);

module.exports = router;
