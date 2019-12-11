import { Routes } from 'nest-router';

import { ContactsModule } from './contacts/contacts.module';

export const routes: Routes = [
  {
    module: ContactsModule,
    path: '/api/contacts'
  }
];
