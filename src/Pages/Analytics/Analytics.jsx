import React, { useEffect, useState } from 'react'
import useGetUserDetails from '../../hooks/useGetUserDetails'
import AURL from '../../Components/AURL/AURL'
import PieChart from '../../Components/PieChart/PieChart'

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
        <div className='mt-20 sm:mt-28 pb-10 sm:pb-28 flex w-full place-content-center'>
            <div className='flex-col w-11/12 sm:w-1/2'>
                {data?.url_data.length != 0 ? <>
                    <div className='flex sm:border-2 sm:border-slate-400 text-center py-4'>
                        <div className='flex-1 sm:border-r-2 flex-col'><div className='text-6xl sm:text-8xl'>{data?.urls}</div><div className='tracking-wider uppercase text-sm'>Total URL's</div></div>
                        <div className='flex-1 sm:border-r-2 flex-col'><div className='text-6xl sm:text-8xl'>{data?.clicks}</div><div className='tracking-wider uppercase text-sm'>Total Clicks</div></div>
                        <div className='flex-1 flex-col'><div className='text-6xl sm:text-8xl'>{data?.most_clicks}</div><div className='tracking-wider uppercase text-sm'>Most Clicks</div></div>
                    </div>
                    <div className='flex place-content-center'>
                        {data?.url_data ? <PieChart data={data?.url_data} /> : ""}
                    </div>

                    <div>
                        <div>
                            {data ? <AURL data={{ name: "Name", url: "URL", short_id: "Short URL", clicks: "Clicks" }} heading={true} /> : ""}
                            {data?.url_data?.map((ele) =>
                                <AURL key={ele._id} data={ele} />)}
                        </div>
                    </div></> : ""}
            </div>
        </div>
    )
}

export default Analytics