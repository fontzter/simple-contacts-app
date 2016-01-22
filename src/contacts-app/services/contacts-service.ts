import {Injectable} from 'angular2/core';
import {Http, Headers} from 'angular2/http';
import 'rxjs/add/operator/map';
import {Store} from '@ngrx/store'


@Injectable()
export class ContactsService {
  selectedContact;
  contactGroups;
  sortedContactGroups;
  contacts;

  constructor(public http:Http, private store: Store<any>){
    this.contacts = store.select('contacts');
    this.contactGroups = this.contacts.map(contacts => this.groupContacts(contacts));
    this.selectedContact = store.select('selectedContact')
      .combineLatest(this.contacts, (id, contacts ) => {
        return contacts.find(contact => contact.id === id);
      });
  }

  loadContacts(firstLoad) {
    this.http
      .get('http://localhost:3000/people')
      .map((res)=> res.json())
      .subscribe(payload => this.store.dispatch({type: 'POPULATE_CONTACTS', payload}));
  }

  selectContact(id) {
    this.store.dispatch({type: 'SELECT_CONTACT', payload: id});
  }
  
  putContact(contact){
    this.http
      .put(
        'http://localhost:3000/people/' + contact.id,
        JSON.stringify(contact),
        {
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        })
      .map(res => res.json())
      .subscribe(payload => this.store.dispatch({type: 'UPDATE_CONTACT', payload}));
  }

  sortContactGroups(contactGroups) {
    return contactGroups.sort(function (a:any, b:any) {
      if (a.letter > b.letter) return 1;
      if (a.letter < b.letter) return -1;
      return 0;
    })
  }

  groupContacts(contacts) {
    return contacts.reduce((acc:any, curr:any)=> {
      const letter = curr.name.last.substr(0, 1);
      const i = acc.findIndex((elm:any)=> elm.letter === letter);

      if (i > -1) acc[i].contacts.push(curr);
      else acc.push({letter, contacts: [curr]});

      return acc;
    }, [])
  }
}
