import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Song } from '../models/Song';
import { initialSongs } from '../utils/seedData';

dotenv.config();

const seed = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/song_db';
    console.log('[Seed] Connecting to MongoDB...');
    await mongoose.connect(mongoURI);
    console.log('[Seed] Connected.');

    // Clear existing songs
    await Song.deleteMany({});
    console.log('[Seed] Cleared existing songs.');

    // Insert seed data
    await Song.insertMany(initialSongs);
    console.log(`[Seed] ✅ Successfully seeded ${initialSongs.length} songs.`);

    await mongoose.disconnect();
    console.log('[Seed] Disconnected. Done!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed] ❌ Error seeding database:', error);
    process.exit(1);
  }
};

seed();
