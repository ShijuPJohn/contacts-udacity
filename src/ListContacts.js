import React from 'react'

function ListContacts(props){
    const contacts = props.contacts
    return(
        <ol className={'contact_list'}>
            {contacts.map(item => <li key={item.id} className={'contact-list-item'}>
                <div className={'contact-avatar'} style={{
                    backgroundImage: `url(${item.avatarURL})`
                }}>
                </div>
                <div className={'contact-details'}>
                    <p>{item.name}</p>
                    <p>{item.handle}</p>
                </div>
                <button className={'contact-remove'}>Remove</button>
            </li>)}
        </ol>
    )
}

export default ListContacts