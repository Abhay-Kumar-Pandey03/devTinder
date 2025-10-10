const mongoose = require('mongoose');

const connectDB = async () => {
    
    await mongoose.connect(
        "mongodb+srv://abhaypandey_db_user:LhSyrY4pUidLkHca@mongodb-cluster.z1zkxju.mongodb.net/devTinder"
    );

};

module.exports = connectDB;



