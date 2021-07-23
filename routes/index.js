const roomRouter = require('./roomRoutes');
const chatRouter = require('./chatRouter');
const genreRouter = require('./genreRouter');
const reviewRouter = require('./reviewRouter');
const movieRouter = require('./movieRouter');

function Router(app) {
    app.use('/api/v1/rooms', roomRouter)
    app.use('/api/v1/chats', chatRouter);
    app.use('/api/v1/genres', genreRouter);
    app.use('/api/v1/reviews', reviewRouter);
    app.use('/api/v1/movies', movieRouter);
}

module.exports = Router;

