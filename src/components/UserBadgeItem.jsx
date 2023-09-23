import React from 'react'
import { VscClose } from 'react-icons/vsc'

const UserBadgeItem = ({user, handleFunction}) => {
  return (
    <div
     className='flex justify-between px-2 py-1 m-1 rounded-lg bg-amber-500'
     onClick={handleFunction}
    >
        <span>{user.name}</span>
        <VscClose className="text-sm hover:text-amber-500 font-bold active:text-sky-600" />
    </div>
  )
}

export default UserBadgeItem