const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Book title is required'],
        trim:true,
        maxLength: [100, 'Book title can not be more than 100 characters']
    },
    author: {
        type: String,
        required: [true, 'Author name is required'],
        trim: true,
    },
    year: {
        type: Number,
        required: [true, 'Year of publication is required'],
        min: [1800, 'Year of publication must be after 1800'],
        max: [new Date().getFullYear(), 'Year of publication must be in the current year']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Book', BookSchema);
