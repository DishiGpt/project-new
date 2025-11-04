import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Job } from '../models/job.model.js';
import { Company } from '../models/company.model.js';

dotenv.config();

const uri = process.env.MONGODB_URI || process.env.MONGO_URI;

async function analyzeJobData() {
    try {
        console.log('Connecting to Atlas...');
        await mongoose.connect(uri);
        console.log('✓ Connected\n');
        
        const jobs = await Job.find({}).populate('company').lean();
        
        // Get unique locations
        const locations = [...new Set(jobs.map(j => j.location))].sort();
        console.log('📍 ACTUAL LOCATIONS IN DATABASE:');
        locations.forEach(loc => console.log(`  - ${loc}`));
        
        // Get unique job titles/roles
        const titles = [...new Set(jobs.map(j => j.title))].sort();
        console.log('\n💼 ACTUAL JOB TITLES IN DATABASE:');
        titles.forEach(title => console.log(`  - ${title}`));
        
        // Salary ranges
        const salaries = jobs.map(j => j.salary).filter(s => s).sort((a, b) => a - b);
        console.log('\n💰 SALARY RANGE:');
        console.log(`  Min: ${salaries[0]}`);
        console.log(`  Max: ${salaries[salaries.length - 1]}`);
        console.log(`  Jobs with salary 0-40k: ${jobs.filter(j => j.salary >= 0 && j.salary <= 40000).length}`);
        console.log(`  Jobs with salary 42k-1lakh: ${jobs.filter(j => j.salary >= 42000 && j.salary <= 100000).length}`);
        console.log(`  Jobs with salary 1lakh-5lakh: ${jobs.filter(j => j.salary >= 100000 && j.salary <= 500000).length}`);
        
        // Check what would match the filter options
        console.log('\n🔍 FILTER MATCHING ANALYSIS:');
        console.log('\nLocation filters:');
        ['Delhi NCR', 'Bangalore', 'Hyderabad', 'Pune', 'Mumbai'].forEach(filter => {
            const matches = jobs.filter(j => j.location.toLowerCase().includes(filter.toLowerCase())).length;
            console.log(`  "${filter}" matches: ${matches} jobs`);
        });
        
        console.log('\nIndustry/Title filters:');
        ['Frontend Developer', 'Backend Developer', 'FullStack Developer'].forEach(filter => {
            const matches = jobs.filter(j => j.title.toLowerCase().includes(filter.toLowerCase())).length;
            console.log(`  "${filter}" matches: ${matches} jobs`);
        });
        
        await mongoose.disconnect();
        console.log('\n✓ Disconnected');
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

analyzeJobData();
