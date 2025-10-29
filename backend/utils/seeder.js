import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './db.js';
import { User } from '../models/user.model.js';
import { Company } from '../models/company.model.js';
import { Job } from '../models/job.model.js';
import { users, companies, jobs } from './seedData.js';

dotenv.config();

connectDB();

const importData = async () => {
    try {
        // Clear existing data
        await User.deleteMany();
        await Company.deleteMany();
        await Job.deleteMany();

        // Insert users
        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;

        // Insert companies with recruiter (userId) reference
        const sampleCompanies = companies.map(company => {
            return { ...company, userId: adminUser };
        });
        const createdCompanies = await Company.insertMany(sampleCompanies);

        // Insert jobs with company and created_by reference
        const sampleJobs = jobs.map((job, index) => {
            return {
                ...job,
                company: createdCompanies[index % createdCompanies.length]._id,
                created_by: adminUser
            };
        });
        await Job.insertMany(sampleJobs);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Company.deleteMany();
        await Job.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}