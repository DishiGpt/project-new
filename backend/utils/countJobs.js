import dotenv from 'dotenv';
import connectDB from './db.js';
import { Job } from '../models/job.model.js';

dotenv.config();
connectDB();

const run = async () => {
  try {
  const total = await Job.countDocuments();
  // demo jobs created by our script use the title prefix 'DEMO_JOB_'
  const demo = await Job.countDocuments({ title: { $regex: `^DEMO_JOB_` } });
  console.log(`Total jobs: ${total}`);
  console.log(`Demo jobs (title starts with DEMO_JOB_): ${demo}`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
