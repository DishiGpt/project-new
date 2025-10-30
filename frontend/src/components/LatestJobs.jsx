import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux'; 
import { Sparkles } from 'lucide-react';

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
    const {allJobs} = useSelector(store=>store.job);
   
    return (
        <div className='max-w-7xl mx-auto my-20 px-4'>
            {/* 🎯 Modern section header */}
            <div className='text-center mb-12 space-y-4'>
                <div className='flex items-center justify-center gap-2 mb-4'>
                    <Sparkles className='w-6 h-6 text-indigo-600 dark:text-indigo-400' />
                    <span className='text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide'>
                        Hot Jobs
                    </span>
                </div>
                <h2 className='text-4xl md:text-5xl font-black text-slate-900 dark:text-white'>
                    <span className='text-indigo-600 dark:text-indigo-400'>Latest & Top</span> Job Openings
                </h2>
                <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
                    Discover exciting opportunities from top companies. Updated daily to bring you the freshest jobs.
                </p>
            </div>

            {/* 🎴 Jobs grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    allJobs.length <= 0 ? (
                        <div className='col-span-full text-center py-20'>
                            <div className='max-w-md mx-auto space-y-4'>
                                <div className='w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 flex items-center justify-center'>
                                    <Sparkles className='w-10 h-10 text-indigo-600 dark:text-indigo-400' />
                                </div>
                                <h3 className='text-xl font-bold'>No Jobs Available</h3>
                                <p className='text-muted-foreground'>Check back soon for new opportunities!</p>
                            </div>
                        </div>
                    ) : (
                        allJobs?.slice(0,6).map((job) => <LatestJobCards key={job._id} job={job}/>)
                    )
                }
            </div>
        </div>
    )
}

export default LatestJobs

