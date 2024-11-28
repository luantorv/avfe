import { mongoose } from 'mongoose'

const listen = async () => {
    try {
        const mongoURI = 'mongodb://localhost:27017/';
        await mongoose.connect(mongoURI);
        console.log(`Connected to MongoDB at ${mongoURI}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB at ${mongoURI}: ${error.message}`);
        try {
            const fallbackURI = 'mongodb://0.0.0.0:27017';
            await mongoose.connect(fallbackURI);
            console.log(`Connected to MongoDB at ${fallbackURI}`);
        } catch (fallbackError) {
            console.error(`Error connecting to MongoDB at 127.0.0.1: ${fallbackError.message}`);
        }
    }
};

export default listen