import React from 'react'
import { getFullName, getDate } from '../../helpers'
import './ApprovalBox.scss'

const ACCEPTED = "accepted"
const getAllAccepted = (approvers) => approvers.filter(a => a.status === ACCEPTED)
const getAllPending = (approvers) => approvers.filter(a => a.status !== ACCEPTED)

// NOTE: I couldn't figure out what "status: created" means.
// So I'm using "accepted" for people who have "approved" the request
// and, I'm ignoring "created" so all the people with status other than
// "accepted" will be considered as "pending" for approval.

export default function ApprovalBox({ approvers }) {
    let accepted = getAllAccepted(approvers)
    let pendings = getAllPending(approvers)
    return (
        <div className="approval pad-15">
            <Approved accepted={accepted} />
            <Pending pendings={pendings} />
        </div>
    )
}

function Approved({ accepted }) {
    let isEmpty = accepted.length === 0
    return (
        <div className="approved border-btm">
            <span className='font-500'>Approved</span>
            {!isEmpty ? renderList(accepted) : <div className="no-approved">No Approvals yet!</div>}
        </div>
    )
}

function Pending({ pendings }) {
    let isEmpty = pendings.length === 0
    return (
        <div className="pending">
            <span className='font-500'>Pending</span>
            {!isEmpty ? renderList(pendings) : <div className="no-pending">No Pending requests!</div>}
        </div>
    )
}

function renderList(list) {
    return list.map((acpt, idx) => {
        return (
            <Item
                key={idx} // It's better to use something unique like uuid.
                counter={idx + 1}
                checked={acpt.status === ACCEPTED}
                uniqueId={acpt.approver.email} // this one is use for checkBoxes
                {...acpt}
            />
        )
    })
}

function Item({ last_updated_date: timeStamp, ...rest }) {
    return (
        <div className="approver">
            <Counter {...rest} />
            <Avatar {...rest} />
            <UserDetail {...rest} timeStamp={timeStamp} /> {/* I was expecting "approvedTime" in response"  */}
            <CheckBox {...rest} />
        </div>
    )
}

function Counter({ counter }) {
    return (
        <div className="counter">
            <div>{counter}</div>
        </div>
    )
}

function Avatar({ approver }) {
    return (
        <div className="avatar">
            <img src={approver.profile_picture} width="24px" height="24px" alt={getFullName(approver)} />
        </div>
    )
}

function UserDetail({ approver, timeStamp }) {
    return (
        <div className="user-detail">
            <div>
                <span className='user-detail__name'>{getFullName(approver)}</span>
                {renderEmail(approver.email)}
            </div>
            <p className="text-gray meta-info">Approved {getDate(timeStamp)}</p>
        </div>
    )
}

// TODO: What happens when you click on the checkbox?
// Further interactions to explored "onClick" of the checkbox
// Since this component is not used anywhere else, i'm keeping it 
// in this file only.
function CheckBox({ checked, uniqueId }) {
    return (
        <div className="status">
            <input type="checkbox" defaultChecked={checked} className="checkbox-round" id={`checked-${uniqueId}`} />
            <label htmlFor={`checked-${uniqueId}`}></label>
        </div>
    )
}

export const renderEmail = (email) => {
    if (!email) return null
    return <span className="text-gray user-detail__meta-info font-400">({email})</span>
}