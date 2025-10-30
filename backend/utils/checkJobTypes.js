import dotenv from 'dotenv';
import connectDB from './db.js';
import { Job } from '../models/job.model.js';

dotenv.config();
connectDB();

async function checkJobTypes() {
    try {
        const types = await Job.distinct('jobType');
        console.log('\nDistinct Job Types in DB:');
        types.forEach(type => console.log(`- ${type}`));
        
        const sample = await Job.findOne().lean();
        console.log('\nSample Job:');
        console.log('Title:', sample?.title);
        console.log('Location:', sample?.location);
        console.log('Job Type:', sample?.jobType);
        console.log('Description:', sample?.description?.substring(0, 50) + '...');
        
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

checkJobTypes();
