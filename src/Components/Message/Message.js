import React from 'react'

import './Message.scss'

export default function Message(props) {
    return (
        <div className='security-message'>
            <span className='text-yellow'><img src='./lock.svg' alt="Security Message" />&nbsp; Security Message</span>&nbsp;
            <p className='text-gray'>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus.</p>
        </div>
    )
}