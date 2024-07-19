import React from 'react'

const URL = (props) => {
    const { _id, name, url, short_id } = props.data

    const copyLink = (url) => {
        navigator.clipboard.writeText(url)
    }
    return (
        <div className='mt-6 flex w-full text-center p-1 tracking-wide'>
            <div className='w-20 sm:w-28 border-2 border-r-0 rounded-sm rounded-r-none'>
                {name}
            </div>
            <div className='flex-1 border-2 relative hidden xl:inline'>
                <a className=' text-lime-300' href={import.meta.env.VITE_Backend + "/" + short_id} target="_blank">{import.meta.env.VITE_Backend.slice(8,) + "/" + short_id}</a>
                <i className="fa-solid fa-copy p-1 px-3 text-sm bottom-0 cursor-pointer absolute -right-1 " style={{ color: "#63E6BE" }} onClick={() => {
                    const link = import.meta.env.VITE_Backend + "/" + short_id;
                    copyLink(link)
                }}></i>
            </div>
            <div className='flex-1 border-2 relative xl:hidden'>
                <a className=' text-lime-300' href={import.meta.env.VITE_Backend + "/" + short_id} target="_blank">Short Link</a>
                <i className="fa-solid fa-copy p-1 px-3 text-sm bottom-0 cursor-pointer absolute -right-2 sm:right-1 " style={{ color: "#63E6BE" }} onClick={() => {
                    const link = import.meta.env.VITE_Backend + "/" + short_id;
                    copyLink(link)
                }}></i>
            </div>
            <div className='px-3 pr-6 sm:p-0 sm:w-40 lg:w-56 border-2 border-l-0 relative rounded-sm rounded-l-none'>
                <a href={url} target="_blank">Original URL</a>
                <i className="fa-solid fa-copy p-1 px-3 text-sm bottom-0 cursor-pointer absolute -right-2 sm:-right-1 " style={{ color: "#63E6BE" }} onClick={() => {
                    const link = url;
                    copyLink(link)
                }}></i>
            </div>
        </div>
    )
}

export default URL