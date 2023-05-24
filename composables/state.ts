import { Tcontact } from "~/types";

export const useDrawer = () => useState('drawer', () => false);
export const useContacts = () => useState<Tcontact[]>('contacts', () => {
    return [];
})
export const useId = () => useState('id', () => {
    const contacts = useContacts();
    if (contacts.value.length > 0) {
        return contacts.value.length + 10;
    };
    return 0;
});
export const useTags = () => useState('tags', () => {
    return ['family', 'owner', 'other', 'unknown', 'friends', 'singer']
})