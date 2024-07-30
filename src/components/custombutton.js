import React from 'react'

export const Custombutton = (props) => {


  return (
    <button className='bg-gray-900 p-2 rounded-lg text-white text-xl w-32'>
    {props.text}
    </button>
  )
}
