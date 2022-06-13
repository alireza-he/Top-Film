const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error(
        "your mongodb uri is not defined!"
    )
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = {conn: null, promise: null}
}

module.exports =  async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            bufferCommands:false,
            bufferMaxEntries: 0,
            useFindAndModify:false,
            useCreateIndex: true
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((conn) => {
            return conn
        })
    }

    cached.conn = await cached.promise;

    return cached.conn;
}