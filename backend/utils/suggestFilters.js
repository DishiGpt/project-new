import dotenv from 'dotenv';
import connectDB from './db.js';
import { Job } from '../models/job.model.js';

dotenv.config();
connectDB();

async function suggestWorkingFilters() {
    try {
        console.log('\n=== Suggesting Working Filter Combinations ===\n');
        
        // Test 1: Remote + Full Stack + Contract
        let count = await Job.find({ 
            location: { $regex: 'remote', $options: 'i' },
            title: { $regex: 'full stack', $options: 'i' },
            jobType: { $regex: 'contract', $options: 'i' }
        }).countDocuments();
        console.log('1. Remote + Full Stack + Contract:', count, 'jobs');
        
        // Test 2: Remote + Frontend + Full-time
        count = await Job.find({ 
            location: { $regex: 'remote', $options: 'i' },
            title: { $regex: 'frontend', $options: 'i' },
            jobType: { $regex: 'full-time', $options: 'i' }
        }).countDocuments();
        console.log('2. Remote + Frontend + Full-time:', count, 'jobs');
        
        // Test 3: Remote + Backend + Full-time
        count = await Job.find({ 
            location: { $regex: 'remote', $options: 'i' },
            title: { $regex: 'backend', $options: 'i' },
            jobType: { $regex: 'full-time', $options: 'i' }
        }).countDocuments();
        console.log('3. Remote + Backend + Full-time:', count, 'jobs');
        
        // Test 4: Bengaluru + Frontend + Full-time
        count = await Job.find({ 
            location: { $regex: 'bengaluru', $options: 'i' },
            title: { $regex: 'frontend', $options: 'i' },
            jobType: { $regex: 'full-time', $options: 'i' }
        }).countDocuments();
        console.log('4. Bengaluru + Frontend + Full-time:', count, 'jobs');
        
        // Show a working combination
        const sample = await Job.findOne({ 
            location: { $regex: 'remote', $options: 'i' },
            title: { $regex: 'frontend', $options: 'i' },
            jobType: { $regex: 'full-time', $options: 'i' }
        }).lean();
        
        if (sample) {
            console.log('\n✅ Example of a job that SHOULD match "Remote + Frontend + Full-time":');
            console.log(`   Title: "${sample.title}"`);
            console.log(`   Location: "${sample.location}"`);
            console.log(`   JobType: "${sample.jobType}"`);
        }
        
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

suggestWorkingFilters();
