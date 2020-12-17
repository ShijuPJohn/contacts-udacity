import React, {Component} from 'react'
import PropTypes from "prop-types";

class ListContacts extends Component {
    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteFunction: PropTypes.func.isRequired,
    }
    state = {
        query: '',
    }

    updateQuery(value) {
        this.setState((previousState) => ({
            query: value.trim(),
        }))
    }

    clearQuery() {
        this.updateQuery('')
    }

    render() {
        const {contacts, onDeleteFunction} = this.props
        const {query} = this.state

        const displayContacts = contacts.filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
        return (
            <div>
                <div className={'list-contacts-top'}>
                    <input className={'search-contacts'}
                           type={'text'}
                           placeholder={'Search Contacts'}
                           value={query}
                           onChange={(event => this.updateQuery(event.target.value))}
                    />

                </div>
                <div style={{
                    height: "10vh"
                }}>

                </div>
                {query.length !== 0 &&
                <div className={'showing-contacts'}>
                    <span>
                        Showing {displayContacts.length} of {contacts.length} contacts
                    </span>
                    <button onClick={this.clearQuery.bind(this)}>
                        Clear
                    </button>
                </div>
                }

                <ol className={'contact_list'}>
                    {displayContacts.map(item => <li key={item.id} className={'contact-list-item'}>
                        <div className={'contact-avatar'} style={{
                            backgroundImage: `url(${item.avatarURL})`
                        }}>
                        </div>
                        <div className={'contact-details'}>
                            <p>{item.name}</p>
                            <p>{item.handle}</p>
                        </div>
                        <button className={'contact-remove'} onClick={() => {
                            onDeleteFunction(item)
                        }}>Remove
                        </button>
                    </li>)}
                </ol>

            </div>

        )
    }
}


export default ListContacts