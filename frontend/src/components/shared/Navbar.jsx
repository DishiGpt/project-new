import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <header className='sticky top-0 z-50 w-full backdrop-blur-lg bg-white/90 dark:bg-slate-900/90 shadow-md border-b border-slate-200 dark:border-slate-700/50 transition-all duration-300'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4'>
                <div className='flex items-center gap-4'>
                    <Link to='/' className='flex items-center gap-3 group'>
                        <div className='relative w-11 h-11 rounded-xl gradient-ignite flex items-center justify-center text-white font-black shadow-lg group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-indigo-500/30 transition-all duration-300'>
                            <span className='text-xl'>🔥</span>
                        </div>
                        <div className='flex flex-col'>
                            <h1 className='text-xl md:text-2xl font-black'>
                                <span className='bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 bg-clip-text text-transparent'>IgniteX</span>
                            </h1>
                            <p className='text-[10px] md:text-xs text-slate-600 dark:text-slate-400 font-semibold tracking-wide'>
                                Where Ambition Sparks Opportunity
                            </p>
                        </div>
                    </Link>
                </div>
                <div className='flex items-center gap-6'>
                    <ul className='hidden md:flex font-medium items-center gap-6'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies" className='hover:text-primary transition-colors'>Companies</Link></li>
                                    <li><Link to="/admin/jobs" className='hover:text-primary transition-colors'>Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/" className='hover:text-primary transition-colors'>Home</Link></li>
                                    <li><Link to="/jobs" className='hover:text-primary transition-colors'>Jobs</Link></li>
                                    <li><Link to="/browse" className='hover:text-primary transition-colors'>Browse</Link></li>
                                    <li><Link to="/saved-jobs" className='hover:text-primary transition-colors'>Saved Jobs</Link></li>
                                </>
                            )
                        }
                        {/* Quick access to profile for all users */}
                        <li><Link to="/profile" className='hover:text-primary transition-colors'>Profile</Link></li>


                    </ul>
                    <div className='flex items-center gap-3'>
                        <ThemeToggle />
                        {
                            !user ? (
                                <div className='flex items-center gap-2'>
                                    <Link to="/login">
                                        <Button variant="outline" className="hover:bg-muted hover:border-primary transition-colors rounded-full">
                                            Login
                                        </Button>
                                    </Link>
                                    <Link to="/signup">
                                        <Button className="btn-gradient rounded-full">
                                            Get Started
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Avatar className="cursor-pointer ring-2 ring-transparent hover:ring-primary transition-all">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80 p-4">
                                        <div className='space-y-4'>
                                            <div className='flex gap-3 items-start'>
                                                <Avatar className="w-12 h-12">
                                                    <AvatarImage src={user?.profile?.profilePhoto} alt={user?.fullname} />
                                                </Avatar>
                                                <div className='flex-1'>
                                                    <h4 className='font-semibold text-base'>{user?.fullname}</h4>
                                                    <p className='text-sm text-muted-foreground line-clamp-2'>{user?.profile?.bio}</p>
                                                </div>
                                            </div>
                                            <div className='flex flex-col gap-1 border-t pt-2'>
                                                {
                                                    user && (
                                                        <Link to="/profile" className='flex items-center gap-2 px-2 py-2 rounded-md hover:bg-muted transition-colors'>
                                                            <User2 className="w-4 h-4" />
                                                            <span className="text-sm font-medium">View Profile</span>
                                                        </Link>
                                                    )
                                                }

                                                <button 
                                                    onClick={logoutHandler}
                                                    className='flex items-center gap-2 px-2 py-2 rounded-md hover:bg-muted transition-colors text-left w-full'
                                                >
                                                    <LogOut className="w-4 h-4" />
                                                    <span className="text-sm font-medium">Logout</span>
                                                </button>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )
                        }
                    </div>

                </div>
            </div>

        </header>
    )
}

export default Navbar

