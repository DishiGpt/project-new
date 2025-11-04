import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Job } from '../models/job.model.js';
import { Company } from '../models/company.model.js';
import { User } from '../models/user.model.js';

dotenv.config();

const uri = process.env.MONGODB_URI || process.env.MONGO_URI;

const additionalJobs = [
    // Bangalore Jobs
    {
        title: "Senior Frontend Engineer",
        description: "Build amazing user interfaces with React and TypeScript. Work with a talented team to create world-class products.",
        requirements: ["React", "TypeScript", "CSS", "JavaScript", "Git"],
        salary: 125000,
        experienceLevel: 3,
        location: "Bangalore",
        jobType: "Full-time",
        position: 2,
    },
    {
        title: "Backend Developer",
        description: "Design and implement scalable backend services using Node.js and MongoDB. Build RESTful APIs and microservices.",
        requirements: ["Node.js", "MongoDB", "Express", "REST API", "Docker"],
        salary: 95000,
        experienceLevel: 2,
        location: "Bangalore",
        jobType: "Full-time",
        position: 3,
    },
    {
        title: "Full Stack Engineer",
        description: "Work on both frontend and backend. Build complete features end-to-end using modern tech stack.",
        requirements: ["React", "Node.js", "MongoDB", "AWS", "Docker"],
        salary: 145000,
        experienceLevel: 4,
        location: "Bangalore",
        jobType: "Full-time",
        position: 2,
    },
    {
        title: "DevOps Engineer",
        description: "Manage cloud infrastructure, CI/CD pipelines, and automate deployment processes.",
        requirements: ["AWS", "Docker", "Kubernetes", "Jenkins", "Linux"],
        salary: 135000,
        experienceLevel: 3,
        location: "Bangalore",
        jobType: "Full-time",
        position: 1,
    },
    {
        title: "React Developer",
        description: "Build modern web applications using React, Redux, and related ecosystem. Focus on component architecture.",
        requirements: ["React", "Redux", "JavaScript", "HTML", "CSS"],
        salary: 85000,
        experienceLevel: 2,
        location: "Bangalore",
        jobType: "Full-time",
        position: 3,
    },
    
    // Hyderabad Jobs
    {
        title: "Frontend Engineer",
        description: "Create responsive and accessible web applications. Work with design team to implement pixel-perfect UIs.",
        requirements: ["React", "JavaScript", "CSS", "HTML", "Figma"],
        salary: 78000,
        experienceLevel: 2,
        location: "Hyderabad",
        jobType: "Full-time",
        position: 2,
    },
    {
        title: "Senior Backend Developer",
        description: "Lead backend architecture decisions. Build scalable microservices and APIs.",
        requirements: ["Node.js", "PostgreSQL", "Redis", "Microservices", "AWS"],
        salary: 155000,
        experienceLevel: 5,
        location: "Hyderabad",
        jobType: "Full-time",
        position: 1,
    },
    {
        title: "Full Stack Developer",
        description: "End-to-end feature development. Work across the entire stack from database to UI.",
        requirements: ["React", "Node.js", "PostgreSQL", "Docker", "Git"],
        salary: 98000,
        experienceLevel: 3,
        location: "Hyderabad",
        jobType: "Full-time",
        position: 2,
    },
    {
        title: "Node.js Developer",
        description: "Build high-performance server-side applications. Optimize database queries and API performance.",
        requirements: ["Node.js", "Express", "MongoDB", "Redis", "Testing"],
        salary: 88000,
        experienceLevel: 2,
        location: "Hyderabad",
        jobType: "Full-time",
        position: 3,
    },
    {
        title: "Cloud Engineer",
        description: "Design and manage cloud infrastructure. Implement security best practices and cost optimization.",
        requirements: ["AWS", "Azure", "Terraform", "Docker", "Kubernetes"],
        salary: 142000,
        experienceLevel: 4,
        location: "Hyderabad",
        jobType: "Full-time",
        position: 1,
    },
];

async function seedAdditionalJobs() {
    try {
        console.log('Connecting to Atlas...');
        await mongoose.connect(uri);
        console.log('✓ Connected\n');
        
        // Get a recruiter user to assign as created_by
        const recruiter = await User.findOne({ role: 'recruiter' });
        if (!recruiter) {
            console.error('❌ No recruiter user found. Please create a recruiter first.');
            process.exit(1);
        }
        console.log(`✓ Found recruiter: ${recruiter.fullname || recruiter.email}\n`);
        
        // Get existing companies or create new ones for Bangalore and Hyderabad
        let companies = await Company.find({});
        
        if (companies.length === 0) {
            console.error('❌ No companies found. Please seed companies first.');
            process.exit(1);
        }
        
        console.log(`✓ Found ${companies.length} companies\n`);
        
        // Add jobs
        let addedCount = 0;
        for (const jobData of additionalJobs) {
            // Randomly assign a company
            const randomCompany = companies[Math.floor(Math.random() * companies.length)];
            
            const job = await Job.create({
                ...jobData,
                company: randomCompany._id,
                created_by: recruiter._id,
            });
            
            addedCount++;
            console.log(`✓ Added: ${job.title} at ${job.location}`);
        }
        
        console.log(`\n🎉 Successfully added ${addedCount} jobs!`);
        console.log('\nJob distribution:');
        const bangaloreJobs = await Job.find({ location: 'Bangalore' }).countDocuments();
        const hyderabadJobs = await Job.find({ location: 'Hyderabad' }).countDocuments();
        console.log(`  Bangalore: ${bangaloreJobs} jobs`);
        console.log(`  Hyderabad: ${hyderabadJobs} jobs`);
        
        await mongoose.disconnect();
        console.log('\n✓ Disconnected');
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

seedAdditionalJobs();
