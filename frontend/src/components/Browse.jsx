import React, { useEffect } from 'react'
// Removed Navbar import - now using Layout in App.jsx
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { motion } from 'framer-motion';
import { Search, Briefcase, TrendingUp } from 'lucide-react';

const Browse = () => {
    useGetAllJobs();
    const {allJobs} = useSelector(store=>store.job);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        return ()=>{
            dispatch(setSearchedQuery(""));
        }
    },[dispatch])
    
    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50/30 to-purple-50/30 dark:from-gray-900 dark:via-indigo-950/20 dark:to-purple-950/20'>
            {/* Navbar removed - now rendered by Layout component */}
            
            <div className='max-w-7xl mx-auto py-10 px-4'>
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='mb-10'
                >
                    <div className='flex items-center gap-3 mb-3'>
                        <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center'>
                            <Search className='w-6 h-6 text-indigo-600 dark:text-indigo-400' />
                        </div>
                        <div>
                            <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
                                Browse All Jobs
                            </h1>
                            <p className='text-gray-600 dark:text-gray-400 mt-1'>
                                Discover <span className='font-semibold text-indigo-600 dark:text-indigo-400'>{allJobs.length}</span> opportunities across different industries
                            </p>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className='stats-card flex items-center gap-4'
                        >
                            <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center'>
                                <Briefcase className='w-6 h-6 text-blue-600 dark:text-blue-400' />
                            </div>
                            <div>
                                <p className='text-2xl font-bold text-gray-900 dark:text-white'>{allJobs.length}</p>
                                <p className='text-sm text-gray-600 dark:text-gray-400'>Total Jobs</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className='stats-card flex items-center gap-4'
                        >
                            <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center'>
                                <TrendingUp className='w-6 h-6 text-purple-600 dark:text-purple-400' />
                            </div>
                            <div>
                                <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                                    {new Set(allJobs.map(job => job.company?.name)).size}
                                </p>
                                <p className='text-sm text-gray-600 dark:text-gray-400'>Companies</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className='stats-card flex items-center gap-4'
                        >
                            <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-pink-600/20 flex items-center justify-center'>
                                <Search className='w-6 h-6 text-pink-600 dark:text-pink-400' />
                            </div>
                            <div>
                                <p className='text-2xl font-bold text-gray-900 dark:text-white'>
                                    {new Set(allJobs.map(job => job.location)).size}
                                </p>
                                <p className='text-sm text-gray-600 dark:text-gray-400'>Locations</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Jobs Grid */}
                {allJobs.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className='glass-card h-96 flex flex-col items-center justify-center text-center'
                    >
                        <div className='w-24 h-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center mb-6'>
                            <Search className='w-12 h-12 text-gray-400 dark:text-gray-500' />
                        </div>
                        <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>No Jobs Available</h3>
                        <p className='text-gray-600 dark:text-gray-400'>Check back later for new opportunities!</p>
                    </motion.div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {allJobs.map((job, index) => (
                            <motion.div
                                key={job._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ 
                                    duration: 0.3,
                                    delay: index * 0.05 
                                }}
                            >
                                <Job job={job} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Browse

