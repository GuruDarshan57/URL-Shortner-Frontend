import React, { useState } from 'react'

//custom hook to fetch stored user data
const useGetUserDetails = () => {
    const [user_data, setUser_data] = useState(JSON.parse(localStorage.getItem("user_data")))
    return { user_data, setUser_data }
}

export default useGetUserDetails