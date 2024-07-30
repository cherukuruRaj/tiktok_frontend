import React, { useEffect, useState } from 'react'
import { Accountcard } from '../components/accountcard';


export const Accounts = () => {

    const[tiktokUsers, setTiktokUsers]= useState([]);

  const[filter, setFilter]= useState("fishing");



    


    async function fetchData() {
        try {
          const response = await fetch(`http://localhost:3001/api/v1/userdata?filter=${filter}`);
          console.log("this is how the response looks like")
          console.log(response);

          const data = await response.json();
          console.log("this is how the body looks like")
          console.log(data); // Do something with the data
          setTiktokUsers(data);
        } catch (error) {
          console.error('Error fetching data:', error.message);
        }
      }
            

      useEffect(()=>{
        fetchData();
      },[filter])


      const handleFilterChange = async (e) => {
        const selectedFilter = e.target.value;
        setFilter(selectedFilter);
    }
      
    

  return (



    <div className='flex flex-col gap-4'>


             <div className='w-20 font-semibold'>
              <select onChange={(e)=>(handleFilterChange(e))} className=' bg-white text-black p-2 rounded-lg text-xl border-2 border-black' >
                  <option value="fishing">China Illegal Fishing</option>
                  <option value="mining">China Illegal Mining</option>
                </select>
             </div>



             <div className='flex flex-col gap-6'>

            { tiktokUsers.map((user, index)=>(
                  <Accountcard key={index} obj={user}/>
              ))}

          </div>


    </div>

    
  )
}
