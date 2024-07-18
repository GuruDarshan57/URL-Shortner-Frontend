import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import URL from '../../Components/URL/URL';

const Generate = () => {
    const [long_url, setLong_url] = useState("")
    const [url_name, setUrl_name] = useState("")
    const [s_url, setS_url] = useState("SHORT URL")
    const [recentURL, setRecentURL] = useState([])

    useEffect(() => {
        getRecent()
    }, [])

    const getRecent = async () => {
        try {
            const resp = await fetch(import.meta.env.VITE_Backend + "/s_url/getRecent", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: 'include'
            })
            const res = await resp.json()
            if (resp.status === 200) {
                setRecentURL(res.data)
            }
            else {
                setRecentURL([])
            }
        } catch (err) {
            console.log(err.message)
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
        else {
            try {
                const res = await fetch(import.meta.env.VITE_Backend + "/s_url/generate", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                    credentials: 'include'
                })
                const resp = await res.json()
                if (res.status === 200) {
                    toast.success(resp.msg)
                    setLong_url("")
                    setUrl_name("")
                    setS_url(import.meta.env.VITE_Backend + "/shorturl/" + resp.s_id)
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
        <div className='mt-5 sm:mt-20 flex w-screen place-content-center'>
            <div className='flex-col w-11/12 sm:w-1/2'>
                <div><h2 className='uppercase mt-3 text-2xl sm:text-4xl font-bold tracking-wider'>GENERATE sHORT-URL</h2></div>
                <form className='flex-col gap-5' style={{ display: 'flex', flexDirection: "column" }}>
                    <input className='border-2 h-10 p-2 mt-4 focus:outline-none' type="text" name="long_url" id="long_url" placeholder='URL' value={long_url} onChange={(e) => { setLong_url(e.target.value) }} />
                    <input className='border-2 h-10 p-2 focus:outline-none' type="text" name="url_name" id="url_name" placeholder='Name' value={url_name} onChange={(e) => { setUrl_name(e.target.value) }} />
                    <button className='uppercase w-52 h-10 text-center border-4 border-white hover:bg-white hover:text-black font-bold tracking-wide' onClick={handleCreatesurl}>Create Short URL</button>
                </form>
                <div className='flex justify-between w-full h-10 border-2 rounded-sm border-slate-400 mt-5'>
                    <i className="fa-solid fa-link p-1 px-2 text-xl border-r-2 border-slate-400" style={{
                        color: "#63E6BE"
                    }}></i>
                    < a className='p-2 font-bold tracking-wide text-lime-300' href={s_url} target='_blank' style={{ pointerEvents: `${s_url === "SHORT URL" ? "none" : ''}` }}> {s_url}</a>
                    <i className="fa-solid fa-copy p-1 px-3 text-xl cursor-pointer border-l-2 border-slate-400" style={{ color: "#63E6BE", pointerEvents: `${s_url === "SHORT URL" ? "none" : ''}` }} ></i>
                </div>
                <div>
                    <div><h2 className='mt-5 text-xl sm:text-2xl font-bold tracking-wider'>Recent Short URL's [{recentURL.length}]</h2></div>
                    <div> {recentURL.length != 0 ? recentURL.map(ele => {
                        return <URL key={ele._id} data={ele} />
                    }) : <h4>No URL's to display</h4>}</div>
                    {recentURL.length != 0 ? <div><h5 className='mt-2'>For More detalied view visit Analytics page</h5></div> : ""}
                </div>
            </div>
        </div >
    )
}

export default Generate