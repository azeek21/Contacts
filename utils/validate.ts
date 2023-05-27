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

const search = (source: string, term: string) => {
  if (!term || term.length < 2) {
    return source;
  }

  if (!source.includes(term)) {
    return source;
  }
  return source.replaceAll(term, `<span class='red'>${term}</span>`);
};

export { validateContact, deleteContact, search };
