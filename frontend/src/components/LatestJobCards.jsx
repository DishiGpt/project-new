import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { formatSalaryToLPA } from '@/lib/utils'
import { MapPin, Briefcase, TrendingUp, Sparkles } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    return (
        <div 
            onClick={()=> navigate(`/description/${job._id}`)} 
            className='job-card p-6 cursor-pointer group relative overflow-hidden border border-indigo-200/30 dark:border-teal-500/20 hover:border-indigo-400/50 dark:hover:border-teal-400/50 transition-all duration-300 shadow-lg hover:shadow-2xl'
        >
            {/* 🔥 "New" badge with IgniteX gradient */}
            <div className='absolute top-4 right-4'>
                <div className='flex items-center gap-1 px-3 py-1.5 rounded-full gradient-ignite text-white text-xs font-bold shadow-lg pulse-glow'>
                    <Sparkles className='w-3 h-3' />
                    New
                </div>
            </div>

            {/* 🏢 Company header with logo */}
            <div className='flex items-center gap-3 mb-4'>
                <div className='p-2 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 border border-indigo-100 dark:border-indigo-900'>
                    <Avatar className='w-10 h-10'>
                        <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
                    </Avatar>
                </div>
                <div>
                    <h2 className='font-bold text-base group-hover:text-primary transition-colors'>{job?.company?.name}</h2>
                    <div className='flex items-center gap-1 text-muted-foreground text-sm'>
                        <MapPin className='w-3 h-3' />
                        <span>{job?.location || 'India'}</span>
                    </div>
                </div>
            </div>

            {/* 📝 Job title and description */}
            <div className='mb-4'>
                <h3 className='font-bold text-lg mb-2 text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-all'>{job?.title}</h3>
                <p className='text-sm text-muted-foreground line-clamp-2'>{job?.description}</p>
            </div>

            {/* 🏷️ IgniteX badges with vibrant colors */}
            <div className='flex flex-wrap gap-2'>
                <div className='badge-modern bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-700 shadow-sm'>
                    <Briefcase className='w-3 h-3 inline mr-1' />
                    {job?.position} Positions
                </div>
                <div className='badge-modern bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 border border-teal-300 dark:border-teal-700 shadow-sm'>
                    {job?.jobType}
                </div>
                <div className='badge-modern bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-700 shadow-sm'>
                    <TrendingUp className='w-3 h-3 inline mr-1' />
                    {formatSalaryToLPA(job?.salary)}
                </div>
            </div>

            {/* 🔥 IgniteX glow hover effect */}
            <div className='absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-purple-500/0 to-teal-500/0 group-hover:from-indigo-500/10 group-hover:via-purple-500/10 group-hover:to-teal-500/10 transition-all duration-300 pointer-events-none rounded-2xl' />
        </div>
    )
}

export default LatestJobCards

