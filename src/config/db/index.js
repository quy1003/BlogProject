const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/blog_project_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connect: Connected successfully!');
    } catch (ex) {
        console.log('Database connect: Fail Connected!');
    }
}

module.exports = { connect };
