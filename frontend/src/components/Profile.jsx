import React, { useState, useEffect } from 'react'
// Removed Navbar import - now using Layout in App.jsx
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen, FileText, Award, Briefcase, Building2, MapPin, ExternalLink } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import axios from 'axios'
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import { motion } from 'framer-motion'

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [postedJobs, setPostedJobs] = useState([]);
    const {user} = useSelector(store=>store.auth);

    useEffect(() => {
        const fetchRecruiterData = async () => {
            if (!user || user.role !== 'recruiter') return;
            try {
                const [cRes, jRes] = await Promise.all([
                    axios.get(`${COMPANY_API_END_POINT}/get`, { withCredentials: true }),
                    axios.get(`${JOB_API_END_POINT}/getadminjobs`, { withCredentials: true })
                ]);
                if (cRes.data?.success) setCompanies(cRes.data.companies || []);
                if (jRes.data?.success) setPostedJobs(jRes.data.jobs || []);
            } catch (err) {
                console.error('Failed to fetch recruiter data', err);
            }
        }
        fetchRecruiterData();
    }, [user]);

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50/30 to-purple-50/30 dark:from-gray-900 dark:via-indigo-950/20 dark:to-purple-950/20 py-10 px-4'>
            {/* Navbar removed - now rendered by Layout component */}
            
            <div className='max-w-5xl mx-auto space-y-6'>
                {/* Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='glass-card p-8'
                >
                    <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-6'>
                        <div className='flex items-start gap-6'>
                            <div className='relative'>
                                <Avatar className="h-24 w-24 ring-4 ring-indigo-100 dark:ring-indigo-900/50">
                                    <AvatarImage 
                                        src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} 
                                        alt="profile" 
                                    />
                                </Avatar>
                                <div className='absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-gray-900' />
                            </div>
                            <div>
                                <h1 className='text-2xl font-bold text-gray-900 dark:text-white mb-1'>
                                    {user?.fullname}
                                </h1>
                                <p className='text-gray-600 dark:text-gray-400 mb-3'>
                                    {user?.profile?.bio || 'No bio available'}
                                </p>
                                <Badge className='bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 border-0'>
                                    {user?.role === 'student' ? '👨‍🎓 Job Seeker' : '🏢 Recruiter'}
                                </Badge>
                            </div>
                        </div>
                        <Button 
                            onClick={() => setOpen(true)} 
                            className="btn-gradient flex items-center gap-2"
                        >
                            <Pen className='w-4 h-4' />
                            Edit Profile
                        </Button>
                    </div>

                    {/* Contact Info */}
                    <div className='mt-6 pt-6 border-t border-gray-200 dark:border-gray-700'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            <div className='flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl'>
                                <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-600/10 flex items-center justify-center'>
                                    <Mail className='w-5 h-5 text-blue-600 dark:text-blue-400' />
                                </div>
                                <div>
                                    <p className='text-xs text-gray-500 dark:text-gray-400'>Email</p>
                                    <p className='text-sm font-medium text-gray-900 dark:text-white'>{user?.email}</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl'>
                                <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/10 to-purple-600/10 flex items-center justify-center'>
                                    <Contact className='w-5 h-5 text-purple-600 dark:text-purple-400' />
                                </div>
                                <div>
                                    <p className='text-xs text-gray-500 dark:text-gray-400'>Phone</p>
                                    <p className='text-sm font-medium text-gray-900 dark:text-white'>{user?.phoneNumber}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Student-Specific Sections */}
                {user?.role === 'student' && (
                    <>
                        {/* Skills Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className='glass-card p-6'
                        >
                            <div className='flex items-center gap-2 mb-4'>
                                <Award className='w-5 h-5 text-indigo-600 dark:text-indigo-400' />
                                <h2 className='text-lg font-bold text-gray-900 dark:text-white'>Skills</h2>
                            </div>
                            <div className='flex flex-wrap gap-2'>
                                {user?.profile?.skills?.length ? (
                                    user.profile.skills.map((item, index) => (
                                        <Badge 
                                            key={index}
                                            className='bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-700 dark:text-indigo-300 border-0 hover:scale-105 transition-transform'
                                        >
                                            {item}
                                        </Badge>
                                    ))
                                ) : (
                                    <span className='text-gray-500 dark:text-gray-400'>No skills added yet</span>
                                )}
                            </div>
                        </motion.div>

                        {/* Resume Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className='glass-card p-6'
                        >
                            <div className='flex items-center gap-2 mb-4'>
                                <FileText className='w-5 h-5 text-purple-600 dark:text-purple-400' />
                                <Label className="text-lg font-bold text-gray-900 dark:text-white">Resume</Label>
                            </div>
                            {isResume && user?.profile?.resume ? (
                                <a 
                                    target='_blank' 
                                    rel='noreferrer' 
                                    href={user.profile.resume}
                                    className='flex items-center gap-3 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-xl hover:shadow-md transition-all group'
                                >
                                    <div className='w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center'>
                                        <FileText className='w-6 h-6 text-white' />
                                    </div>
                                    <div className='flex-1'>
                                        <p className='font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400'>
                                            {user.profile.resumeOriginalName || 'Resume.pdf'}
                                        </p>
                                        <p className='text-xs text-gray-500 dark:text-gray-400'>Click to view</p>
                                    </div>
                                    <ExternalLink className='w-5 h-5 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400' />
                                </a>
                            ) : (
                                <p className='text-gray-500 dark:text-gray-400'>No resume uploaded</p>
                            )}
                        </motion.div>
                    </>
                )}

                {/* Recruiter-Specific Sections */}
                {user?.role === 'recruiter' && (
                    <>
                        {/* Companies Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className='glass-card p-6'
                        >
                            <div className='flex items-center justify-between mb-4'>
                                <div className='flex items-center gap-2'>
                                    <Building2 className='w-5 h-5 text-indigo-600 dark:text-indigo-400' />
                                    <h2 className='text-lg font-bold text-gray-900 dark:text-white'>Your Companies</h2>
                                </div>
                                <Badge className='bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 border-0'>
                                    {companies.length} {companies.length === 1 ? 'Company' : 'Companies'}
                                </Badge>
                            </div>
                            <div className='grid gap-3'>
                                {companies.length ? companies.map((c) => (
                                    <div key={c._id} className='p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:shadow-md transition-all group'>
                                        <div className='flex items-center justify-between'>
                                            <div className='flex items-center gap-3'>
                                                <div className='w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center'>
                                                    <Building2 className='w-6 h-6 text-indigo-600 dark:text-indigo-400' />
                                                </div>
                                                <div>
                                                    <h3 className='font-semibold text-gray-900 dark:text-white'>{c.name}</h3>
                                                    <div className='flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400'>
                                                        <MapPin className='w-3 h-3' />
                                                        {c.location}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='flex gap-2'>
                                                <a 
                                                    href={`/admin/companies/${c._id}`} 
                                                    className='px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors text-sm font-medium'
                                                >
                                                    Edit
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <p className='text-gray-500 dark:text-gray-400 text-center py-4'>No companies registered yet.</p>
                                )}
                            </div>
                        </motion.div>

                        {/* Posted Jobs Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className='glass-card p-6'
                        >
                            <div className='flex items-center justify-between mb-4'>
                                <div className='flex items-center gap-2'>
                                    <Briefcase className='w-5 h-5 text-purple-600 dark:text-purple-400' />
                                    <h2 className='text-lg font-bold text-gray-900 dark:text-white'>Posted Jobs</h2>
                                </div>
                                <Badge className='bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-0'>
                                    {postedJobs.length} {postedJobs.length === 1 ? 'Job' : 'Jobs'}
                                </Badge>
                            </div>
                            <div className='grid gap-3'>
                                {postedJobs.length ? postedJobs.map(j => (
                                    <div key={j._id} className='p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:shadow-md transition-all group'>
                                        <div className='flex items-center justify-between'>
                                            <div className='flex items-center gap-3'>
                                                <div className='w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex items-center justify-center'>
                                                    <Briefcase className='w-6 h-6 text-purple-600 dark:text-purple-400' />
                                                </div>
                                                <div>
                                                    <h4 className='font-semibold text-gray-900 dark:text-white'>{j.title}</h4>
                                                    <p className='text-sm text-gray-500 dark:text-gray-400'>
                                                        {j.location} • {j.jobType} • {j.position} positions
                                                    </p>
                                                </div>
                                            </div>
                                            <a 
                                                className='px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors text-sm font-medium' 
                                                href={`/admin/jobs/${j._id}/applicants`}
                                            >
                                                View Applicants
                                            </a>
                                        </div>
                                    </div>
                                )) : (
                                    <p className='text-gray-500 dark:text-gray-400 text-center py-4'>No jobs posted yet.</p>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}

                {/* Applied Jobs Section (Students Only) */}
                {user?.role === 'student' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className='glass-card p-6'
                    >
                        <div className='flex items-center gap-2 mb-6'>
                            <Briefcase className='w-5 h-5 text-indigo-600 dark:text-indigo-400' />
                            <h1 className='text-lg font-bold text-gray-900 dark:text-white'>Applied Jobs</h1>
                        </div>
                        <AppliedJobTable />
                    </motion.div>
                )}
            </div>
            
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile

