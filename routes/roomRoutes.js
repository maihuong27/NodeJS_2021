const express = require('express');
const router = express.Router();
const roomController = require('../controlers/roomController');

router
    .route('/')
    .get(roomController.getAllRooms)
    .post(roomController.createRoom);

router
    .route('/:id')
    .get(roomController.getRoom)
    .patch(roomController.updateRoom)
    .delete(roomController.deleteRoom);

module.exports = router;
