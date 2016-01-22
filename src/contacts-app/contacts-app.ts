import {Component, ChangeDetectionStrategy} from 'angular2/core';
import {ContactList} from './components/contact-list';
import {ContactDetails} from './components/contact-details';
import {ContactsService} from './services/contacts-service';
import {Store} from '@ngrx/store';

@Component({
    selector: 'contacts-app',
    directives: [ContactList, ContactDetails],
    template: `
<style>
  contact-list {
    display: flex;
    width: 40%;
    background-color: #EDF4F7;
    padding: 10px;
    overflow-y: hidden;
    flex-direction: column;

  }
  contact-details {
    display: flex;
    flex-direction: column;
    width: 60%;
    overflow-y: auto;
  }
</style>


<main class="app">

  <contact-list
    [contactGroups]="contactService.contactGroups | async"
    (select)="contactService.selectContact($event)"
  ></contact-list>

  <contact-details
    *ngIf="contactService.selectedContact | async"
    [contact]="contactService.selectedContact | async"
    (submit)="contactService.putContact($event)"
    >
  </contact-details>

</main>
`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsApp{
  constructor(public contactService:ContactsService){
    contactService.loadContacts(true);
    contactService.contactGroups.subscribe(v => console.log(v))
  }
}

