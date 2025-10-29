import dotenv from 'dotenv';
import connectDB from './db.js';
import { User } from '../models/user.model.js';
import { Company } from '../models/company.model.js';
import { Job } from '../models/job.model.js';
import bcrypt from 'bcryptjs';

dotenv.config();
connectDB();

// Locations from filters
const LOCATIONS = [
  'Delhi NCR',
  'Bangalore',
  'Hyderabad',
  'Pune',
  'Mumbai'
];

// Job types/industries from filters
const INDUSTRIES = [
  'Frontend Developer',
  'Backend Developer',
  'Fullstack Developer'
];

// Work Types as per filter
const WORK_TYPES = [
  'Full-time',
  'Part-time',
  'Internship',
  'Remote',
  'Contract'
];

const companies = [
  {
    name: 'TechCorp India',
    description: 'Leading tech solutions provider',
    address: 'Cyber City',
    email: 'careers@techcorp.in'
  },
  {
    name: 'Innovate Solutions',
    description: 'Innovation-driven development company',
    address: 'Tech Park',
    email: 'hr@innovatesolutions.in'
  },
  {
    name: 'Digital Dynamics',
    description: 'Digital transformation company',
    address: 'InfoTech Zone',
    email: 'jobs@digitaldynamics.in'
  },
  {
    name: 'CodeCraft Technologies',
    description: 'Software development excellence',
    address: 'IT Hub',
    email: 'careers@codecraft.in'
  },
  {
    name: 'WebStack Solutions',
    description: 'Web development experts',
    address: 'Tech Valley',
    email: 'hr@webstack.in'
  }
];

const getRandomSalary = (workType) => {
  switch (workType) {
    case 'Full-time':
      return Math.floor(Math.random() * (150000 - 80000 + 1)) + 80000;
    case 'Contract':
      return Math.floor(Math.random() * (200000 - 100000 + 1)) + 100000;
    case 'Part-time':
      return Math.floor(Math.random() * (70000 - 40000 + 1)) + 40000;
    case 'Internship':
      return Math.floor(Math.random() * (35000 - 15000 + 1)) + 15000;
    case 'Remote':
      return Math.floor(Math.random() * (120000 - 60000 + 1)) + 60000;
    default:
      return 50000;
  }
};

const getExperienceLevel = (workType) => {
  switch (workType) {
    case 'Full-time':
      return Math.floor(Math.random() * 5) + 2; // 2-7 years
    case 'Contract':
      return Math.floor(Math.random() * 8) + 3; // 3-11 years
    case 'Part-time':
      return Math.floor(Math.random() * 3) + 1; // 1-4 years
    case 'Internship':
      return 0; // 0 years
    case 'Remote':
      return Math.floor(Math.random() * 6) + 2; // 2-8 years
    default:
      return 1;
  }
};

const createFilteredJobs = async () => {
  try {
    // Create a recruiter user
    const hashedPassword = await bcrypt.hash('password123', 10);
    const recruiter = await User.create({
      name: 'Recruiter Admin',
      email: 'recruiter@test.com',
      password: hashedPassword,
      role: 'recruiter',
      fullname: 'Recruiter Admin',
      phoneNumber: '9876543210'
    });
    console.log('Created recruiter user');

    // Create companies with different locations
    const createdCompanies = await Promise.all(
      companies.map(async (company, idx) => {
        const location = LOCATIONS[idx % LOCATIONS.length];
        return await Company.create({
          ...company,
          location,
          employees: Math.floor(Math.random() * 900) + 100,
          created_by: recruiter._id,
          userId: recruiter._id
        });
      })
    );
    console.log('Created companies');

    // Generate jobs for each combination of location, industry, and work type
    const jobs = [];
    LOCATIONS.forEach(location => {
      INDUSTRIES.forEach(industry => {
        WORK_TYPES.forEach(workType => {
          const company = createdCompanies[Math.floor(Math.random() * createdCompanies.length)];
          const salary = getRandomSalary(workType);
          const experienceLevel = getExperienceLevel(workType);
          
          // For Remote jobs, append "Remote" to location
          const jobLocation = workType === 'Remote' ? `${location} (Remote)` : location;
          
          jobs.push({
            title: `${industry} - ${workType}`,
            description: `We are looking for a ${industry} for ${workType} position in ${jobLocation}`,
            location: jobLocation,
            jobType: workType,
            salary: salary,
            company: company._id,
            created_by: recruiter._id,
            requirements: [
              experienceLevel === 0 
                ? 'No prior experience required'
                : `${experienceLevel}+ years of experience`,
              `Strong ${industry.split(' ')[0].toLowerCase()} skills`,
              'Good communication',
              workType === 'Remote' ? 'Excellent self-management skills' : 'Team player'
            ],
            experienceLevel: experienceLevel,
            position: Math.floor(Math.random() * 2) + 1 // 1-2 positions
          });
        });
      });
    });

    // Insert all jobs
    await Job.insertMany(jobs);
    console.log(`Created ${jobs.length} jobs with proper filters`);
    
    // Log some stats
    const locations = await Job.distinct('location');
    const workTypes = await Job.distinct('jobType');
    const jobCounts = await Job.aggregate([
      {
        $group: {
          _id: '$jobType',
          count: { $sum: 1 }
        }
      }
    ]);

    console.log('\nJob Distribution:');
    console.log('Locations:', locations);
    console.log('Work Types:', workTypes);
    console.log('\nJobs by Work Type:');
    jobCounts.forEach(type => {
      console.log(`${type._id}: ${type.count} jobs`);
    });

    // Sample jobs from each work type
    console.log('\nSample Jobs:');
    for (const workType of WORK_TYPES) {
      const job = await Job.findOne({ jobType: workType }).select('title location jobType salary');
      if (job) {
        console.log(`${job.title} — ${job.location} — ${job.jobType} — ₹${(job.salary/1000).toFixed(1)}k`);
      }
    }

    process.exit(0);
  } catch (error) {
    console.error('Error creating filtered data:', error);
    process.exit(1);
  }
};

createFilteredJobs();