import { Tcontact } from "~/types";

const validateContact = (contact: Tcontact | null) => {
  if (!contact) {
    return false;
  }

  if (!contact.firstName.trim() && !contact.lastName.trim()) {
    return false;
  }

  if (!contact.number.trim() && !contact.email.trim()) {
    return false;
  }

  return true;
};

const deleteContact = (id: number) => {
  const contacts = useContacts();
  if (!contacts.value) {
    return;
  }

  contacts.value = contacts.value.filter((contact) => contact.id !== id);
  setContacts(contacts.value);
};

const search = (source: string, searchTerm: string) => {
  if (!searchTerm || searchTerm.length < 2) {
    return source;
  }

  const tmp = source.toLocaleLowerCase();
  const startsAt = tmp.indexOf(searchTerm.toLocaleLowerCase());

  if (startsAt === -1) {
    return source;
  }

  const slice = source.slice(startsAt, startsAt + searchTerm.length);
  return source.replace(slice, `<span class='red'>${slice}</span>`);
};

const insensitiveIncludes = (src: string, searchTerm: string) => {
  return src.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
};

export { validateContact, deleteContact, search, insensitiveIncludes };
