import React, { useEffect, useState } from 'react'
import axios from 'axios'

const GetRandomRoboImg = ({ userId }) => {
    const [ roboImg, setRoboImg ] = useState('')

    useEffect(() => {
        const fetchRoboImg = async () => {
            try {
                const response = await axios.get(`https://robohash.org/${userId}?size=200x200`)
                setRoboImg(response.config.url)
            } catch (error) {
                console.error('Error fetching Robo image:', error)
            }
        }
        fetchRoboImg()
    }, [userId])

  return (
    <>
    { roboImg && (
        <img src={roboImg} alt={`Robot for user ${userId}`} style={{ width: '100px', height: '100px' }}/>
    )}
    </>
  )
}

export default GetRandomRoboImg