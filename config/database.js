const mongoose = require('mongoose');

const connect = async () => {
    try {
        await mongoose.connect('mongodb://localhost/hit_cinema_dev' , {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connect successfully');
    } catch (error) {
        console.log(error);
        console.log('Connect failure');
    }
    
}

module.exports = connect;