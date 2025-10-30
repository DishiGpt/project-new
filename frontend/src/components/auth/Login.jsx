import React, { useEffect, useState } from 'react'
// Removed Navbar import - now using Layout in App.jsx
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading,user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }
    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])
    return (
        <div className='min-h-screen flex items-center justify-center py-12 px-4 relative overflow-hidden'>
            {/* 🎨 Animated background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            {/* Navbar removed - now rendered by Layout component */}
            <div className='w-full max-w-md'>
                <form onSubmit={submitHandler} className='glass-card p-8 space-y-6'>
                    {/* 🎯 Header */}
                    <div className='text-center space-y-2'>
                        <h1 className='text-3xl font-black text-indigo-600 dark:text-indigo-400'>Welcome Back!</h1>
                        <p className='text-muted-foreground'>Login to continue your job search</p>
                    </div>
                    {/* 📧 Email field */}
                    <div className='space-y-2'>
                        <Label className='text-sm font-semibold'>Email Address</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="you@example.com"
                            className='h-12 rounded-xl'
                        />
                    </div>

                    {/* 🔒 Password field */}
                    <div className='space-y-2'>
                        <Label className='text-sm font-semibold'>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Enter your password"
                            className='h-12 rounded-xl'
                        />
                    </div>

                    {/* 👤 Role selection */}
                    <div className='space-y-3'>
                        <Label className='text-sm font-semibold'>I am a</Label>
                        <RadioGroup className="flex gap-4">
                            <div className="flex items-center space-x-2 flex-1">
                                <Input
                                    type="radio"
                                    name="role"
                                    id="student"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer w-4 h-4"
                                />
                                <Label htmlFor="student" className='cursor-pointer font-medium'>Job Seeker</Label>
                            </div>
                            <div className="flex items-center space-x-2 flex-1">
                                <Input
                                    type="radio"
                                    name="role"
                                    id="recruiter"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer w-4 h-4"
                                />
                                <Label htmlFor="recruiter" className='cursor-pointer font-medium'>Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* 🚀 Submit button */}
                    {
                        loading ? (
                            <Button className="w-full h-12 btn-gradient" disabled> 
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> 
                                Logging in...
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full h-12 btn-gradient">
                                Login
                            </Button>
                        )
                    }

                    {/* 📝 Signup link */}
                    <p className='text-center text-sm text-muted-foreground'>
                        Don't have an account?{' '}
                        <Link to="/signup" className='font-semibold text-primary hover:underline'>
                            Create Account
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login

