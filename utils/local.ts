import { Tcontact } from "~/types"

const getContacts = () => {
    let contacts: Tcontact[] = [];
    const cached = localStorage.getItem('contacts');
    if (cached) {
        contacts = JSON.parse(cached);
    }
    return contacts;
}

const setContacts = (contacts: Tcontact[]) => {
    console.log('setting contacts...', contacts);
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

const getContact = (id: number) => {
    const all = useContacts();
    if (!all.value || all.value.length == 0) {
        all.value = getContacts();
    }
    if (all.value.length == 0)  {
        return null;
    }
    return all.value.find(contact => contact.id == id) || null;
}

const updateContact = (contact: Tcontact | null) => {
    if (!contact) {
        return ;
    }
    const all = useContacts();
    all.value = [...all.value.filter(c => c.id != contact.id), contact];
    setContacts(all.value);
}

const loadDemoData = () => {
    const contacts = useContacts();
    contacts.value = demoContacts;
    localStorage.setItem('contacts', JSON.stringify(demoContacts));
}

const demoContacts: Tcontact[] = [
    {
        id: 1,
        firstName: 'Abdulaziz',
        lastName: 'Askaraliev',
        email: 'pymanuz@gmail.com',
        photo: 'https://avatars.githubusercontent.com/u/91887882?v=4',
        number: '+79032120900',
        tags: ['owner', 'family'],
        selected: false,
    },
    {
        id: 2,
        firstName: 'Azeek',
        lastName: '',
        email: '',
        photo: 'https://pbs.twimg.com/profile_images/1398198122854166532/dRMq0r_0_400x400.jpg',
        number: '+123456789',
        tags: [],
        selected: false,
    },
    {
        id: 3,
        firstName: 'Aydin',
        lastName: '6',
        email: '',
        photo: '',
        number: '+998912345678',
        tags: [],
        selected: false,
    },
    {
        id: 4,
        firstName: 'Bexzod',
        lastName: '',
        email: '',
        photo: '',
        number: '+79031234567',
        tags: ['friends'],
        selected: false,
    },
    {
        id: 5,
        firstName: 'Nemontador',
        lastName: '',
        email: '',
        photo: '',
        number: '+79235465443',
        tags: ['other', 'unknown'],
        selected: false,
    },
    {
        id: 6,
        firstName: "Dead",
        lastName: '',
        email: "",
        photo: 'https://cdn.anisearch.com/images/character/cover/68/68716_300.webp',
        number: "+20200923",
        tags: ['family'],
        selected: false,
    },
    {
        id: 7,
        firstName: "LAM431",
        lastName: 'Q2FycnkgT24',
        email: "",
        photo: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Xxxtentacion_%28cropped%29.jpg',
        number: "+061818",
        tags: ['singer'],
        selected: false,
    },

]



export {getContacts, setContacts, getContact, updateContact, loadDemoData};