import React, { useEffect, useState } from 'react'
// Removed Navbar import - now using Layout in App.jsx
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { Building2, Plus, Search } from 'lucide-react'

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setSearchCompanyByText(input));
    },[input]);
    return (
        <div className='min-h-screen py-10'>
            {/* Navbar removed - now rendered by Layout component */}
            <div className='max-w-6xl mx-auto px-4'>
                {/* 🎯 Modern header */}
                <div className='mb-8'>
                    <div className='flex items-center gap-3 mb-2'>
                        <div className='p-3 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20'>
                            <Building2 className='w-6 h-6 text-indigo-600 dark:text-indigo-400' />
                        </div>
                        <div>
                            <h1 className='text-3xl font-black'>Companies</h1>
                            <p className='text-muted-foreground'>Manage your registered companies</p>
                        </div>
                    </div>
                </div>

                {/* 🔍 Search and action bar */}
                <div className='glass-card p-6 mb-6'>
                    <div className='flex flex-col md:flex-row gap-4 items-center justify-between'>
                        <div className='relative flex-1 w-full md:max-w-md'>
                            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5' />
                            <Input
                                className="pl-10 h-12 rounded-xl"
                                placeholder="Search companies by name..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </div>
                        <Button 
                            onClick={() => navigate("/admin/companies/create")} 
                            className="btn-gradient w-full md:w-auto"
                        >
                            <Plus className='w-5 h-5 mr-2' />
                            Register Company
                        </Button>
                    </div>
                </div>

                {/* 📊 Table */}
                <div className='glass-card p-6'>
                    <CompaniesTable/>
                </div>
            </div>
        </div>
    )
}

export default Companies

