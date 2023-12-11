import mongoose from "mongoose";
import { URI_MONGO } from "./config.js";

export const connectDB = async () => {
    try {
        await mongoose.connect(URI_MONGO)
        console.log('>>> DB is connected <<<')
    } catch (error) {
        console.log(error)
    }
}
