import dotenv from 'dotenv';
import connectDB from './db.js';
import { Job } from '../models/job.model.js';

dotenv.config();

connectDB();

const indianLocations = [
  'Delhi NCR',
  'Mumbai, MH',
  'Bengaluru, KA',
  'Hyderabad, TS',
  'Pune, MH',
  'Chennai, TN',
  'Kolkata, WB',
  'Gurugram, HR',
  'Noida, UP',
  'Jaipur, RJ',
  'Ahmedabad, GJ',
  'Lucknow, UP',
  'Bhopal, MP',
  'Visakhapatnam, AP',
  'Coimbatore, TN',
  'Remote'
];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const updateAllJobLocations = async () => {
  try {
    const jobs = await Job.find();
    if (!jobs.length) {
      console.log('No jobs found.');
      process.exit(0);
    }

    const updates = jobs.map(job => {
      const newLoc = getRandom(indianLocations);
      return Job.updateOne({ _id: job._id }, { $set: { location: newLoc } });
    });

    const res = await Promise.all(updates);
    const modified = res.reduce((acc, r) => acc + (r.modifiedCount || r.nModified || 0), 0);
    console.log(`Updated ${modified} job location(s) to Indian cities.`);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

updateAllJobLocations();
