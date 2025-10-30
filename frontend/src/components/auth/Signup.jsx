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
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'

const Signup = () => {

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const {loading,user} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();    //formdata object
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': "multipart/form-data" },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally{
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
                <form onSubmit={submitHandler} className='glass-card p-8 space-y-5'>
                    {/* 🎯 Header */}
                    <div className='text-center space-y-2'>
                        <h1 className='text-3xl font-black text-indigo-600 dark:text-indigo-400'>Create Account</h1>
                        <p className='text-muted-foreground'>Join thousands of job seekers today</p>
                    </div>

                    {/* 👤 Full Name */}
                    <div className='space-y-2'>
                        <Label className='text-sm font-semibold'>Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="John Doe"
                            className='h-11 rounded-xl'
                        />
                    </div>

                    {/* 📧 Email */}
                    <div className='space-y-2'>
                        <Label className='text-sm font-semibold'>Email Address</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="you@example.com"
                            className='h-11 rounded-xl'
                        />
                    </div>

                    {/* 📱 Phone Number */}
                    <div className='space-y-2'>
                        <Label className='text-sm font-semibold'>Phone Number</Label>
                        <Input
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="+1 (555) 000-0000"
                            className='h-11 rounded-xl'
                        />
                    </div>

                    {/* 🔒 Password */}
                    <div className='space-y-2'>
                        <Label className='text-sm font-semibold'>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Create a strong password"
                            className='h-11 rounded-xl'
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
                                    id="student-signup"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer w-4 h-4"
                                />
                                <Label htmlFor="student-signup" className='cursor-pointer font-medium'>Job Seeker</Label>
                            </div>
                            <div className="flex items-center space-x-2 flex-1">
                                <Input
                                    type="radio"
                                    name="role"
                                    id="recruiter-signup"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer w-4 h-4"
                                />
                                <Label htmlFor="recruiter-signup" className='cursor-pointer font-medium'>Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* 📷 Profile photo */}
                    <div className='space-y-2'>
                        <Label className='text-sm font-semibold'>Profile Photo (Optional)</Label>
                        <Input
                            accept="image/*"
                            type="file"
                            onChange={changeFileHandler}
                            className="cursor-pointer h-11 rounded-xl"
                        />
                    </div>

                    {/* 🚀 Submit button */}
                    {
                        loading ? (
                            <Button className="w-full h-12 btn-gradient" disabled> 
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> 
                                Creating account...
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full h-12 btn-gradient">
                                Create Account
                            </Button>
                        )
                    }

                    {/* 📝 Login link */}
                    <p className='text-center text-sm text-muted-foreground'>
                        Already have an account?{' '}
                        <Link to="/login" className='font-semibold text-primary hover:underline'>
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Signup

