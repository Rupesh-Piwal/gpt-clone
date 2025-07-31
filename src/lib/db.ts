import mongoose from 'mongoose';

interface ConnectionObject {
  isConnected?: number;
}

const connection: ConnectionObject = {};

async function connectDB(): Promise<void> {
  // Check if already connected
  if (connection.isConnected) {
    console.log('✅ Already connected to MongoDB');
    return;
  }

  try {
    // Connect to MongoDB
    const db = await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: process.env.MONGODB_DB_NAME || 'chatgpt_clone',
    });

    connection.isConnected = db.connections[0].readyState;

    console.log('✅ Connected to MongoDB successfully');

    // Handle connection events
    mongoose.connection.on('connected', () => {
      console.log('🔗 Mongoose connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('🔌 Mongoose disconnected from MongoDB');
    });

  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
}

export default connectDB;