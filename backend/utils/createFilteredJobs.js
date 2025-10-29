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

// Salary ranges from filters (in thousands per month)
const SALARY_RANGES = {
  'entry': { min: 0, max: 40 },     // 0-40k
  'mid': { min: 42, max: 110 },     // 42-110k
  'senior': { min: 110, max: 500 }  // 110k-5L
};

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

    // Generate jobs for each combination of location, industry, and salary range
    const jobs = [];
    LOCATIONS.forEach(location => {
      INDUSTRIES.forEach(industry => {
        Object.entries(SALARY_RANGES).forEach(([level, range]) => {
          const company = createdCompanies[Math.floor(Math.random() * createdCompanies.length)];
          const salary = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
          const experience = level === 'entry' ? '0-2' : level === 'mid' ? '2-5' : '5+';
          
          jobs.push({
            title: `${level.charAt(0).toUpperCase() + level.slice(1)} ${industry}`,
            description: `We are looking for a ${level} level ${industry} in ${location}`,
            location: location,
            jobType: 'Full-time',
            salary: salary * 1000, // Convert to actual salary
            company: company._id,
            created_by: recruiter._id,
            requirements: [
              `${experience} years of experience`,
              `Strong ${industry.split(' ')[0].toLowerCase()} skills`,
              'Good communication',
              'Team player'
            ],
            experienceLevel: level === 'entry' ? 1 : level === 'mid' ? 3 : 5,
            position: Math.floor(Math.random() * 3) + 1 // 1-3 positions
          });
        });
      });
    });

    // Insert all jobs
    await Job.insertMany(jobs);
    console.log(`Created ${jobs.length} jobs with proper filters`);
    
    // Log some stats
    const locations = await Job.distinct('location');
    const salaryRanges = await Job.aggregate([
      {
        $group: {
          _id: {
            $switch: {
              branches: [
                { case: { $lte: ['$salary', 40000] }, then: '0-40k' },
                { case: { $lte: ['$salary', 110000] }, then: '42-110k' },
                { case: { $gt: ['$salary', 110000] }, then: '110k-5L' }
              ],
              default: 'Other'
            }
          },
          count: { $sum: 1 }
        }
      }
    ]);

    console.log('\nJob Distribution:');
    console.log('Locations:', locations);
    console.log('Salary Ranges:', salaryRanges.map(r => `${r._id}: ${r.count} jobs`).join(', '));

    process.exit(0);
  } catch (error) {
    console.error('Error creating filtered data:', error);
    process.exit(1);
  }
};

createFilteredJobs();