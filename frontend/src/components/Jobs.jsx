import React, { useEffect, useState } from 'react'
// Removed Navbar import - now using Layout in App.jsx
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Search, X, Loader2 } from 'lucide-react';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Jobs = () => {
    useGetAllJobs();
    const {allJobs, searchedQuery} = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState([]);

    useEffect(() => {
        console.log('Jobs component - allJobs:', allJobs?.length);
        console.log('Jobs component - searchedQuery:', searchedQuery);
        
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            })
            console.log('Filtered jobs:', filteredJobs.length);
            setFilterJobs(filteredJobs)
        } else {
            console.log('No filter - showing all jobs:', allJobs?.length);
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery]);

    console.log('RENDER - filterJobs:', filterJobs?.length, 'allJobs:', allJobs?.length);

    return (
        <div>
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-20%'>
                        <FilterCard />
                    </div>
                    {
                        filterJobs.length <= 0 ? (
                            <span>Job not found (filterJobs: {filterJobs.length}, allJobs: {allJobs?.length})</span>
                        ) : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                key={job?._id}>
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Jobs

