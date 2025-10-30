import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search, TrendingUp, Briefcase, Users } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='relative overflow-hidden'>
            {/* Animated gradient background */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20"></div>
            
            {/* Glowing orbs */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-20 -left-10 w-96 h-96 bg-purple-400 dark:bg-purple-600 rounded-full filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-40 right-10 w-80 h-80 bg-yellow-400 dark:bg-yellow-600 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-400 dark:bg-pink-600 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <div className='text-center py-24 px-4'>
                <div className='flex flex-col gap-8 max-w-6xl mx-auto'>
                    {/* 🔥 IgniteX Badge */}
                    <div className='flex justify-center animate-fadeIn'>
                        <span className='inline-flex items-center gap-2 px-6 py-2.5 rounded-full glass-card border border-indigo-200/50 dark:border-teal-500/50 shadow-lg'>
                            <span className='text-2xl'>🔥</span>
                            <TrendingUp className='w-4 h-4 text-indigo-600 dark:text-teal-400' />
                            <span className='text-sm font-bold text-indigo-600 dark:text-teal-400'>Where Ambition Sparks Opportunity</span>
                        </span>
                    </div>

                    {/* 🎯 Main headline with IgniteX branding */}
                    <div className='space-y-6 animate-slideUp'>
                        <h1 className='text-5xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight text-slate-900 dark:text-white'>
                            Ignite Your Career <br className='hidden md:block' />
                            with{' '}
                            <span className='bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 bg-clip-text text-transparent relative inline-block'>
                                IgniteX
                            </span>
                        </h1>
                        <p className='text-lg md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto font-medium'>
                            Where ambition meets opportunity. Discover thousands of jobs from innovative companies. 
                            <span className='text-indigo-600 dark:text-purple-400 font-bold'> Your next breakthrough starts here.</span>
                        </p>
                    </div>

                    {/* 🔍 Minimalist Search Bar with Glowing Border */}
                    <div className='flex justify-center animate-slideUp animation-delay-200'>
                        <div className='group flex w-full max-w-3xl glass-card p-3 items-center gap-4 shadow-lg border-2 border-slate-200/50 dark:border-slate-700/50 hover:border-indigo-400/50 dark:hover:border-purple-500/50 focus-within:border-indigo-500 dark:focus-within:border-purple-500 focus-within:shadow-xl focus-within:shadow-indigo-500/20 dark:focus-within:shadow-purple-500/20 transition-all duration-300 ease-in-out'>
                            <div className='flex-1 flex items-center gap-4 px-4'>
                                <Search className='h-5 w-5 text-slate-400 dark:text-slate-500 group-focus-within:text-indigo-500 dark:group-focus-within:text-purple-400 transition-colors' />
                                <input
                                    type="text"
                                    placeholder='Search by job title, skills, or company...'
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && searchJobHandler()}
                                    className='outline-none border-none w-full bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-base font-medium'
                                />
                            </div>
                            <Button 
                                onClick={searchJobHandler} 
                                className="btn-gradient shrink-0 px-7 py-5 text-base font-bold shadow-lg"
                            >
                                <Search className='h-5 w-5 mr-2' />
                                Search Jobs
                            </Button>
                        </div>
                    </div>

                    {/* 📊 IgniteX Stats cards with gradient glow */}
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto'>
                        <div className='stats-card group hover:scale-[1.08] transition-all duration-300 cursor-pointer border border-indigo-200/30 dark:border-indigo-500/30 hover:border-indigo-400/50 dark:hover:border-indigo-400/50 shadow-xl'>
                            <div className='flex items-center gap-4'>
                                <div className='p-4 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-indigo-600/30 group-hover:from-indigo-500/40 group-hover:to-indigo-600/50 transition-all shadow-lg'>
                                    <Briefcase className='w-7 h-7 text-indigo-600 dark:text-indigo-400' />
                                </div>
                                <div className='text-left'>
                                    <h3 className='text-3xl font-black text-indigo-600 dark:text-indigo-400'>10,000+</h3>
                                    <p className='text-sm font-semibold text-slate-600 dark:text-slate-400'>Active Jobs</p>
                                </div>
                            </div>
                        </div>

                        <div className='stats-card group hover:scale-[1.08] transition-all duration-300 cursor-pointer border border-purple-200/30 dark:border-purple-500/30 hover:border-purple-400/50 dark:hover:border-purple-400/50 shadow-xl'>
                            <div className='flex items-center gap-4'>
                                <div className='p-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/30 group-hover:from-purple-500/40 group-hover:to-purple-600/50 transition-all shadow-lg'>
                                    <Users className='w-7 h-7 text-purple-600 dark:text-purple-400' />
                                </div>
                                <div className='text-left'>
                                    <h3 className='text-3xl font-black text-purple-600 dark:text-purple-400'>50,000+</h3>
                                    <p className='text-sm font-semibold text-slate-600 dark:text-slate-400'>Happy Users</p>
                                </div>
                            </div>
                        </div>

                        <div className='stats-card group hover:scale-[1.08] transition-all duration-300 cursor-pointer border border-teal-200/30 dark:border-teal-500/30 hover:border-teal-400/50 dark:hover:border-teal-400/50 shadow-xl'>
                            <div className='flex items-center gap-4'>
                                <div className='p-4 rounded-2xl bg-gradient-to-br from-teal-500/20 to-teal-600/30 group-hover:from-teal-500/40 group-hover:to-teal-600/50 transition-all shadow-lg'>
                                    <TrendingUp className='w-7 h-7 text-teal-600 dark:text-teal-400' />
                                </div>
                                <div className='text-left'>
                                    <h3 className='text-3xl font-black text-teal-600 dark:text-teal-400'>1,000+</h3>
                                    <p className='text-sm font-semibold text-slate-600 dark:text-slate-400'>Companies</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CSS for animations */}
            <style jsx>{`
                @keyframes blob {
                    0%, 100% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                .animate-fadeIn {
                    animation: fadeIn 0.6s ease-out;
                }
                .animate-slideUp {
                    animation: slideUp 0.8s ease-out;
                }
                .animation-delay-200 {
                    animation-delay: 0.2s;
                    animation-fill-mode: both;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    )
}

export default HeroSection

