import axios from 'axios';
import { useEffect, useState } from 'react'

export default function AllMeals() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://dummyjson.com/recipes");
                setData(response.data); // Store fetched data in state
            } catch (error) {
                setError(error.message); // Store error in state
            } finally {
                setLoading(false); // Turn off loading state
            }
        };

        fetchData();
    }, []); // Empty dependency array to call the API only on the first render

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    console.log(data, "data")
    return (
        <div className='flex flex-wrap justify-center gap-16 mt-24'>
            {
                data ? data.recipes.map(val => (
                    <>
                        <div className='w-[390px] h-[530px] rounded-[11.52px] bg-[#FAFAFA] border-2 border-[#004370] p-7 '>
                            <img src={val.image} alt="" className='rounded-[15.3px] w-[344px] h-[245px]' />
                            <p className='poppins-bold color-primary text-[23.05px] py-2'>{val.name}</p>
                            <p className='poppins-regular text-[#404040] text-sm text-justify h-[130px] w-[344px] overflow-hidden text-ellipsis'>
                                {val.instructions}
                            </p>
                            <p className='pt-2 flex '>
                                <span className='poppins-semibold text-sm color-primary'>Cuisine: </span>
                                <span className='poppins-medium text-sm color-primary'>{val.cuisine}</span>
                                <span className='poppins-semibold text-sm color-primary pl-7'>Rating: </span>
                                <span className='poppins-medium text-sm color-primary'>{val.rating}</span>
                            </p>
                        </div>
                    </>
                ))

                    : <div>Loadaing</div>
            }
        </div>
    )
}
