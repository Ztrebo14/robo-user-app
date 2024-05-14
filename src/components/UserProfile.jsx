import React from 'react'
import GetRandomRoboImg from './GetRandomRoboImg'

const UserProfile = ({ userId, userName }) => {
  return (
    <>
    <p>User ID: {userId}</p>
    <p>User Name: {userName}</p>
    <GetRandomRoboImg userId={userId}/>
    </>
  )
}

export default UserProfile