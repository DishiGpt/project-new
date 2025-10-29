import React, { useState, useEffect } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'
import axios from 'axios'
import { COMPANY_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'

// const skills = ["Html", "Css", "Javascript", "Reactjs"]
const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [postedJobs, setPostedJobs] = useState([]);
    const {user} = useSelector(store=>store.auth);

    useEffect(() => {
        const fetchRecruiterData = async () => {
            if (!user || user.role !== 'recruiter') return;
            try {
                const [cRes, jRes] = await Promise.all([
                    axios.get(`${COMPANY_API_END_POINT}/get`, { withCredentials: true }),
                    axios.get(`${JOB_API_END_POINT}/getadminjobs`, { withCredentials: true })
                ]);
                if (cRes.data?.success) setCompanies(cRes.data.companies || []);
                if (jRes.data?.success) setPostedJobs(jRes.data.jobs || []);
            } catch (err) {
                console.error('Failed to fetch recruiter data', err);
            }
        }
        fetchRecruiterData();
    }, [user]);

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-24 w-24">
                            <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right" variant="outline"><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                {user?.role === 'student' && (
                    <>
                        <div className='my-5'>
                            <h1>Skills</h1>
                            <div className='flex items-center gap-1'>
                                {
                                    user?.profile?.skills?.length ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
                                }
                            </div>
                        </div>
                        <div className='grid w-full max-w-sm items-center gap-1.5'>
                            <Label className="text-md font-bold">Resume</Label>
                            {
                                isResume ? <a target='blank' rel='noreferrer' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                            }
                        </div>
                    </>
                )}

                {user?.role === 'recruiter' && (
                    <div className='my-5'>
                        <h2 className='font-bold text-lg'>Your Companies</h2>
                        <div className='grid gap-3 mt-3'>
                            {companies.length ? companies.map((c) => (
                                <div key={c._id} className='p-3 border rounded-md flex items-center justify-between'>
                                    <div>
                                        <h3 className='font-medium'>{c.name}</h3>
                                        <p className='text-sm text-gray-500'>{c.location}</p>
                                    </div>
                                    <div className='text-sm text-gray-600 flex gap-2'>
                                        <a href={`/admin/companies/${c._id}`} className='text-blue-600 hover:underline'>Edit</a>
                                        <a href={`/admin/companies/${c._id}`} className='text-gray-500'>View</a>
                                    </div>
                                </div>
                            )) : <p>No companies registered.</p>}
                        </div>

                        <h2 className='font-bold text-lg mt-6'>Posted Jobs</h2>
                        <div className='grid gap-2 mt-3'>
                            {postedJobs.length ? postedJobs.map(j => (
                                <div key={j._id} className='p-3 border rounded-md flex items-center justify-between'>
                                    <div>
                                        <h4 className='font-medium'>{j.title}</h4>
                                        <p className='text-sm text-gray-500'>{j.location} • {j.jobType}</p>
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <span className='text-sm text-gray-600'>{j.position} open</span>
                                        <a className='text-blue-600 hover:underline' href={`/admin/jobs/${j._id}/applicants`}>View Applicants</a>
                                    </div>
                                </div>
                            )) : <p>No jobs posted yet.</p>}
                        </div>
                    </div>
                )}
            </div>
            {user?.role === 'student' && (
                <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                    <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                    {/* Applied Job Table   */}
                    <AppliedJobTable />
                </div>
            )}
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile