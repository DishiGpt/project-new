import React, { useEffect, useState } from 'react'
// Removed Navbar import - now using Layout in App.jsx
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Search, X, Loader2 } from 'lucide-react';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';

const Jobs = () => {
    useGetAllJobs();
    const {allJobs, searchedQuery} = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const [filterJobs, setFilterJobs] = useState([]);
    const [bookmarkedJobIds, setBookmarkedJobIds] = useState([]);

    // Fetch user's bookmarked jobs
    useEffect(() => {
        const fetchBookmarks = async () => {
            if (user) {
                try {
                    const res = await axios.get(`${USER_API_END_POINT}/bookmarks`, {
                        withCredentials: true
                    });
                    if (res.data.success) {
                        const ids = res.data.bookmarkedJobs.map(job => job._id);
                        setBookmarkedJobIds(ids);
                    }
                } catch (error) {
                    console.log("Error fetching bookmarks:", error);
                }
            }
        };
        fetchBookmarks();
    }, [user]);

    useEffect(() => {
        console.log('Jobs component - allJobs:', allJobs?.length);
        console.log('Jobs component - searchedQuery:', searchedQuery);
        
        // Check if searchedQuery is a string (from search bar) or object (from filters)
        if (searchedQuery) {
            // Handle object-based filters
            if (typeof searchedQuery === 'object') {
                const { location, industry, salary } = searchedQuery;
                
                const filteredJobs = allJobs.filter((job) => {
                    // Location filter
                    const matchesLocation = !location || 
                        job.location.toLowerCase().includes(location.toLowerCase());
                    
                    // Industry filter (matches against job title)
                    const matchesIndustry = !industry || 
                        job.title.toLowerCase().includes(industry.toLowerCase());
                    
                    // Salary filter - parse salary ranges and match
                    let matchesSalary = !salary;
                    if (salary && job.salary) {
                        const jobSalary = Number(job.salary);
                        if (salary === "0-40k") {
                            matchesSalary = jobSalary >= 0 && jobSalary <= 40000;
                        } else if (salary === "42-1lakh") {
                            matchesSalary = jobSalary >= 42000 && jobSalary <= 100000;
                        } else if (salary === "1lakh to 5lakh") {
                            matchesSalary = jobSalary >= 100000 && jobSalary <= 500000;
                        }
                    }
                    
                    return matchesLocation && matchesIndustry && matchesSalary;
                });
                
                console.log('Filtered jobs (multi-filter):', filteredJobs.length, {location, industry, salary});
                setFilterJobs(filteredJobs);
            } 
            // Handle string-based search (from search bar)
            else if (typeof searchedQuery === 'string') {
                const filteredJobs = allJobs.filter((job) => {
                    return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                        job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                        job.location.toLowerCase().includes(searchedQuery.toLowerCase())
                });
                console.log('Filtered jobs (search):', filteredJobs.length);
                setFilterJobs(filteredJobs);
            }
        } else {
            console.log('No filter - showing all jobs:', allJobs?.length);
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    console.log('RENDER - filterJobs:', filterJobs?.length, 'allJobs:', allJobs?.length);

    return (
        <div className='bg-white dark:bg-slate-900 min-h-screen transition-colors'>
            <div className='max-w-7xl mx-auto mt-5 px-4'>
                <div className='flex flex-col lg:flex-row gap-5'>
                    {/* Filter Sidebar */}
                    <div className='w-full lg:w-64 flex-shrink-0'>
                        <FilterCard />
                    </div>
                    
                    {/* Jobs Grid */}
                    {
                        filterJobs.length <= 0 ? (
                            <div className='flex-1 flex items-center justify-center min-h-[70vh]'>
                                <div className='text-center py-20'>
                                    <div className='text-6xl mb-4'>🔍</div>
                                    <h2 className='text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2'>No jobs found</h2>
                                    <p className='text-gray-500 dark:text-gray-400'>Try adjusting your filters or check back later</p>
                                </div>
                            </div>
                        ) : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5 px-2'>
                                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.3 }}
                                                key={job?._id}>
                                                <Job job={job} initialBookmarkState={bookmarkedJobIds.includes(job?._id)} />
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

