const mongoose = require('mongoose');

// Connect to DB
const connectToDB = async() => {
    try {
        await mongoose.connect("mongodb+srv://sangammukherjee2022:sangammukherjee2024@cluster0.7qjl1.mongodb.net/")
        console.log('MongoDB is connected')
    } catch(error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectToDB
