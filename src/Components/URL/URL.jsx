import React from 'react'

const URL = (props) => {
    const { _id, name, url, short_id } = props.data
    console.log(name, _id, url, short_id)
    return (
        <div className='mt-6 flex gap-8 border-2'>
            <div>
                {name}
            </div>
            <div>
                {short_id}
            </div>
            <div className='hidden sm:inline'>
                {url}
            </div>
        </div>
    )
}

export default URL