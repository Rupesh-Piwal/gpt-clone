
import mongoose, { Mongoose } from "mongoose";

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

const globalWithMongoose = global as typeof globalThis & {
  mongoose: MongooseConnection;
};

let cached = globalWithMongoose.mongoose;

if (!cached) {
  cached = globalWithMongoose.mongoose = {
    conn: null,
    promise: null,
  };
}

async function connectDB(): Promise<Mongoose> {
 
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const MONGODB_URI = process.env.MONGODB_URI;
    const DB_NAME = process.env.MONGODB_DB_NAME || "chat-gpt";

    if (!MONGODB_URI) {
      throw new Error("❌ MONGODB_URI is not defined in .env");
    }

    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: DB_NAME,
      bufferCommands: false,
      connectTimeoutMS: 30000,
    });
  }

  try {
    cached.conn = await cached.promise;

    // Log once in dev
    if (process.env.NODE_ENV !== "production") {
      mongoose.connection.on("connected", () => {
        console.log("🔗 Mongoose connected to MongoDB");
      });

      mongoose.connection.on("error", (err) => {
        console.error("❌ Mongoose connection error:", err);
      });

      mongoose.connection.on("disconnected", () => {
        console.log("🔌 Mongoose disconnected");
      });
    }

    console.log("✅ MongoDB connected");
    return cached.conn;
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    throw error;
  }
}

export default connectDB;
