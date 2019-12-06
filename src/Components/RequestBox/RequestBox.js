import React, { Fragment } from 'react'
import { getFullName } from '../../helpers'

import './RequestBox.scss'

export default function RequestBox(props) {
    return (
        <Fragment>
            <div className='request'>
                <div className="request__details">
                    <Requester {...props} />
                    <Cost {...props} />
                    <Renewal {...props} />
                    <ExpenseAccount {...props} />
                    <Files {...props} />
                    <Description {...props} />
                </div>
                <Meta {...props} />
            </div>
            <div className="actions">
                <Button type='success' title="Approve" />
                <Button type='error' title="Deny" />
            </div>
        </Fragment>
    )
}

function Requester({ requested_by = {} }) {
    return (
        <div className="split pad-15 border-btm">
            <label>Requested by</label>
            <div className="display-flex align-items-center">
                <img src="./shawn.png" width="24" alt="Requester" />
                <span className="margin-left-10">{getFullName(requested_by)}</span>
            </div>
        </div>
    )
}

function Cost(props) {
    let { cost = 0 } = props
    return (
        <div className="split pad-15 border-btm">
            <label>Cost</label>
            <div>${cost}</div>
        </div>
    )
}

function Renewal({ renewal_frequency_in_months: frequency, cost }) {
    cost = cost || 0
    return (
        <div className="split-half border-btm">
            <div>
                <label>Renewal frequency</label>
                <span className='text-right'>{frequency} month</span>
            </div>
            <div>
                <label>Annual Cost</label>
                <span>${cost * 12}</span>
            </div>
        </div>
    )
}

function ExpenseAccount({ expense_account = "" }) {
    return (
        <div className="split pad-15 border-btm">
            <label>Expense Account</label>
            <div>{expense_account}</div>
        </div>
    )
}

function Description({ description }) {
    return (
        <div className="split pad-15 border-btm" id="desc">
            <label>Description</label>
            <div>{description}</div>
        </div>
    )
}

function Meta(props) {
    let {
        renewal_frequency_in_months: frequency,
        service: { usage_count, name } = {}
    } = props


    // I couldn't find any information related to this in RESPONSE
    // So I used "usage_count" and "frequency" to figure out if the client
    // already has a recurring account.
    // Also, "John Smith" info is unclear.
    return (
        <div className='meta-data'>
            {
                frequency > 0
                    ? <div className="note"> Your company is already paying for {name} on a recurring basis.</div>
                    : null
            }
            <div className="info">({usage_count} instances is owned by John Smith).</div>
        </div>
    )
}

function Files({ files = [] }) {
    return (
        <div className="split pad-15 border-btm">
            <label>File</label>
            <div className="file-container">
                {files.map((f, idx) => <File key={idx} src={f} />)}
            </div>
        </div>
    )
}

function File({ src }) {
    return (
        <div className="display-flex align-items-center">
            <img width="16px" src={src} alt="File logo" />
            {/* No fileName was provided in the response */}
            <span className="margin-left-10">Receipt-Github-Nov.xls</span>
        </div>
    )
}

function Button({ title, type }) {
    return (
        <button className={`btn btn--${type}`}>{title}</button>
    )
}

