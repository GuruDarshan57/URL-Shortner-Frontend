import React, { useEffect, useState } from 'react'
import useGetUserDetails from '../../hooks/useGetUserDetails'
import AURL from '../../Components/AURL/AURL'

const Analytics = () => {
    const { user_data } = useGetUserDetails()
    const [data, setData] = useState()
    useEffect(() => {
        getAnalyticsData()
    }, [])
    const getAnalyticsData = async (e) => {
        if (user_data) {
            try {
                const resp = await fetch(import.meta.env.VITE_Backend + "/s_url/analytics", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: 'include'
                })
                const res = await resp.json()
                if (resp.status === 200) {
                    setData(res)
                }
            } catch (err) {
                console.log(err.message)
            }
        }
    }
    return (
        <div className='mt-28 pb-10 sm:pb-28 flex w-full place-content-center'>
            <div className='flex-col w-11/12 sm:w-1/2'>
                {data?.url_data.length != 0 ? <>
                    <div className='flex border-2 text-center'>
                        <div className='flex-1 border-2 flex-col'><div>{data?.urls}</div><div>Total URL's generated</div></div>
                        <div className='flex-1 border-2 flex-col'><div>{data?.clicks}</div><div>Total Clicks</div></div>
                        <div className='flex-1 border-2 flex-col'><div>{data?.most_clicks}</div><div>Most Clicks</div></div>
                    </div>

                    <div>
                        <div>
                            {data?.url_data?.map((ele) =>
                                <AURL key={ele._id} data={ele} />)}
                        </div>
                    </div></> : ""}
            </div>
        </div>
    )
}

export default Analytics