import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './db.js';
import { User } from '../models/user.model.js';
import { Company } from '../models/company.model.js';
import { Job } from '../models/job.model.js';
import { Application } from '../models/application.model.js';

dotenv.config();

const checkData = async () => {
    try {
        await connectDB();
        
        console.log('\n=== MongoDB Atlas Data Check ===\n');
        
        // Get database name
        const dbName = mongoose.connection.db.databaseName;
        console.log(`Connected to database: ${dbName}`);
        console.log(`Cluster host: ${mongoose.connection.host}\n`);
        
        // Check collections and counts
        const userCount = await User.countDocuments();
        const companyCount = await Company.countDocuments();
        const jobCount = await Job.countDocuments();
        const applicationCount = await Application.countDocuments();
        
        console.log('Collection counts:');
        console.log(`  Users: ${userCount}`);
        console.log(`  Companies: ${companyCount}`);
        console.log(`  Jobs: ${jobCount}`);
        console.log(`  Applications: ${applicationCount}`);
        
        if (userCount === 0 && companyCount === 0 && jobCount === 0) {
            console.log('\n⚠️  Atlas cluster is EMPTY. You need to seed data.');
            console.log('\nTo seed sample data, run:');
            console.log('  npm run seed\n');
        } else {
            console.log('\n✓ Atlas cluster has data.');
            
            // Show sample data
            if (userCount > 0) {
                const sampleUsers = await User.find().limit(3).select('fullname email role');
                console.log('\nSample users:');
                sampleUsers.forEach((u, i) => {
                    console.log(`  ${i + 1}. ${u.fullname} (${u.email}) - Role: ${u.role}`);
                });
            }
            
            if (companyCount > 0) {
                const sampleCompanies = await Company.find().limit(3).select('name location');
                console.log('\nSample companies:');
                sampleCompanies.forEach((c, i) => {
                    console.log(`  ${i + 1}. ${c.name} - ${c.location || 'N/A'}`);
                });
            }
            
            if (jobCount > 0) {
                const sampleJobs = await Job.find().limit(5).select('title location salary company').populate('company', 'name');
                console.log('\nSample jobs:');
                sampleJobs.forEach((j, i) => {
                    console.log(`  ${i + 1}. ${j.title} at ${j.company?.name || 'Unknown'} - ${j.location} - ${j.salary || 0}`);
                });
            }
        }
        
        console.log('\n=== Check Complete ===\n');
        process.exit(0);
    } catch (error) {
        console.error('Error checking data:', error.message);
        process.exit(1);
    }
};

checkData();
