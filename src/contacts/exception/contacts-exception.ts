import { BaseException } from '../../shared/exception/base-exception';

export interface ContactsCreateException extends BaseException {
  emailAddress?: string;
}

export type ContactsException = ContactsCreateException;
