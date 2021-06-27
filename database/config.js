const mongoose = require('mongoose');


const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        }, );
        console.log('base de datos online');
    } catch (error) {
        console.log(error);
        throw new Error('Error de la base de datos')
    }
};

module.exports = {
    dbConnection
}




