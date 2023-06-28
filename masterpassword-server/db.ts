const mongoose = require('mongoose');

async function connect() {
    await mongoose.connect('mongodb://127.0.0.1:27017/masterpassword')
    .then(() => {
        console.log("db connected");
    })
    .catch(() => {
        console.log("something's wrong");
    });
}

module.exports = {
    connect: connect,
}