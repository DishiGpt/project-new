import dotenv from 'dotenv';
import connectDB from './db.js';
import { Job } from '../models/job.model.js';

dotenv.config();
connectDB();

async function testFilters() {
    try {
        console.log('\n=== Testing Filter Matches ===\n');
        
        // Test Remote location
        const remoteJobs = await Job.find({ 
            location: { $regex: 'remote', $options: 'i' } 
        }).countDocuments();
        console.log('Jobs with "Remote" in location:', remoteJobs);
        
        // Test Full Stack
        const fullStackJobs = await Job.find({ 
            title: { $regex: 'full stack', $options: 'i' } 
        }).countDocuments();
        console.log('Jobs with "Full Stack" in title:', fullStackJobs);
        
        // Test Internship
        const internshipJobs = await Job.find({ 
            jobType: { $regex: 'internship', $options: 'i' } 
        }).countDocuments();
        console.log('Jobs with "Internship" in jobType:', internshipJobs);
        
        // Test all three combined
        const combined = await Job.find({ 
            location: { $regex: 'remote', $options: 'i' },
            title: { $regex: 'full stack', $options: 'i' },
            jobType: { $regex: 'internship', $options: 'i' }
        }).countDocuments();
        console.log('\nJobs matching ALL three filters (Remote + Full Stack + Internship):', combined);
        
        // Show sample Full Stack jobs
        const sampleFullStack = await Job.find({ 
            title: { $regex: 'full stack', $options: 'i' } 
        }).limit(5).lean();
        
        console.log('\nSample Full Stack Jobs:');
        sampleFullStack.forEach((job, i) => {
            console.log(`${i + 1}. "${job.title}" | Location: "${job.location}" | Type: "${job.jobType}"`);
        });
        
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

testFilters();
