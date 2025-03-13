const mongoose = require('mongoose');

const mongo = 'mongodb+srv://IFSS:IFSS@ifss.bzjrj.mongodb.net/?retryWrites=true&w=majority&appName=IFSS'

mongoose.connect(mongo, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));
