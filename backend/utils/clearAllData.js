import dotenv from 'dotenv';
import connectDB from './db.js';
import { Job } from '../models/job.model.js';
import { User } from '../models/user.model.js';
import { Company } from '../models/company.model.js';
import { Application } from '../models/application.model.js';

dotenv.config();
connectDB();

const clearAllData = async () => {
  try {
    await Job.deleteMany({});
    await User.deleteMany({});
    await Company.deleteMany({});
    await Application.deleteMany({});
    console.log('All data cleared from database.');
    process.exit(0);
  } catch (error) {
    console.error('Error clearing data:', error);
    process.exit(1);
  }
};

clearAllData();