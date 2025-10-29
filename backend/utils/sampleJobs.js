import dotenv from 'dotenv';
import connectDB from './db.js';
import { Job } from '../models/job.model.js';

dotenv.config();
connectDB();

const run = async () => {
  try {
    const jobs = await Job.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .select('title location salary created_at createdAt');

    if (!jobs.length) {
      console.log('No jobs found.');
      process.exit(0);
    }

    console.log(`Showing ${jobs.length} most recent jobs:`);
    jobs.forEach((j, i) => {
      const title = typeof j.title === 'string' ? j.title : (j.title?.toString?.() || '<no-title>');
      console.log(`${i + 1}. ${title} — ${j.location || 'N/A'} — salary: ${j.salary || 0}`);
    });

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
