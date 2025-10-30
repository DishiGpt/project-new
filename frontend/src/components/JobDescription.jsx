import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { formatSalaryToLPA } from '@/lib/utils';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { 
    Briefcase, 
    MapPin, 
    DollarSign, 
    Clock, 
    Users, 
    Calendar,
    CheckCircle2,
    ArrowLeft,
    Building2,
    Target,
    Loader2
} from 'lucide-react';

const JobDescription = () => {
    const {singleJob} = useSelector(store => store.job);
    const {user} = useSelector(store=>store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);
    const [isLoading, setIsLoading] = useState(true);
    const [isApplying, setIsApplying] = useState(false);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const applyJobHandler = async () => {
        setIsApplying(true);
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
            
            if(res.data.success){
                setIsApplied(true); // Update the local state
                const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setIsApplying(false);
        }
    }

    useEffect(()=>{
        const fetchSingleJob = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
                toast.error('Failed to load job details');
            } finally {
                setIsLoading(false);
            }
        }
        fetchSingleJob(); 
    },[jobId,dispatch, user?._id]);

    if (isLoading) {
        return (
            <div className='min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50/30 to-purple-50/30 dark:from-gray-900 dark:via-indigo-950/20 dark:to-purple-950/20 flex items-center justify-center'>
                <div className='glass-card p-8 flex flex-col items-center gap-4'>
                    <Loader2 className='w-12 h-12 animate-spin text-indigo-600 dark:text-indigo-400' />
                    <p className='text-gray-600 dark:text-gray-400 font-medium'>Loading job details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50/30 to-purple-50/30 dark:from-gray-900 dark:via-indigo-950/20 dark:to-purple-950/20'>
            <div className='max-w-5xl mx-auto py-8 px-4'>
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate(-1)}
                    className='mb-6 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium'
                >
                    <ArrowLeft className='w-4 h-4' />
                    Back to Jobs
                </motion.button>

                {/* Main Content Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className='glass-card p-8'
                >
                    {/* Header Section */}
                    <div className='flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8'>
                        <div className='flex-1'>
                            {/* Company Badge */}
                            <div className='inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-full mb-4'>
                                <Building2 className='w-4 h-4 text-indigo-600 dark:text-indigo-400' />
                                <span className='text-sm font-medium text-indigo-700 dark:text-indigo-300'>
                                    {singleJob?.company?.name || 'Company Name'}
                                </span>
                            </div>

                            {/* Job Title */}
                            <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-4'>
                                {singleJob?.title}
                            </h1>

                            {/* Key Info Badges */}
                            <div className='flex flex-wrap items-center gap-2'>
                                <Badge className='bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 border-0 hover:bg-indigo-200 dark:hover:bg-indigo-900/50'>
                                    <Users className='w-3 h-3 mr-1' />
                                    {singleJob?.position} Positions
                                </Badge>
                                <Badge className='bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300 border-0 hover:bg-teal-200 dark:hover:bg-teal-900/50'>
                                    <Clock className='w-3 h-3 mr-1' />
                                    {singleJob?.jobType}
                                </Badge>
                                <Badge className='bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-0 hover:bg-purple-200 dark:hover:bg-purple-900/50'>
                                    <DollarSign className='w-3 h-3 mr-1' />
                                    {formatSalaryToLPA(singleJob?.salary)}
                                </Badge>
                            </div>
                        </div>

                        {/* Apply Button */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className='flex-shrink-0'
                        >
                            {isApplied ? (
                                <div className='glass-card px-6 py-3 flex items-center gap-2 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'>
                                    <CheckCircle2 className='w-5 h-5 text-green-600 dark:text-green-400' />
                                    <span className='font-semibold text-green-700 dark:text-green-300'>Already Applied</span>
                                </div>
                            ) : (
                                <Button
                                    onClick={applyJobHandler}
                                    disabled={isApplying}
                                    className='btn-gradient px-8 py-6 text-base flex items-center gap-2'
                                >
                                    {isApplying ? (
                                        <>
                                            <Loader2 className='w-5 h-5 animate-spin' />
                                            Applying...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle2 className='w-5 h-5' />
                                            Apply Now
                                        </>
                                    )}
                                </Button>
                            )}
                        </motion.div>
                    </div>

                    {/* Divider */}
                    <div className='h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent mb-8' />

                    {/* Quick Stats Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'
                    >
                        <div className='stats-card text-center'>
                            <MapPin className='w-6 h-6 text-indigo-600 dark:text-indigo-400 mx-auto mb-2' />
                            <p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>Location</p>
                            <p className='font-semibold text-gray-900 dark:text-white'>{singleJob?.location}</p>
                        </div>
                        <div className='stats-card text-center'>
                            <Target className='w-6 h-6 text-purple-600 dark:text-purple-400 mx-auto mb-2' />
                            <p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>Experience</p>
                            <p className='font-semibold text-gray-900 dark:text-white'>{singleJob?.experienceLevel} yrs</p>
                        </div>
                        <div className='stats-card text-center'>
                            <Users className='w-6 h-6 text-pink-600 dark:text-pink-400 mx-auto mb-2' />
                            <p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>Applicants</p>
                            <p className='font-semibold text-gray-900 dark:text-white'>{singleJob?.applications?.length}</p>
                        </div>
                        <div className='stats-card text-center'>
                            <Calendar className='w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2' />
                            <p className='text-sm text-gray-600 dark:text-gray-400 mb-1'>Posted</p>
                            <p className='font-semibold text-gray-900 dark:text-white'>{singleJob?.createdAt?.split("T")[0]}</p>
                        </div>
                    </motion.div>

                    {/* Job Description Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className='space-y-6'
                    >
                        <div>
                            <h2 className='text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2'>
                                <Briefcase className='w-5 h-5 text-indigo-600 dark:text-indigo-400' />
                                Job Description
                            </h2>
                            <div className='bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 space-y-4'>
                                <div className='flex items-start gap-3'>
                                    <div className='w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 mt-2 flex-shrink-0' />
                                    <div className='flex-1'>
                                        <span className='font-semibold text-gray-900 dark:text-white'>Role: </span>
                                        <span className='text-gray-700 dark:text-gray-300'>{singleJob?.title}</span>
                                    </div>
                                </div>
                                <div className='flex items-start gap-3'>
                                    <div className='w-2 h-2 rounded-full bg-purple-600 dark:bg-purple-400 mt-2 flex-shrink-0' />
                                    <div className='flex-1'>
                                        <span className='font-semibold text-gray-900 dark:text-white'>Description: </span>
                                        <span className='text-gray-700 dark:text-gray-300'>{singleJob?.description}</span>
                                    </div>
                                </div>
                                <div className='flex items-start gap-3'>
                                    <div className='w-2 h-2 rounded-full bg-pink-600 dark:bg-pink-400 mt-2 flex-shrink-0' />
                                    <div className='flex-1'>
                                        <span className='font-semibold text-gray-900 dark:text-white'>Requirements: </span>
                                        <span className='text-gray-700 dark:text-gray-300'>
                                            {singleJob?.experienceLevel} years of experience required
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

export default JobDescription

