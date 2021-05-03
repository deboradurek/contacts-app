import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';
import { Route } from 'react-router-dom';

class App extends Component {
  state = {
    contacts: [],
  };


  };

  // Remove a contact from the list
  removeContact = (contact) => {
    this.setState((currentState) => ({
      contacts: currentState.contacts.filter((c) => {
        return c.id !== contact.id;
      }),
    }));

  };

  render() {
    return (
      <div>
        <Route
          exact
          path="/"
          render={() => (
            <ListContacts contacts={this.state.contacts} onDeleteContact={this.removeContact} />
          )}
        />
        <Route
          path="/create"
          render={({ history }) => (
            <CreateContact
              onCreateContact={(contact) => {
                this.createContact(contact);
                history.push('/');
              }}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
