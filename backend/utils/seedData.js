import bcrypt from 'bcryptjs';

// Users: roles must match the schema enum ['student','recruiter']
const users = [
    {
        fullname: 'Admin User',
        email: 'admin@example.com',
        phoneNumber: 1234567890,
        // hashed password
        password: bcrypt.hashSync('123456', 10),
        role: 'recruiter'
    },
    {
        fullname: 'John Doe',
        email: 'john@example.com',
        phoneNumber: 9876543210,
        password: bcrypt.hashSync('123456', 10),
        role: 'student'
    }
];

// Companies: we don't include userId here; seeder will attach the recruiter userId
const companies = [
    {
        name: 'InfyWorks Technologies',
        description: 'Enterprise software and cloud solutions',
        website: 'https://infyworks.example.com',
        location: 'Bengaluru, KA',
        logo: 'https://example.com/logo1.png'
    },
    {
        name: 'BlueOak Labs',
        description: 'AI and data engineering firm',
        website: 'https://blueoak.example.com',
        location: 'Hyderabad, TS',
        logo: 'https://example.com/logo2.png'
    },
    {
        name: 'Kinetic Solutions',
        description: 'Fintech and payments platform',
        website: 'https://kinetic.example.com',
        location: 'Mumbai, MH',
        logo: 'https://example.com/logo3.png'
    },
    {
        name: 'GreenField Systems',
        description: 'SaaS products for small businesses',
        website: 'https://greenfield.example.com',
        location: 'Pune, MH',
        logo: 'https://example.com/logo4.png'
    },
    {
        name: 'Nimbus Interactive',
        description: 'Creative digital agency',
        website: 'https://nimbus.example.com',
        location: 'Chennai, TN',
        logo: 'https://example.com/logo5.png'
    },
    {
        name: 'Astra Robotics',
        description: 'Robotics and automation startup',
        website: 'https://astra.example.com',
        location: 'Gurugram, HR',
        logo: 'https://example.com/logo6.png'
    }
];

// Jobs: must match Job schema (salary:number, experienceLevel:number, position:number, jobType, etc.)
const jobs = [
    {
        title: 'Senior Software Engineer',
        description: 'We are looking for an experienced software engineer to join our core platform team.',
        requirements: [
            '5+ years of experience',
            'Strong JavaScript/Node.js skills',
            'Experience with React or similar frameworks'
        ],
        salary: 140000,
        experienceLevel: 5,
        location: 'San Francisco, CA',
        jobType: 'Full-time',
        position: 1
    },
    {
        title: 'Product Manager',
        description: 'Seeking an experienced product manager to lead B2B product initiatives.',
        requirements: [
            '3+ years of product management',
            'Technical background preferred',
            'Strong communication skills'
        ],
        salary: 115000,
        experienceLevel: 3,
        location: 'New York, NY',
        jobType: 'Full-time',
        position: 1
    }
];

export { users, companies, jobs };