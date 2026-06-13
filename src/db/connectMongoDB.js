import mongoose from 'mongoose';
import dns from 'node:dns';

if (dns.getServers().includes('127.0.0.1')) {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
}

export const connectMongoDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    await mongoose.connect(mongoUrl);
    console.log('✅ MongoDB connection established successfully');
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
};
