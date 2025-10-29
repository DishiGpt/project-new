import dotenv from 'dotenv';
import connectDB from './db.js';
import { Job } from '../models/job.model.js';

dotenv.config();
connectDB();

const listLocations = async () => {
  try {
    const locations = await Job.distinct('location');
    console.log('Distinct job locations in DB:');
    locations.sort().forEach(l => console.log('-', l));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

listLocations();
