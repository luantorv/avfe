import { mongoose } from 'mongoose'

const listen = async () => {
    try {
        const mongoURI = 'mongodb://localhost:27017/';
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB at localhost");
    } catch (error) {
        console.error(`Error connecting to MongoDB at localhost: ${error.message}`);
        try {
            const fallbackURI = 'mongodb://127.0.0.1:27017';
            await mongoose.connect(fallbackURI);
            console.log("Connected to MongoDB at 127.0.0.1");
        } catch (fallbackError) {
            console.error(`Error connecting to MongoDB at 127.0.0.1: ${fallbackError.message}`);
        }
    }
};

export default listen