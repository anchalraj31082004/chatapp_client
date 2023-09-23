import React from 'react'

const Avatar = ({src,name }) => {
    const AvtartFirstLetter = name.charAt(0).toUpperCase();
  return (
    <div className='border-2 rounded-full bg-amber-500 h-9 w-9 flex items-center justify-center'>
        <img className='text-center rounded-full' src={src} alt={AvtartFirstLetter} />
    </div>
  )
}

export default Avatar