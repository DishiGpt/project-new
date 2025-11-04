import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Job } from '../models/job.model.js';
import { Company } from '../models/company.model.js';

dotenv.config();

const uri = process.env.MONGODB_URI || process.env.MONGO_URI;

async function checkDataIntegrity() {
    try {
        console.log('Connecting to Atlas...');
        await mongoose.connect(uri);
        console.log('✓ Connected\n');
        
        // Get all jobs
        const jobs = await Job.find({}).lean();
        console.log(`Total jobs: ${jobs.length}\n`);
        
        // Check for jobs with invalid company references
        let invalidCompanyRefs = 0;
        let validJobs = 0;
        
        for (const job of jobs) {
            if (!job.company) {
                console.log(`❌ Job "${job.title}" has no company reference`);
                invalidCompanyRefs++;
                continue;
            }
            
            const company = await Company.findById(job.company);
            if (!company) {
                console.log(`❌ Job "${job.title}" references non-existent company: ${job.company}`);
                invalidCompanyRefs++;
            } else {
                validJobs++;
            }
        }
        
        console.log(`\n✓ Valid jobs: ${validJobs}`);
        console.log(`❌ Jobs with invalid company refs: ${invalidCompanyRefs}`);
        
        if (invalidCompanyRefs > 0) {
            console.log('\n⚠️  To fix: Delete invalid jobs or update their company references');
        }
        
        await mongoose.disconnect();
        console.log('\n✓ Disconnected');
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

checkDataIntegrity();
