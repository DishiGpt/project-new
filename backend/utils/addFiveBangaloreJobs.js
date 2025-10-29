import dotenv from 'dotenv';
import connectDB from './db.js';
import { User } from '../models/user.model.js';
import { Company } from '../models/company.model.js';
import { Job } from '../models/job.model.js';

dotenv.config();
connectDB();

const sampleTitles = [
  'Senior Software Engineer',
  'Machine Learning Engineer',
  'Cloud Architect',
  'Product Manager',
  'React Native Developer'
];

const sampleReqs = [
  '5+ years of experience',
  'Strong system design skills',
  'Team leadership experience',
  'Experience with cloud platforms',
  'Strong communication skills'
];

const jobTypes = ['Full-time'];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getSalary = () => Math.floor(Math.random() * (200000 - 100000 + 1)) + 100000; // Higher range
const getExperience = () => Math.floor(Math.random() * 5) + 5; // 5-10 years
const getPosition = () => Math.floor(Math.random() * 2) + 1; // 1-2 openings

const PREFIX = 'BLR_SR_';

const addFiveBangaloreJobs = async () => {
  try {
    const users = await User.find();
    const companies = await Company.find();
    if (!users.length || !companies.length) {
      console.error('No users or companies found. Run seeder first.');
      process.exit(1);
    }

    let recruiter = users.find(u => u.role === 'recruiter');
    if (!recruiter) recruiter = users[0];

    const jobsToInsert = sampleTitles.map((baseTitle, i) => {
      const title = `${PREFIX}${Date.now().toString().slice(-5)}_${i}_${baseTitle}`;
      const description = `Senior role for ${baseTitle} position in Bengaluru office. Lead teams and drive innovation.`;
      const requirements = [getRandom(sampleReqs), getRandom(sampleReqs), '5+ years of experience required'];
      const salary = getSalary();
      const experienceLevel = getExperience();
      const location = 'Bengaluru, KA';
      const jobType = getRandom(jobTypes);
      const position = getPosition();
      const company = companies[i % companies.length]._id;

      return {
        title,
        description,
        requirements,
        salary,
        experienceLevel,
        location,
        jobType,
        position,
        company,
        created_by: recruiter._id
      };
    });

    const inserted = await Job.insertMany(jobsToInsert);
    console.log(`Inserted ${inserted.length} senior-level Bangalore jobs.`);
    
    // List the jobs we just added
    console.log('\nNew jobs added:');
    inserted.forEach((job, i) => {
      console.log(`${i + 1}. ${job.title} (₹${job.salary.toLocaleString('en-IN')})`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

addFiveBangaloreJobs();