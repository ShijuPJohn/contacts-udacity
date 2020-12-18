import React, {Component} from 'react';
import ListContacts from "./ListContacts";
import * as ContactsAPI from './utils/ContactsAPI'
import CreateContact from "./CreateContact";
import {Route} from "react-router-dom";


class App extends Component {

    state = {
        contacts: []
    }

    componentDidMount() {
        ContactsAPI.getAll().then((contacts) => {
            this.setState((prevState) => ({
                contacts: contacts
            }))
        })
    }

    removeContact = (contact) => {
        ContactsAPI.remove(contact)
        this.setState(prevState => ({
            contacts: prevState.contacts.filter(c => {
                return c.id !== contact.id
            })
        }))

    }

    createContactFunction(data) {
        ContactsAPI.create(data).then((contact) => {
            this.setState((prevState) => ({
                contacts: prevState.contacts.concat([contact])
            }))
        })
    }

    render() {
        return (
            <div>
                <Route path={'/create'} exact
                       render={({history}) => <CreateContact onCreateContact={(contact) => {
                           this.createContactFunction(contact)
                           history.push('/')
                       }}/>}/>
                <Route path={'/'} exact render={() => (
                    <ListContacts onDeleteFunction={this.removeContact} contacts={this.state.contacts}/>
                )}/>

            </div>
        );
    }
}

export default App;
