import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Bookmark, MapPin, Clock, Briefcase, DollarSign, BookmarkCheck } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { formatSalaryToLPA } from '@/lib/utils'

const Job = ({job}) => {
    const navigate = useNavigate();
    const [isBookmarked, setIsBookmarked] = useState(false);

    // Load bookmarked jobs from localStorage on component mount
    useEffect(() => {
        const savedJobs = JSON.parse(localStorage.getItem('bookmarkedJobs') || '[]');
        const isJobBookmarked = savedJobs.includes(job?._id);
        setIsBookmarked(isJobBookmarked);
    }, [job?._id]);

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference/(1000*24*60*60));
    }

    const handleBookmark = () => {
        const savedJobs = JSON.parse(localStorage.getItem('bookmarkedJobs') || '[]');
        
        if (!isBookmarked) {
            // Add to bookmarks
            savedJobs.push(job?._id);
            localStorage.setItem('bookmarkedJobs', JSON.stringify(savedJobs));
            setIsBookmarked(true);
            console.log('Job bookmarked:', job?._id);
        } else {
            // Remove from bookmarks
            const updatedJobs = savedJobs.filter(id => id !== job?._id);
            localStorage.setItem('bookmarkedJobs', JSON.stringify(updatedJobs));
            setIsBookmarked(false);
            console.log('Job bookmark removed:', job?._id);
        }
    }

    const handleSaveForLater = () => {
        const savedJobs = JSON.parse(localStorage.getItem('bookmarkedJobs') || '[]');
        
        if (!savedJobs.includes(job?._id)) {
            savedJobs.push(job?._id);
            localStorage.setItem('bookmarkedJobs', JSON.stringify(savedJobs));
        }
        
        setIsBookmarked(true);
        console.log('Job saved for later:', job?._id);
    }

    const daysAgo = daysAgoFunction(job?.createdAt);
    
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>{daysAgo === 0 ? "Today" : `${daysAgo} days ago`}</p>
                <Button 
                    variant="outline" 
                    className="rounded-full" 
                    size="icon"
                    onClick={handleBookmark}
                >
                    {isBookmarked ? <BookmarkCheck className="text-purple-600" /> : <Bookmark />}
                </Button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>India</p>
                </div>
            </div>

            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{formatSalaryToLPA(job?.salary)}</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
                <Button 
                    className="bg-[#7209b7] hover:bg-[#5a0790]" 
                    onClick={handleSaveForLater}
                >
                    {isBookmarked ? 'Saved ✓' : 'Save For Later'}
                </Button>
            </div>
        </div>
    )
}

export default Job

