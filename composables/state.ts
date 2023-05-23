export const useDrawer = () => useState('drawer', () => false);
export const useContacts = () => useState('contacts', () => {
    return [
        {
            id: 1,
            firstName: 'Azeek', 
            lastName: 'Askaraliev',
            number: '+79032120900',
            tags: ['friends', 'family'],
            photo: 'https://avatars.githubusercontent.com/u/91887882?v=4',
            email: "pymanuz@gmail.com",
            selected: false
        },
        {
            id: 2,
            firstName: 'Azeek', 
            lastName: 'Askaraliev',
            number: '+79032120900',
            tags: ['friends', 'family'],
            photo: '',
            email: "pymanuz@gmail.com",
            selected: false

        },
        {
            id: 3,
            firstName: 'Azeek', 
            lastName: 'Askaraliev',
            number: '+79032120900',
            tags: ['friends', 'family'],
            photo: 'https://avatars.githubusercontent.com/u/91887882?v=4',
            email: "pymanuz@gmail.com",
            selected: false

        },
        {
            id: 4,
            firstName: 'Azeek', 
            lastName: 'Askaraliev',
            number: '+79032120900',
            tags: ['friends', 'family'],
            photo: 'https://avatars.githubusercontent.com/u/91887882?v=4',
            email: "pymanuz@gmail.com",
            selected: false

        },
        {
            id: 5,
            firstName: 'Azeek', 
            lastName: 'Askaraliev',
            number: '+79032120900',
            tags: ['friends', 'family'],
            photo: 'https://avatars.githubusercontent.com/u/91887882?v=4',
            email: "pymanuz@gmail.com",
            selected: false

        },
        {
            id: 6,
            firstName: 'Azeek', 
            lastName: 'Askaraliev',
            number: '+79032120900',
            tags: ['friends', 'family'],
            photo: 'https://avatars.githubusercontent.com/u/91887882?v=4',
            email: "pymanuz@gmail.com",
            selected: false

        },
    ]
})