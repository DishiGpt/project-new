import { setAllJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllJobs = () => {
    const dispatch = useDispatch();
    
    useEffect(()=>{
        const fetchAllJobs = async () => {
            try {
                console.log('� Fetching all jobs from backend...');
                
                const res = await axios.get(`${JOB_API_END_POINT}/get`, {withCredentials:true});
                console.log('✅ Jobs fetched successfully:', res.data.jobs?.length || 0, 'jobs');
                
                if(res.data.success){
                    dispatch(setAllJobs(res.data.jobs));
                }
            } catch (error) {
                console.error('❌ Error fetching jobs:', error.message);
                if (error.response) {
                    console.error('Response status:', error.response.status);
                    console.error('Response data:', error.response.data);
                }
            }
        }
        fetchAllJobs();
    },[dispatch])
}

export default useGetAllJobs