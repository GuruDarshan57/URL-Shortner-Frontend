import React, { useEffect, useState } from 'react'
import useGetUserData from '../../hooks/useGetUserDetails'
import { toast } from 'react-hot-toast';
import URL from '../../Components/URL/URL';
import { FaCopy } from "react-icons/fa6";
import { FaLink } from "react-icons/fa6";
import { RiRefreshFill } from "react-icons/ri";

const Generate = () => {
    const { user_data } = useGetUserData()
    const [long_url, setLong_url] = useState("")
    const [url_name, setUrl_name] = useState("")
    const [s_url, setS_url] = useState("SHORT URL")
    const [recentURL, setRecentURL] = useState([])
    const [loader, setLoader] = useState(false)
    const [refresh, setRefresh] = useState(true)

    const copyLink = (url) => {
        navigator.clipboard.writeText(url)
    }

    useEffect(() => {
        getRecent()
    }, [refresh])

    const getRecent = async () => {
        if (user_data) {
            try {
                setLoader(true)
                let res;
                setTimeout(() => {
                    res ? "" : toast.error("Server has started Now.\nPlease wait for few seconds", { autoClose: 4000 })
                }, 5000);
                const resp = await fetch(import.meta.env.VITE_Backend + "/s_url/getRecent", {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                })
                res = await resp.json()
                if (resp.status === 200) {
                    setRecentURL(res.data)
                }
                else {
                    setRecentURL([])
                }
                setLoader(false)
            } catch (err) {
                console.log(err.message)
                setLoader(false)
            }
        }
    }

    const handleCreatesurl = async (e) => {
        e.preventDefault()
        const payload = {
            l_url: long_url,
            name: url_name
        }
        if (!url_name || !long_url) {
            toast.error("Fill all fields")
        }
        else if (url_name.length > 11) {
            toast.error("Use Short Name")
        }
        else {
            try {
                const res = await fetch(import.meta.env.VITE_Backend + "/s_url/generate", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                })
                const resp = await res.json()
                if (res.status === 200) {
                    toast.success(resp.msg)
                    setLong_url("")
                    setUrl_name("")
                    setS_url(import.meta.env.VITE_Backend + "/" + resp.s_id)
                }
                else {
                    toast.warning(resp.msg);
                }

            } catch (err) {
                console.log(err.message)
            }
        }
    }
    return (
        <div className='mt-20 sm:mt-28 flex w-screen place-content-center sm:pb-28 text-white'>
            {loader ? <div className="loader"></div> : <div className='flex-col w-11/12 sm:w-1/2'>
                <div><h2 className='uppercase mt-3 text-2xl sm:text-4xl font-bold tracking-wider'>GENERATE SHORT-URL</h2></div>
                <form className='flex-col gap-5' style={{ display: 'flex', flexDirection: "column" }}>
                    <input type="url" className='border-2 bg-black h-10 p-2 mt-4 focus:outline-none' name="long_url" id="long_url" placeholder='URL' value={long_url} onChange={(e) => { setLong_url(e.target.value) }} />
                    <input className='border-2 bg-black h-10 p-2 focus:outline-none' type="text" name="url_name" id="url_name" placeholder='Name' value={url_name} onChange={(e) => { setUrl_name(e.target.value) }} />
                    <button className='uppercase w-52 h-10 text-center border-4 border-white hover:bg-white hover:text-black font-bold tracking-wide' onClick={handleCreatesurl}>Create Short URL</button>
                </form>
                <div className='flex justify-between w-full h-10 border-2 rounded-sm border-slate-400 mt-5'>
                    <span className="p-1 px-2 text-xl border-r-2 border-slate-400 place-content-center"><FaLink /></span>
                    < a className='p-2 text-sm sm:text-base sm:font-semibold tracking-wide text-lime-300' href={s_url} target='_blank' style={{ pointerEvents: `${s_url === "SHORT URL" ? "none" : ''}` }}> {s_url}</a>
                    <span className={`p-1 px-2 text-xl border-l-2 border-slate-400 place-content-center ${s_url === "SHORT URL" ? "none" : 'cursor-pointer'}`} onClick={() => {
                        const link = s_url
                        s_url === "SHORT URL" ? "" : copyLink(link)

                    }}><FaCopy /></span>
                </div>
                <div className='w-full'>
                    <div className='flex justify-between items-center'><h2 className='mt-5 text-xl sm:text-2xl font-bold tracking-wider mb-3'>Recent Short URL's [{recentURL.length}]</h2><span className='self-end flex items-center gap-1 cursor-pointer border-2 rounded-lg p-1 px-2 text-sm border-green-400 hover:text-green-400 hover:border-white' onClick={() => { setRefresh((e) => !e) }}><RiRefreshFill />Refresh</span></div>
                    <div className='flex-col w-full'>
                        {recentURL.length != 0 ? <URL data={{ name: "Name", url: "URL", short_id: "Short URL" }} heading={true} /> : ""}
                        {recentURL.length != 0 ? recentURL.map(ele => {
                            return <URL key={ele.name} data={ele} />
                        }) : <h4>No URL's to display</h4>}</div>
                    {recentURL.length != 0 ? <div className='pl-1'><h5 className='mt-2'>For More detalied view visit Analytics page</h5></div> : ""}
                </div>
            </div>}
        </div >

    )
}

export default Generate