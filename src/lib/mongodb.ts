import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_URI as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let isConnected = false; // Track the connection status

const connectToDatabase = async () => {
  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
    });
    isConnected = true;
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Failed to connect to MongoDB');
  }
};

export default connectToDatabase;
