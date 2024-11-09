import { mongoose } from 'mongoose'

const listen = async () => {
    try {
        const mongoURI = 'mongodb://localhost:27017/';
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message)
    }
}

export default listen