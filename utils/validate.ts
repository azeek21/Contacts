import { Tcontact } from "~/types";

const validateContact = (contact: Tcontact) => {
    if (!contact.firstName.trim() && !contact.lastName.trim()) {
        return false;
    };

    if (!contact.number.trim() && !contact.email.trim()) {
        return false;
    }

    return true;
}

const deleteContact = (id: number) => {
    const contacts = useContacts();
    contacts.value = contacts.value.filter(contact => contact.id != id);
}

export  {validateContact, deleteContact};