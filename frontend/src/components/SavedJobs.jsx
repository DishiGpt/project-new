import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Job from './Job'
import { motion } from 'framer-motion'
import useGetAllJobs from '@/hooks/useGetAllJobs'

const SavedJobs = () => {
    useGetAllJobs(); // Fetch all jobs when component mounts
    const { allJobs } = useSelector(store => store.job);
    const [savedJobs, setSavedJobs] = useState([]);

    useEffect(() => {
        // Get bookmarked job IDs from localStorage
        const bookmarkedIds = JSON.parse(localStorage.getItem('bookmarkedJobs') || '[]');
        
        // Filter jobs to get only bookmarked ones
        const filteredSavedJobs = allJobs.filter(job => bookmarkedIds.includes(job._id));
        setSavedJobs(filteredSavedJobs);
    }, [allJobs]);

    return (
        <div>
            <div className='max-w-7xl mx-auto my-10 px-4'>
                <h1 className='font-bold text-3xl mb-8'>
                    Saved Jobs 
                    <span className='text-[#7209b7] ml-2'>({savedJobs.length})</span>
                </h1>
                
                {savedJobs.length === 0 ? (
                    <div className='text-center py-20'>
                        <div className='text-6xl mb-4'>🔖</div>
                        <h2 className='text-2xl font-semibold text-gray-700 mb-2'>No saved jobs yet</h2>
                        <p className='text-gray-500'>Jobs you bookmark will appear here</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-3 gap-4'>
                        {savedJobs.map((job) => (
                            <motion.div
                                key={job._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
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

export default SavedJobs
