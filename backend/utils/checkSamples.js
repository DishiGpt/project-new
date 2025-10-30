import dotenv from 'dotenv';
import connectDB from './db.js';
import { Job } from '../models/job.model.js';

dotenv.config();
connectDB();

async function checkSamples() {
    try {
        const jobs = await Job.find().limit(10).lean();
        console.log('\nSample Jobs:');
        jobs.forEach((job, idx) => {
            console.log(`\n${idx + 1}. ${job.title}`);
            console.log(`   Location: ${job.location}`);
            console.log(`   Type: ${job.jobType}`);
        });
        
        const titles = await Job.distinct('title');
        console.log('\n\nAll Unique Titles (' + titles.length + '):');
        titles.slice(0, 20).forEach(title => console.log(`- ${title}`));
        
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

checkSamples();
