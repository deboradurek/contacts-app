import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired,
  };

  state = {
    query: '',
  };

  // New state for query will be the actual query in the input minus any spaces
  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim(),
    }));
  };

  // Reset state and show all contacts again
  clearQuery = () => {
    this.updateQuery('');
  };

  render() {
    const { contacts, onDeleteContact } = this.props;
    const { query } = this.state;

    // New array after checking if form state is still empty
    const showingContacts =
      query === ''
        ? contacts
        : contacts.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));

    return (
      <div className="list-contacts">
        <div className="list-contacts-top">
          <input
            className="search-contacts"
            type="text"
            placeholder="Search Contacts"
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
          />
        </div>

        {showingContacts.length !== contacts.length && (
          <div className="showing-contacts">
            <span>
              Now showing {showingContacts.length} of {contacts.length}
            </span>
            <button onClick={this.clearQuery}>Show all</button>
          </div>
        )}

        <ol className="contact-list">
          {showingContacts.map((contact) => (
            <li key={contact.id} className="contact-list-item">
              <div
                className="contact-avatar"
                style={{ backgroundImage: `url(${contact.avatarURL})` }}
              ></div>
              <div className="contact-details">
                <p>{contact.name}</p>
                <p>{contact.handle}</p>
              </div>
              <button className="contact-remove" onClick={() => onDeleteContact(contact)}>
                Remove
              </button>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default ListContacts;
