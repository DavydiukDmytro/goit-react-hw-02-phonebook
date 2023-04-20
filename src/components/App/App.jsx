import { Component } from 'react';
import { ContactList } from 'components/ContactList';
import { Form } from 'components/Form';
import { Filter } from 'components/Filter';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { array } from 'prop-types';
import { Container, TitleH1, TitleH2 } from './App.styled';

export class App extends Component {
  initState = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  state = { ...this.initState };

  addContact = newContact => {
    const isContact = this.state.contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (isContact) {
      Notify.warning(`${isContact.name} is contacts.`, {
        position: 'center-top',
      });
      return;
    }
    this.setState(state => ({
      contacts: [...state.contacts, newContact],
    }));
  };

  handleChangeValueInState = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  };

  deleteContact = id => {
    const index = this.state.contacts.findIndex(contact => contact.id === id);
    if (index !== -1) {
      array = this.state.contacts;
      array.splice(index, 1);
      this.setState(state => ({
        contacts: [...array],
      }));
    }
  };

  render() {
    const { contacts, filter } = this.state;
    const { addContact, handleChangeValueInState, deleteContact } = this;
    return (
      <Container>
        <TitleH1>Phonebook</TitleH1>
        <Form onSubmitAdd={addContact} />
        <Filter filter={filter} onKeyClick={handleChangeValueInState} />
        <TitleH2>Contacts</TitleH2>
        <ContactList
          onDelete={deleteContact}
          contactArr={contacts.filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase())
          )}
        />
      </Container>
    );
  }
}
