const roomRouter = require('./roomRoutes');
const chatRouter = require('./chatRouter');
const genreRouter = require('./genreRouter');
const reviewRouter = require('./reviewRouter');
const movieRouter = require('./movieRouter');

function Router(app) {
    app.use('/api/rooms', roomRouter)
    app.use('/api/chats', chatRouter);
    app.use('/api/genres', genreRouter);
    app.use('/api/reviews', reviewRouter);
    app.use('/api/movies', movieRouter);
}

module.exports = Router;

