import dotenv from 'dotenv';
import connectDB from './db.js';
import { Job } from '../models/job.model.js';
import { Company } from '../models/company.model.js';

dotenv.config();
connectDB();

const indianCities = [
  'Delhi NCR',
  'Mumbai, MH',
  'Bengaluru, KA',
  'Hyderabad, TS',
  'Pune, MH',
  'Chennai, TN',
  'Kolkata, WB',
  'Gurugram, HR',
  'Noida, UP',
  'Jaipur, RJ',
  'Ahmedabad, GJ',
  'Lucknow, UP',
  'Bhopal, MP',
  'Visakhapatnam, AP',
  'Coimbatore, TN'
];

const isIndianLocation = (loc) => {
  if (!loc) return false;
  const keywords = ['Bengaluru','Bangalore','Mumbai','Delhi','Hyderabad','Pune','Chennai','Kolkata','Gurugram','Noida','Jaipur','Ahmedabad','Lucknow','Bhopal','Visakhapatnam','Coimbatore','UP','MH','KA','TN','WB','HR','GJ','MP','AP','DL'];
  return keywords.some(k => loc.toLowerCase().includes(k.toLowerCase()));
}

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const fixLocations = async () => {
  try {
    const jobs = await Job.find().populate('company');
    if (!jobs.length) {
      console.log('No jobs found.');
      process.exit(0);
    }

    let updated = 0;
    for (const job of jobs) {
      let newLoc = null;
      if (job.company && job.company.location && isIndianLocation(job.company.location)) {
        newLoc = job.company.location;
      } else if (job.company && job.company.location && !isIndianLocation(job.company.location)) {
        // company location not Indian; choose an Indian city
        newLoc = getRandom(indianCities);
      } else {
        // fallback: random Indian city
        newLoc = getRandom(indianCities);
      }

      if (job.location !== newLoc) {
        await Job.updateOne({ _id: job._id }, { $set: { location: newLoc } });
        updated++;
      }
    }

    console.log(`Fixed locations for ${updated} job(s).`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

fixLocations();
