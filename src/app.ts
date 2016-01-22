import {bootstrap} from 'angular2/platform/browser';
import {ContactsApp} from './contacts-app/contacts-app';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ContactsService} from './contacts-app/services/contacts-service';
import {contacts, selectedContact} from './contacts-app/reducers/contacts';

import {provideStore} from '@ngrx/store';
 
bootstrap(ContactsApp, [
  provideStore({contacts, selectedContact}),
  HTTP_PROVIDERS,
  ContactsService
 ]);
