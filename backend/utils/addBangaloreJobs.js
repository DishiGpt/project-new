import dotenv from 'dotenv';
import connectDB from './db.js';
import { User } from '../models/user.model.js';
import { Company } from '../models/company.model.js';
import { Job } from '../models/job.model.js';

dotenv.config();
connectDB();

const sampleTitles = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Engineer',
  'QA Engineer',
  'DevOps Engineer',
  'Data Scientist',
  'UI/UX Designer',
  'Mobile Developer',
  'Site Reliability Engineer',
  'Technical Lead'
];

const sampleReqs = [
  'Strong problem solving skills',
  'Experience with JavaScript',
  'Familiarity with REST APIs',
  'Good communication skills',
  'Experience with cloud platforms',
  'Knowledge of SQL/NoSQL databases'
];

const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getSalary = () => Math.floor(Math.random() * (160000 - 40000 + 1)) + 40000;
const getExperience = () => Math.floor(Math.random() * 7) + 1; // 1-7
const getPosition = () => Math.floor(Math.random() * 3) + 1; // 1-3 openings

const PREFIX = 'BLR_JOB_';

const addBangaloreJobs = async (count = 20) => {
  try {
    const users = await User.find();
    const companies = await Company.find();
    if (!users.length || !companies.length) {
      console.error('No users or companies found. Run seeder first.');
      process.exit(1);
    }

    // prefer recruiter
    let recruiter = users.find(u => u.role === 'recruiter');
    if (!recruiter) recruiter = users[0];

    const jobsToInsert = [];
    for (let i = 0; i < count; i++) {
      const baseTitle = getRandom(sampleTitles);
      const title = `${PREFIX}${Date.now().toString().slice(-5)}_${i}_${baseTitle}`;
      const description = `Hiring ${baseTitle} in Bengaluru. Work with great teams.`;
      const requirements = [getRandom(sampleReqs), getRandom(sampleReqs)];
      const salary = getSalary();
      const experienceLevel = getExperience();
      const location = 'Bengaluru, KA';
      const jobType = getRandom(jobTypes);
      const position = getPosition();
      const company = companies[i % companies.length]._id;

      jobsToInsert.push({
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
      });
    }

    const inserted = await Job.insertMany(jobsToInsert);
    console.log(`Inserted ${inserted.length} Bangalore jobs.`);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

addBangaloreJobs(25);
