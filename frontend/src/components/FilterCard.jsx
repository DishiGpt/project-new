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
        // If the same value is clicked, deselect it
        setSelectedLocation(selectedLocation === value ? '' : value);
    }
    const changeIndustryHandler = (value) => {
        // If the same value is clicked, deselect it
        setSelectedIndustry(selectedIndustry === value ? '' : value);
    }
    const changeSalaryHandler = (value) => {
        // If the same value is clicked, deselect it
        setSelectedWorkType(selectedWorkType === value ? '' : value);
    }

    // Clear all filters - resets all selections to empty string
    const clearFilters = () => {
        setSelectedLocation('');
        setSelectedIndustry('');
        setSelectedWorkType('');
    }

    useEffect(() => {
        // Dispatch all filter values as an object
        const filters = {
            location: selectedLocation,
            industry: selectedIndustry,
            salary: selectedWorkType
        };
        dispatch(setSearchedQuery(filters));
    }, [selectedLocation, selectedIndustry, selectedWorkType, dispatch]);

    // Helper function to get the correct state and handler for each filter
    const getFilterProps = (filterType) => {
        switch(filterType) {
            case "Location":
                return { value: selectedLocation, onChange: changeLocationHandler };
            case "Industry":
                return { value: selectedIndustry, onChange: changeIndustryHandler };
            case "Salary":
                return { value: selectedWorkType, onChange: changeSalaryHandler };
            default:
                return { value: '', onChange: () => {} };
        }
    };

    return (
        <div className='w-full bg-white dark:bg-slate-800 p-3 rounded-md shadow-md border border-gray-100 dark:border-slate-700 transition-colors'>
            <h1 className='font-bold text-lg text-gray-900 dark:text-white'>Filter Jobs</h1>
            <hr className='mt-3 border-gray-200 dark:border-slate-600' />
            {
                fitlerData.map((data, index) => {
                    const { value, onChange } = getFilterProps(data.fitlerType);
                    return (
                        <div key={index}>
                            <h1 className='font-bold text-lg text-gray-800 dark:text-gray-200 mt-4'>{data.fitlerType}</h1>
                            <div>
                                {
                                    data.array.map((item, idx) => {
                                        const itemId = `id${index}-${idx}`
                                        const isSelected = value === item;
                                        return (
                                            <div 
                                                className='flex items-center space-x-2 my-2 cursor-pointer' 
                                                key={idx}
                                                onClick={() => onChange(item)}
                                            >
                                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                                                    isSelected 
                                                        ? 'border-purple-600 dark:border-purple-400 bg-purple-600 dark:bg-purple-400' 
                                                        : 'border-gray-300 dark:border-gray-600'
                                                }`}>
                                                    {isSelected && <div className='w-2 h-2 rounded-full bg-white'></div>}
                                                </div>
                                                <Label htmlFor={itemId} className='text-gray-700 dark:text-gray-300 cursor-pointer'>{item}</Label>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default FilterCard

