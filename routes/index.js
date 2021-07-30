const AppError = require("./../utils/appError");
const roomRouter = require("./roomRoutes");
const chatRouter = require("./chatRouter");
const genreRouter = require("./genreRouter");
const reviewRouter = require("./reviewRouter");
const movieRouter = require("./movieRouter");

function Router(app) {
  app.use("/api/v1/rooms", roomRouter);
  app.use("/api/v1/chats", chatRouter);
  app.use("/api/v1/genres", genreRouter);
  app.use("/api/v1/reviews", reviewRouter);
  app.use("/api/v1/movies", movieRouter);
  app.use("*", (req, res, next) => {
    // res
    //   .status(404)
    //   .json({ message: `This route is not define! ${req.originalUrl}` });

    // let err = new Error(`This route is not define! ${req.originalUrl}`);
    // err.statusCode = 404;

    //let err = new AppError(`This route is not define! ${req.originalUrl}`, 404);
    next(new AppError(`This route is not define! ${req.originalUrl}`, 404));
  });
  app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    // res.status(err.statusCode).json({ message: err.message });
    if (process.env.NODE_ENV === "development") {
      res.status(err.statusCode).json({
        error: err,
        stack: err.stack,
        message: err.message,
        name: err.name,
      });
    } else if (process.env.NODE_ENV === "production") {
      const error = { ...err };
      error.message = err.message;
      if (err.name === "CastError") {
        const message = "";
        error = new AppError(message, 400);
      }
      if (err.code === 11000) {
        const message = "";
        error = new AppError(message, 400);
      }
      if (err.name === "ValidationError") {
        const message = Object.values(error.errors)
          .map((err) => err.message)
          .join(", ");
        error = new AppError(message, 400);
      }

      if (error.isOperational)
        res.status(error.statusCode).json({ message: error.message });
      else {
        console.log(error);
        res.status(500).json({ message: "Something went very wrong!" });
      }
    }
  });
}

module.exports = Router;
