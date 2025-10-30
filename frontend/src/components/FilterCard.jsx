import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { MapPin, Briefcase, Clock, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
        icon: MapPin
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
        icon: Briefcase
    },
    {
        fitlerType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
        icon: Clock
    },
]

const FilterCard = () => {
    // Separate state for each filter type to allow independent selection
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedIndustry, setSelectedIndustry] = useState('');
    const [selectedWorkType, setSelectedWorkType] = useState('');
    const dispatch = useDispatch();

    const changeLocationHandler = (value) => {
        setSelectedLocation(value);
    }
    const changeIndustryHandler = (value) => {
        setSelectedIndustry(value);
    }
    const changeSalaryHandler = (value) => {
        setSelectedWorkType(value);
        console.log('⏰ Work Type filter:', value, '→', newValue || '(cleared)');
        setSelectedWorkType(newValue);
    }

    // Clear all filters - resets all selections to empty string
    const clearFilters = () => {
        setSelectedLocation('');
        setSelectedIndustry('');
        setSelectedWorkType('');
    }

    useEffect(() => {
        dispatch(setSearchedQuery(selectedLocation));
    }, [selectedLocation]);

    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup value={selectedLocation} onValueChange={changeLocationHandler}>
                {
                    fitlerData.map((data, index) => (
                        <div key={index}>
                            <h1 className='font-bold text-lg'>{data.fitlerType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`
                                    return (
                                        <div className='flex items-center space-x-2 my-2' key={idx}>
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label htmlFor={itemId}>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard

