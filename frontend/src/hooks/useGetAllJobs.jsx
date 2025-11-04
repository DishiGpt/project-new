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
                
                console.log("🌍 Calling API:", `${JOB_API_END_POINT}/get`);

                const res = await axios.get(`${JOB_API_END_POINT}/get`, {withCredentials:true});
                console.log('✅ Jobs fetched successfully:', res.data.jobs?.length || 0, 'jobs');
                
                if (res.data.jobs && Array.isArray(res.data.jobs)) {
                    dispatch(setAllJobs(res.data.jobs));
                } else if (Array.isArray(res.data)) {
  // fallback if backend sends plain array
                    dispatch(setAllJobs(res.data));
                } else {
                    console.warn("⚠️ Unexpected response format:", res.data);
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