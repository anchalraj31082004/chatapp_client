import React from 'react'
import Avatar from './Avatar'

const UserListItem = ({ handleFunction, user}) => {

    // console.log(user);

  return (
    <div
    className='cursor-pointer bg-gray-200 gap-2 hover:bg-teal-500 hover:text-white w-full flex items-center text-black px-3 py-2 mb-2 rounded-lg'
    onClick={handleFunction}
    >
        <Avatar src={user?.pic} name={user?.name}/>
        <div className='flex flex-col'>
            <div className='font-bold'>
                {user?.name}
            </div>
            <div className='text-sm'>
                <b>Email:</b>{user?.email}
            </div>
        </div>
    </div>
  )
}

export default UserListItem