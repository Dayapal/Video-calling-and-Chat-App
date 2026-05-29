import mongoose from 'mongoose';

export const connectDB = async () =>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongodb Connected : ${connection.connection.host}`)
    } catch (error) {
        console.log("Error occured during mongodb connection", error);
        process.exit(1); // 1 means failure
        
    }
}

