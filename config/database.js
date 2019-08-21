// config/database.js
module.exports = {

    'url' : `mongodb+srv://${process.env.User_Name}:${process.env.User_Password}@cluster0-kqimt.mongodb.net/${process.env.DB_Name}?retryWrites=true&w=majority`,  // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot`
    'dbName': 'memory_game'
};

// user name, user password, and db name all come from the .env folder. no need to add the name
//process.env. added for all of them
