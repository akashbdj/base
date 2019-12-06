import React from 'react'
import RequestBox from '../RequestBox/RequestBox'
import ApprovalBox from '../ApprovalBox/ApprovalBox'
import './Card.scss'

export default function Card({ data }) {
    let {
        id,
        service = {},
        description,
        approvers = [],
        ...rest
    } = data

    return (
        <div className="card">
            <Title
                id={id}
                service={service}
                description={description}
            />
            <div className="card__content card__content--60-40">
                <RequestBox {...rest} description={description} service={service} />
                <ApprovalBox approvers={approvers} />
            </div>
        </div>
    )
}

function Title({ id, service, description }) {
    let desc = description + (!id ? "" : ` (#${id})`)
    let { name, website, logo } = service

    // TODO: ask if description/name, website and logo inside
    // service can be null. In that we can it handle here.
    return (
        <div className="card__title card__title--bolder pad-15 display-flex align-items-center">
            <a href={website} target="_blank">
                <img width='45' src={logo} alt={name} />
            </a>
            <span>{desc}</span>
        </div>
    )
}