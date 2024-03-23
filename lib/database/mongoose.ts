// import mongoose, {Mongoose} from "mongoose";

// const MONGODB_URL = process.env.MONGODB_URL;

// interface MongooseConnection {
//     conn : Mongoose | null ;
//     promise: Promise<Mongoose> | null;
// }

// // cache : prevents next js from creating too many mongo connection 
// // as it creates connection on each request

// let cached: MongooseConnection = (global as any).mongoose = {
//     if(!cached)
//     {
//         cached = (global as any).mongoose = {
//             conn: null,
//             promise: null
//         }
//     }

//     export const connectToDatabase = async()=>{
//         if(cached.conn) return cached.conn;

//         if(!MONGODB_URL) throw Error('MONGODB_URL is not defined')

//         cached.promise = cached.promise || mongoose.connect(MONGODB_URL,
//             {dbName: 'imaginify', bufferCommands:false})
//     }
//     cached.conn = await cached.promise;

//     return cached.conn ;
// }


import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

// cache: prevents next js from creating too many mongo connections 
// as it creates a connection on each request
let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
    cached = (global as any).mongoose = {
        conn: null,
        promise: null
    }
}

export const connectToDatabase = async () => {
    if (cached.conn) return cached.conn;

    if (!MONGODB_URL) throw new Error('MONGODB_URL is not defined');

    cached.promise = cached.promise || mongoose.connect(MONGODB_URL, { dbName: 'imaginify', bufferCommands: false });

    cached.conn = await cached.promise;

    return cached.conn;
}
