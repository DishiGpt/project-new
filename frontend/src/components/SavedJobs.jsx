import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Job from './Job'
import { motion } from 'framer-motion'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

const SavedJobs = () => {
    const { user } = useSelector(store => store.auth);
    const [savedJobs, setSavedJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [authChecking, setAuthChecking] = useState(true);
    const navigate = useNavigate();

    // Wait for auth to be checked
    useEffect(() => {
        const timer = setTimeout(() => {
            setAuthChecking(false);
        }, 600); // Give time for App.jsx to restore auth

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (authChecking) {
            return; // Wait for auth check to complete
        }

        if (!user) {
            // User is definitely not logged in after auth check
            navigate('/login');
            return;
        }

        const fetchBookmarkedJobs = async () => {
            try {
                const res = await axios.get(`${USER_API_END_POINT}/bookmarks`, {
                    withCredentials: true
                });
                
                if (res.data.success) {
                    setSavedJobs(res.data.bookmarkedJobs);
                }
            } catch (error) {
                console.log(error);
                if (error.response?.status === 401) {
                    navigate('/login');
                } else {
                    toast.error(error.response?.data?.message || "Failed to fetch bookmarked jobs");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchBookmarkedJobs();
    }, [user, authChecking, navigate]);

    if (authChecking || loading) {
        return (
            <div className='flex items-center justify-center min-h-screen bg-white dark:bg-slate-900'>
                <div className='text-center'>
                    <div className='text-4xl mb-4'>⏳</div>
                    <p className='text-gray-600 dark:text-gray-400'>
                        {authChecking ? 'Checking authentication...' : 'Loading your saved jobs...'}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className='bg-white dark:bg-slate-900 min-h-screen transition-colors'>
            <div className='max-w-7xl mx-auto my-10 px-4'>
                <h1 className='font-bold text-3xl mb-8 text-gray-900 dark:text-white'>
                    Saved Jobs 
                    <span className='text-[#7209b7] dark:text-purple-400 ml-2'>({savedJobs.length})</span>
                </h1>
                
                {savedJobs.length === 0 ? (
                    <div className='text-center py-20'>
                        <div className='text-6xl mb-4'>🔖</div>
                        <h2 className='text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2'>No saved jobs yet</h2>
                        <p className='text-gray-500 dark:text-gray-400'>Jobs you bookmark will appear here</p>
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
                                <Job job={job} initialBookmarkState={true} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SavedJobs
