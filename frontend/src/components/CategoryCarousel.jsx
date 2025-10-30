import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='py-16 px-4'>
            <div className='max-w-5xl mx-auto'>
                {/* 🎯 Section header */}
                <div className='text-center mb-10'>
                    <h2 className='text-2xl md:text-3xl font-bold mb-3 text-slate-900 dark:text-white'>
                        Explore by <span className='text-purple-600 dark:text-purple-400'>Category</span>
                    </h2>
                    <p className='text-muted-foreground'>Find your perfect role in these popular categories</p>
                </div>

                {/* 🎠 Carousel */}
                <Carousel className="w-full">
                    <CarouselContent className="-ml-4">
                        {
                            // Added unique key prop to fix React warning
                            category.map((cat, index) => (
                                <CarouselItem 
                                    key={index} 
                                    className="pl-4 md:basis-1/2 lg:basis-1/3"
                                >
                                    <Button 
                                        onClick={()=>searchJobHandler(cat)} 
                                        variant="outline" 
                                        className="w-full h-14 rounded-2xl border-2 hover:border-primary hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-950 dark:hover:to-purple-950 hover:text-primary font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                    >
                                        {cat}
                                    </Button>
                                </CarouselItem>
                            ))
                        }
                    </CarouselContent>
                    <CarouselPrevious className='hidden md:flex' />
                    <CarouselNext className='hidden md:flex' />
                </Carousel>
            </div>
        </div>
    )
}

export default CategoryCarousel

