import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/song_db';
    console.log(`[DB] Connecting to MongoDB at ${mongoURI}...`);

    await mongoose.connect(mongoURI);
    console.log('[DB] MongoDB Connected Successfully.');
  } catch (error) {
    console.error('[DB] MongoDB Connection Error:', error);
    process.exit(1);
  }
};
