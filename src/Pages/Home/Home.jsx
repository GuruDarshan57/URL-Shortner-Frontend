import React, { useState } from 'react'
import useGetUserDetails from '../../hooks/useGetUserDetails'

const Home = () => {
    const udata = useGetUserDetails()
    const [data, setData] = useState(udata?.email)
    return (
        <div>
            {data}
        </div>
    )
}

export default Home