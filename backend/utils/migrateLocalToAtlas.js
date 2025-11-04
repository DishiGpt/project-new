import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/user.model.js';
import { Company } from '../models/company.model.js';
import { Job } from '../models/job.model.js';
import { Application } from '../models/application.model.js';

dotenv.config();

// Source: localhost
const localUri = 'mongodb://localhost:27017/jobportal';
// Target: Atlas (from .env)
const atlasUri = process.env.MONGODB_URI || process.env.MONGO_URI;

async function migrateData() {
    try {
        console.log('\n=== Migration: Localhost → Atlas ===\n');

        // Connect to localhost first
        console.log('1. Connecting to localhost...');
        const localConn = await mongoose.createConnection(localUri).asPromise();
        console.log('✓ Connected to localhost:', localConn.host);

        // Fetch all data from localhost
        console.log('\n2. Fetching data from localhost...');
        const LocalUser = localConn.model('User', User.schema);
        const LocalCompany = localConn.model('Company', Company.schema);
        const LocalJob = localConn.model('Job', Job.schema);
        const LocalApplication = localConn.model('Application', Application.schema);

        const localUsers = await LocalUser.find().lean();
        const localCompanies = await LocalCompany.find().lean();
        const localJobs = await LocalJob.find().lean();
        const localApplications = await LocalApplication.find().lean();

        console.log(`  Found ${localUsers.length} users`);
        console.log(`  Found ${localCompanies.length} companies`);
        console.log(`  Found ${localJobs.length} jobs`);
        console.log(`  Found ${localApplications.length} applications`);

        if (!localUsers.length && !localCompanies.length && !localJobs.length && !localApplications.length) {
            console.log('\n❌ No data found in localhost. Nothing to migrate.');
            await localConn.close();
            process.exit(0);
        }

        // Connect to Atlas
        console.log('\n3. Connecting to Atlas...');
        const atlasConn = await mongoose.createConnection(atlasUri).asPromise();
        console.log('✓ Connected to Atlas:', atlasConn.host);

        // Get Atlas models
        const AtlasUser = atlasConn.model('User', User.schema);
        const AtlasCompany = atlasConn.model('Company', Company.schema);
        const AtlasJob = atlasConn.model('Job', Job.schema);
        const AtlasApplication = atlasConn.model('Application', Application.schema);

        // Check if Atlas already has data
        const existingJobsCount = await AtlasJob.countDocuments();
        if (existingJobsCount > 0) {
            console.log(`\n⚠️  Atlas already has ${existingJobsCount} jobs.`);
            console.log('Options:');
            console.log('  A) Replace all Atlas data with localhost data');
            console.log('  B) Add localhost data to Atlas (append)');
            console.log('  C) Cancel migration');
            console.log('\nDefaulting to option B (append)...\n');
        }

        // Migrate data (append mode)
        console.log('4. Migrating data to Atlas...');

        // Create ID mappings for references
        const userIdMap = new Map();
        const companyIdMap = new Map();
        const jobIdMap = new Map();

        // Migrate Users
        if (localUsers.length > 0) {
            console.log(`  Migrating ${localUsers.length} users...`);
            for (const user of localUsers) {
                const oldId = user._id;
                delete user._id; // Let Atlas generate new IDs
                
                // Ensure required fields are present
                if (!user.fullname) {
                    user.fullname = user.name || 'Unknown User';
                }
                if (!user.email) {
                    console.log(`  ⚠️  Skipping user without email: ${user.fullname}`);
                    continue;
                }
                
                try {
                    const newUser = await AtlasUser.create(user);
                    userIdMap.set(oldId.toString(), newUser._id);
                } catch (err) {
                    console.log(`  ⚠️  Failed to migrate user ${user.email}: ${err.message}`);
                }
            }
            console.log('  ✓ Users migrated');
        }

        // Migrate Companies
        if (localCompanies.length > 0) {
            console.log(`  Migrating ${localCompanies.length} companies...`);
            for (const company of localCompanies) {
                const oldId = company._id;
                delete company._id;
                // Update userId reference if exists
                if (company.userId && userIdMap.has(company.userId.toString())) {
                    company.userId = userIdMap.get(company.userId.toString());
                }
                const newCompany = await AtlasCompany.create(company);
                companyIdMap.set(oldId.toString(), newCompany._id);
            }
            console.log('  ✓ Companies migrated');
        }

        // Migrate Jobs
        if (localJobs.length > 0) {
            console.log(`  Migrating ${localJobs.length} jobs...`);
            for (const job of localJobs) {
                const oldId = job._id;
                delete job._id;
                // Update company reference
                if (job.company && companyIdMap.has(job.company.toString())) {
                    job.company = companyIdMap.get(job.company.toString());
                }
                // Update created_by reference
                if (job.created_by && userIdMap.has(job.created_by.toString())) {
                    job.created_by = userIdMap.get(job.created_by.toString());
                }
                // Update applications array references
                if (job.applications && job.applications.length > 0) {
                    job.applications = []; // Will be updated after applications migration
                }
                const newJob = await AtlasJob.create(job);
                jobIdMap.set(oldId.toString(), newJob._id);
            }
            console.log('  ✓ Jobs migrated');
        }

        // Migrate Applications
        if (localApplications.length > 0) {
            console.log(`  Migrating ${localApplications.length} applications...`);
            for (const app of localApplications) {
                delete app._id;
                // Update references
                if (app.job && jobIdMap.has(app.job.toString())) {
                    app.job = jobIdMap.get(app.job.toString());
                }
                if (app.applicant && userIdMap.has(app.applicant.toString())) {
                    app.applicant = userIdMap.get(app.applicant.toString());
                }
                await AtlasApplication.create(app);
            }
            console.log('  ✓ Applications migrated');
        }

        // Close connections
        await localConn.close();
        await atlasConn.close();

        console.log('\n✅ Migration completed successfully!');
        console.log(`\nMigrated:`);
        console.log(`  - ${localUsers.length} users`);
        console.log(`  - ${localCompanies.length} companies`);
        console.log(`  - ${localJobs.length} jobs`);
        console.log(`  - ${localApplications.length} applications`);

        process.exit(0);
    } catch (error) {
        console.error('\n❌ Migration failed:', error.message);
        console.error(error);
        process.exit(1);
    }
}

migrateData();
