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

const sampleLocations = [
  'Bengaluru, KA',
  'Mumbai, MH',
  'New Delhi, DL',
  'Hyderabad, TS',
  'Pune, MH',
  'Chennai, TN',
  'Kolkata, WB',
  'Gurugram, HR',
  'Noida, UP',
  'Remote'
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

const createJobs = async (count = 48) => {
  try {
    const users = await User.find();
    const companies = await Company.find();

    if (!users.length || !companies.length) {
      console.error('No users or companies found. Run seeder first.');
      process.exit(1);
    }

    // prefer a recruiter user
    let recruiter = users.find(u => u.role === 'recruiter');
    if (!recruiter) recruiter = users[0];

    const jobsToInsert = [];
    for (let i = 0; i < count; i++) {
      const title = `${getRandom(sampleTitles)} ${Math.floor(Math.random() * 1000)}`;
      const description = `We are hiring a ${title}. Join our team to work on impactful projects.`;
      const requirements = [getRandom(sampleReqs), getRandom(sampleReqs), getRandom(sampleReqs)];
      const salary = getSalary();
      const experienceLevel = getExperience();
      const location = getRandom(sampleLocations);
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
    console.log(`Inserted ${inserted.length} jobs.`);
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createJobs(48);
