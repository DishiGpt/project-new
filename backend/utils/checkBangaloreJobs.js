import dotenv from 'dotenv';
import connectDB from './db.js';
import { Job } from '../models/job.model.js';

dotenv.config();
connectDB();

const checkBangaloreJobs = async () => {
  try {
    // Check all variations of Bangalore/Bengaluru
    const jobs = await Job.find({
      location: { 
        $in: [
          'Bangalore',
          'Bengaluru',
          'Bangalore, KA',
          'Bengaluru, KA',
          'Bangalore, Karnataka',
          'Bengaluru, Karnataka'
        ]
      }
    }).select('title location salary createdAt');

    if (!jobs.length) {
      console.log('No jobs found in Bangalore/Bengaluru');
      process.exit(0);
    }

    console.log(`Found ${jobs.length} jobs in Bangalore/Bengaluru:`);
    jobs.forEach((job, i) => {
      console.log(`${i + 1}. ${job.title} — ${job.location} — ₹${job.salary.toLocaleString('en-IN')}`);
    });

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

checkBangaloreJobs();