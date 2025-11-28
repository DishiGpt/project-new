import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Bookmark, MapPin, Clock, Briefcase, DollarSign, BookmarkCheck } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { formatSalaryToLPA } from '@/lib/utils'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'

const Job = ({job, initialBookmarkState}) => {
    const navigate = useNavigate();
    const { user } = useSelector(store => store.auth);
    
    // Check if job is in user's bookmarked jobs
    const isJobBookmarked = user?.bookmarkedJobs?.some(bookmarkedJobId => 
        bookmarkedJobId === job?._id || bookmarkedJobId?._id === job?._id
    );
    
    const [isBookmarked, setIsBookmarked] = useState(initialBookmarkState !== undefined ? initialBookmarkState : isJobBookmarked || false);

    useEffect(() => {
        // Update bookmark state when user or initialBookmarkState changes
        if (initialBookmarkState !== undefined) {
            setIsBookmarked(initialBookmarkState);
        } else if (user?.bookmarkedJobs) {
            const bookmarked = user.bookmarkedJobs.some(bookmarkedJobId => 
                bookmarkedJobId === job?._id || bookmarkedJobId?._id === job?._id
            );
            setIsBookmarked(bookmarked);
        }
    }, [initialBookmarkState, user, job?._id]);

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }

    const handleBookmark = async () => {
        if (!user) {
            toast.error("Please login to bookmark jobs");
            navigate('/login');
            return;
        }

        try {
            const res = await axios.post(`${USER_API_END_POINT}/bookmark`, 
                { jobId: job?._id },
                { withCredentials: true }
            );
            
            if (res.data.success) {
                setIsBookmarked(res.data.bookmarked);
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to bookmark job");
        }
    }

    const handleSaveForLater = async () => {
        if (!user) {
            toast.error("Please login to save jobs");
            navigate('/login');
            return;
        }

        if (!isBookmarked) {
            await handleBookmark();
        } else {
            toast.info("Job already saved");
        }
    }

    const daysAgo = daysAgoFunction(job?.createdAt);
    
    return (
        <div className='p-5 rounded-md shadow-xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 cursor-pointer transition-colors'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500 dark:text-gray-400'>{daysAgo === 0 ? "Today" : `${daysAgo} days ago`}</p>
                <Button 
                    variant="outline" 
                    className="rounded-full" 
                    size="icon"
                    onClick={handleBookmark}
                >
                    {isBookmarked ? <BookmarkCheck className="text-purple-600 dark:text-purple-400" /> : <Bookmark />}
                </Button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg text-gray-900 dark:text-gray-100'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>India</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2 text-gray-900 dark:text-white'>{job?.title}</h1>
                <p className='text-sm text-gray-600 dark:text-gray-300'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 dark:text-blue-400 font-bold'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] dark:text-orange-400 font-bold'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] dark:text-purple-400 font-bold'} variant="ghost">{formatSalaryToLPA(job?.salary)}</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
                <Button 
                    className="bg-[#7209b7] hover:bg-[#5a0790] dark:bg-purple-600 dark:hover:bg-purple-700 text-white" 
                    onClick={handleSaveForLater}
                >
                    {isBookmarked ? 'Saved ✓' : 'Save For Later'}
                </Button>
            </div>
        </div>
    )
}

export default Job

