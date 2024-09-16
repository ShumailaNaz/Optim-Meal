import axios from 'axios';
import { useEffect, useState } from 'react'
import bgImage from './assets/image_1.jpg'

import './App.css'
import { FaStar, FaTrash } from 'react-icons/fa';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedWeek, setSelectedWeek] = useState('all');
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [week1Meals, setWeek1Meals] = useState([]);
  const [week2Meals, setWeek2Meals] = useState([]);
  const [week3Meals, setWeek3Meals] = useState([]);
  const [week4Meals, setWeek4Meals] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupSelectedWeek, setPopupSelectedWeek] = useState('week1');
  const closePopup = () => {
    setIsPopupOpen(false); // Close the popup
  };
  const addMealsToWeek = () => {
    if (selectedMeals.length > 0) {
      setIsPopupOpen(true);
      
    }
  };

  const saveMealsToSelectedWeek = () => {
    console.log("Selected Meals: ", selectedMeals);
    let alreadyAddedMeals = [];  // Keep track of meals that are already in the selected week
  
    switch (popupSelectedWeek) {
      case 'week1': {
        const filteredWeek1Meals = selectedMeals.filter(meal => !week1Meals.some(existingMeal => existingMeal.id === meal.id));
        alreadyAddedMeals = selectedMeals.filter(meal => week1Meals.some(existingMeal => existingMeal.id === meal.id));
        setWeek1Meals([...week1Meals, ...filteredWeek1Meals]);
        break;
      }
      case 'week2': {
        const filteredWeek2Meals = selectedMeals.filter(meal => !week2Meals.some(existingMeal => existingMeal.id === meal.id));
        alreadyAddedMeals = selectedMeals.filter(meal => week2Meals.some(existingMeal => existingMeal.id === meal.id));
        setWeek2Meals([...week2Meals, ...filteredWeek2Meals]);
        break;
      }
      case 'week3': {
        const filteredWeek3Meals = selectedMeals.filter(meal => !week3Meals.some(existingMeal => existingMeal.id === meal.id));
        alreadyAddedMeals = selectedMeals.filter(meal => week3Meals.some(existingMeal => existingMeal.id === meal.id));
        setWeek3Meals([...week3Meals, ...filteredWeek3Meals]);
        break;
      }
      case 'week4': {
        const filteredWeek4Meals = selectedMeals.filter(meal => !week4Meals.some(existingMeal => existingMeal.id === meal.id));
        alreadyAddedMeals = selectedMeals.filter(meal => week4Meals.some(existingMeal => existingMeal.id === meal.id));
        setWeek4Meals([...week4Meals, ...filteredWeek4Meals]);
        break;
      }
      default:
        break;
    }
  
    // Notify the user if any meal was already added
    if (alreadyAddedMeals.length > 0) {
      alert(`${alreadyAddedMeals.map(m => m.name).join(', ')} is already added to ${popupSelectedWeek}`);
    }
  

     setSelectedMeals([]);
    // Close the popup after saving
    closePopup();
  };
  
  const handleWeekSelection = (week) => {
    setPopupSelectedWeek(week); // Set the selected week inside the popup
  };
  const handleWeekChange = (week) => {
    setSelectedWeek(week);
    localStorage.setItem('selectedWeek', week); // Save the selected week in localStorage
  };
  const toggleMealSelection = (meal) => {
    if (selectedMeals.includes(meal)) {
      setSelectedMeals(selectedMeals.filter((m) => m.id !== meal.id));
    } else {
      setSelectedMeals([...selectedMeals, meal]);
    }
  };
  const handleDelete = (mealId, week) => {
    switch (week) {
      case 'week1':
        setWeek1Meals(week1Meals.filter(meal => meal.id !== mealId));
        break;
      case 'week2':
        setWeek2Meals(week2Meals.filter(meal => meal.id !== mealId));
        break;
      case 'week3':
        setWeek3Meals(week3Meals.filter(meal => meal.id !== mealId));
        break;
      case 'week4':
        setWeek4Meals(week4Meals.filter(meal => meal.id !== mealId));
        break;
      default:
        break;
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/recipes");
        setData(response.data); // Store fetched data in state
        if (response.data.recipes && response.data.recipes.length > 0) {
          setSelectedMeals([response.data.recipes[0]]); // Set first meal as selected
        }
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
    <>
      <div className="relative w-full sm:h-72">
        <img
          src={bgImage}
          alt="Sample"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="inter-bold text-3xl md:text-5xl text-[#222222]">Optimized Your Meal</h1>
          <p className="inter-regular mt-2 text-xs md:text-sm text-[#222222]">
            Select Meal to Add in Week. You will be able to edit, modify, and change the Meal Weeks.
          </p>
        </div>
      </div>



      <div><h2 className='poppins-semibold text-lg md:text-3xl color-primary py-4 md:py-7 px-20 md:px-40'>Week Orders</h2></div>
      <div className="bg-white md:flex md:justify-around md:items-center p-8">
        <ul className='poppins-semibold text-sm md:text-[16px] md:flex  md:w-[60%] md:justify-around '>
          <li
            className={`navitems py-2 px-5 cursor-pointer ${selectedWeek === 'all' ? 'border-b-4 border-b-[#004370] text-[#004370]' : ''}`}
            onClick={() => handleWeekChange('all')}>
            All Meals</li>
          <li
            className={`navitems py-2 px-5 cursor-pointer ${selectedWeek === 'week1' ? 'border-b-4 border-b-[#004370] text-[#004370]' : ''}`}
            onClick={() => handleWeekChange('week1')}
          >
            Week 1</li>
          <li className={`navitems py-2 px-5 cursor-pointer ${selectedWeek === 'week2' ? 'border-b-4 border-b-[#004370] text-[#004370]' : ''}`}
            onClick={() => handleWeekChange('week2')}
          >Week 2</li>
          <li className={`navitems py-2 px-5 cursor-pointer ${selectedWeek === 'week3' ? 'border-b-4 border-b-[#004370] text-[#004370]' : ''}`}
            onClick={() => handleWeekChange('week3')}
          >Week 3</li>
          <li className={`navitems py-2 px-5 cursor-pointer ${selectedWeek === 'week4' ? 'border-b-4 border-b-[#004370] text-[#004370]' : ''}`}
            onClick={() => handleWeekChange('week4')}
          >Week 4</li>
        </ul>
        <button
          onClick={addMealsToWeek}
          disabled={selectedMeals.length === 0}
          className={` p-3 md:w-[208px] md:h-[48px] poppins-semibold text-sm md:text-[16px] text-center border-0 rounded-[3.58px] bg-[#004370] text-white
            ${selectedMeals.length > 0 ? 'bg-[#004370] text-white' : 'bg-[#9B9B9B]  cursor-not-allowed'}`}
        >Add to Week</button>
      </div>


      {selectedWeek === 'all' &&
        <div className="allmeals w-full md:w-[78%] m-auto">

          <div className='flex md:flex-row flex-col md:flex-wrap justify-center gap-16 mt-24'>
            {
              data ? data.recipes.map(val => (
                <>
                  <div
                    key={val.id}
                    onClick={() => toggleMealSelection(val)}
                    className={`w-[300px] h-[550px] md:w-[390px] md:h-[530px] rounded-[11.52px] bg-[#FAFAFA] border-2 m-auto
                  ${selectedMeals.includes(val) ? 'border-[#004370]' : ''} p-2 md:p-7 cursor-pointer`}>
                    <img src={val.image} alt="" className='rounded-[15.3px] w-[280px] h-[250px] md:w-[344px] md:h-[245px]' />
                    <p className='poppins-bold color-primary md:text-[23.05px] py-2'>{val.name}</p>
                    <p className='poppins-regular text-[#404040] text-xs md:text-sm text-justify md:h-[130px] md:w-[344px] overflow-hidden text-ellipsis'>
                      {val.instructions}
                    </p>
                    <p className='pt-2 flex '>
                      <span className='poppins-semibold text-xs md:text-sm color-primary'>Cuisine: </span>
                      <span className='poppins-medium text-xs md:text-sm color-primary'>{val.cuisine}</span>
                      <span className='poppins-semibold text-xs md:text-sm color-primary pl-7'>Rating: </span>
                      <span className='poppins-medium text-xs md:text-sm color-primary'>{val.rating}</span>
                      <span className='flex pl-3'><FaStar/> <FaStar/> <FaStar/> <FaStar/> </span>
                    </p>
                  </div>
                </>
              ))

                : <div>Loading</div>
            }
          </div>

        </div>}
      {selectedWeek === 'week1' && (
        <div className="week1meals w-full md:w-[78%] m-auto">
          <div className='flex md:flex-row flex-col md:flex-wrap justify-center gap-16 mt-24'>
            {week1Meals.length > 0 ? (
              week1Meals.map((meal) => (
                <div key={meal.id} className="w-[300px] h-[550px] md:w-[390px] md:h-[530px] rounded-[11.52px] bg-[#FAFAFA] border-2 m-auto p-2 md:p-7 ">
                     <div className="relative">
              <img src={meal.image} alt="" className='rounded-[15.3px] w-[280px] h-[250px] md:w-[344px] md:h-[245px]' />
              <div 
               onClick={() => handleDelete(meal.id, 'week1')}
               className="absolute top-0 left-0 m-3  p-2
               bg-white rounded-full cursor-pointer">
                <FaTrash className="text-red-500" />
              </div>
              <div className="absolute top-3 right-3  bg-black text-white rounded-sm px-3 py-1 text-sm">
              {meal.mealType}
              </div>
            </div>
                  <p className='poppins-bold color-primary md:text-[23.05px] py-2'>{meal.name}</p>
                  <p className='poppins-regular text-[#404040] text-xs md:text-sm text-justify md:h-[130px] md:w-[344px] overflow-hidden text-ellipsis'>
                    {meal.instructions}
                  </p>
                  <p className='pt-2 flex'>

                    <span className='poppins-semibold text-xs md:text-sm color-primary'>Cuisine: </span>
                      <span className='poppins-medium text-xs md:text-sm color-primary'>{meal.cuisine}</span>
                      <span className='poppins-semibold text-xs md:text-sm color-primary pl-7'>Rating: </span>
                      <span className='poppins-medium text-xs md:text-sm color-primary'>{meal.rating}</span>
                      <span className='flex pl-3'><FaStar/> <FaStar/> <FaStar/> <FaStar/> </span>
                  </p>
                </div>
              ))
            ) : (
              <p className='poppins-bold text-lg color-primary'>No meals selected for Week 1 yet.</p>
            )}
          </div>
        </div>
      )}

      {selectedWeek === 'week2' && (
       <div className="week2meals w-full md:w-[78%] m-auto">
       <div className='flex md:flex-row flex-col md:flex-wrap justify-center gap-16 mt-24'>
         {week2Meals.length > 0 ? (
           week2Meals.map((meal) => (
             <div key={meal.id} className="w-[300px] h-[550px] md:w-[390px] md:h-[530px] rounded-[11.52px] bg-[#FAFAFA] border-2 m-auto p-2 md:p-7 ">
                  <div className="relative">
           <img src={meal.image} alt="" className='rounded-[15.3px] w-[280px] h-[250px] md:w-[344px] md:h-[245px]' />
           <div 
            onClick={() => handleDelete(meal.id, 'week2')}
            className="absolute top-0 left-0 m-3  p-2
            bg-white rounded-full cursor-pointer">
             <FaTrash className="text-red-500" />
           </div>
           <div className="absolute top-3 right-3  bg-black text-white rounded-sm px-3 py-1 text-sm">
           {meal.mealType}
           </div>
         </div>
               <p className='poppins-bold color-primary md:text-[23.05px] py-2'>{meal.name}</p>
               <p className='poppins-regular text-[#404040] text-xs md:text-sm text-justify md:h-[130px] md:w-[344px] overflow-hidden text-ellipsis'>
                 {meal.instructions}
               </p>
               <p className='pt-2 flex'>

                 <span className='poppins-semibold text-xs md:text-sm color-primary'>Cuisine: </span>
                   <span className='poppins-medium text-xs md:text-sm color-primary'>{meal.cuisine}</span>
                   <span className='poppins-semibold text-xs md:text-sm color-primary pl-7'>Rating: </span>
                   <span className='poppins-medium text-xs md:text-sm color-primary'>{meal.rating}</span>
                   <span className='flex pl-3'><FaStar/> <FaStar/> <FaStar/> <FaStar/> </span>
               </p>
             </div>
           ))
         ) : (
           <p className='poppins-bold text-lg color-primary'>No meals selected for Week 1 yet.</p>
         )}
       </div>
     </div>
      )}


      {selectedWeek === 'week3' && (
        <div className="week3meals w-full md:w-[78%] m-auto">
        <div className='flex md:flex-row flex-col md:flex-wrap justify-center gap-16 mt-24'>
          {week3Meals.length > 0 ? (
            week3Meals.map((meal) => (
              <div key={meal.id} className="w-[300px] h-[550px] md:w-[390px] md:h-[530px] rounded-[11.52px] bg-[#FAFAFA] border-2 m-auto p-2 md:p-7 ">
                   <div className="relative">
            <img src={meal.image} alt="" className='rounded-[15.3px] w-[280px] h-[250px] md:w-[344px] md:h-[245px]' />
            <div 
             onClick={() => handleDelete(meal.id, 'week3')}
             className="absolute top-0 left-0 m-3  p-2
             bg-white rounded-full cursor-pointer">
              <FaTrash className="text-red-500" />
            </div>
            <div className="absolute top-3 right-3  bg-black text-white rounded-sm px-3 py-1 text-sm">
            {meal.mealType}
            </div>
          </div>
                <p className='poppins-bold color-primary md:text-[23.05px] py-2'>{meal.name}</p>
                <p className='poppins-regular text-[#404040] text-xs md:text-sm text-justify md:h-[130px] md:w-[344px] overflow-hidden text-ellipsis'>
                  {meal.instructions}
                </p>
                <p className='pt-2 flex'>

                  <span className='poppins-semibold text-xs md:text-sm color-primary'>Cuisine: </span>
                    <span className='poppins-medium text-xs md:text-sm color-primary'>{meal.cuisine}</span>
                    <span className='poppins-semibold text-xs md:text-sm color-primary pl-7'>Rating: </span>
                    <span className='poppins-medium text-xs md:text-sm color-primary'>{meal.rating}</span>
                    <span className='flex pl-3'><FaStar/> <FaStar/> <FaStar/> <FaStar/> </span>
                </p>
              </div>
            ))
          ) : (
            <p className='poppins-bold text-lg color-primary'>No meals selected for Week 1 yet.</p>
          )}
        </div>
      </div>
      )}


      {selectedWeek === 'week4' && (
        <div className="week4meals w-full md:w-[78%] m-auto">
        <div className='flex md:flex-row flex-col md:flex-wrap justify-center gap-16 mt-24'>
          {week4Meals.length > 0 ? (
            week4Meals.map((meal) => (
              <div key={meal.id} className="w-[300px] h-[550px] md:w-[390px] md:h-[530px] rounded-[11.52px] bg-[#FAFAFA] border-2 m-auto p-2 md:p-7 ">
                   <div className="relative">
            <img src={meal.image} alt="" className='rounded-[15.3px] w-[280px] h-[250px] md:w-[344px] md:h-[245px]' />
            <div 
             onClick={() => handleDelete(meal.id, 'week4')}
             className="absolute top-0 left-0 m-3  p-2
             bg-white rounded-full cursor-pointer">
              <FaTrash className="text-red-500" />
            </div>
            <div className="absolute top-3 right-3  bg-black text-white rounded-sm px-3 py-1 text-sm">
            {meal.mealType}
            </div>
          </div>
                <p className='poppins-bold color-primary md:text-[23.05px] py-2'>{meal.name}</p>
                <p className='poppins-regular text-[#404040] text-xs md:text-sm text-justify md:h-[130px] md:w-[344px] overflow-hidden text-ellipsis'>
                  {meal.instructions}
                </p>
                <p className='pt-2 flex'>

                  <span className='poppins-semibold text-xs md:text-sm color-primary'>Cuisine: </span>
                    <span className='poppins-medium text-xs md:text-sm color-primary'>{meal.cuisine}</span>
                    <span className='poppins-semibold text-xs md:text-sm color-primary pl-9'>Rating: </span>
                    <span className='poppins-medium text-xs md:text-sm color-primary'>{meal.rating}</span>
                    <span className='flex pl-3'><FaStar/> <FaStar/> <FaStar/> <FaStar/> </span>
                </p>
              </div>
            ))
          ) : (
            <p className='poppins-bold text-lg color-primary'>No meals selected for Week 1 yet.</p>
          )}
        </div>
      </div>
      )}
      {isPopupOpen && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={closePopup}></div>
          <div className="popup-save fixed inset-0 z-50 flex items-center justify-center">
            <div className="rounded-xl bg-white p-2 md:p-10 text-center w-5/6 md:w-[40%] m-auto">
              <h2 className='poppins-semibold text-lg md:text-3xl color-primary p-2 md:py-7'>Select Week</h2>
              <div className='poppins-medium text-xs md:text-2xl color-primary py-2 md:py-7 flex gap-3 justify-center sm:flex-wrap'>
                <div
                  className={`rounded-[9.55px] px-2 md:px-4 py-1 md:py-3 cursor-pointer ${popupSelectedWeek === 'week1' ? 'bg-brand-light' : 'bg-[#f2f2f2]'}`}
                  onClick={() => handleWeekSelection('week1')}
                >
                  Week 1
                </div>
                <div
                  className={`rounded-[9.55px] px-2 md:px-4 py-1 md:py-3 cursor-pointer ${popupSelectedWeek === 'week2' ? 'bg-brand-light' : 'bg-[#f2f2f2]'}`}
                  onClick={() => handleWeekSelection('week2')}
                >
                  Week 2
                </div>
                <div
                  className={`rounded-[9.55px] px-2 md:px-4 py-1 md:py-3 cursor-pointer ${popupSelectedWeek === 'week3' ? 'bg-brand-light' : 'bg-[#f2f2f2]'}`}
                  onClick={() => handleWeekSelection('week3')}
                >
                  Week 3
                </div>
                <div
                  className={`rounded-[9.55px] px-2 md:px-4 py-1 md:py-3 cursor-pointer ${popupSelectedWeek === 'week4' ? 'bg-brand-light' : 'bg-[#f2f2f2]'}`}
                  onClick={() => handleWeekSelection('week4')}
                >
                  Week 4
                </div>
              </div>

              <button
                onClick={saveMealsToSelectedWeek}
                className='poppins-bold text-sm md:text-[16px] rounded-[3.58px] bg-brand-secondary text-white px-16 py-1.5 md:py-3 mt-7'
              >
                Save
              </button>
            </div>
          </div>
        </>
      )}

    </>
  )
}

export default App
