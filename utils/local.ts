import { Tcontact } from "~/types";

const getContacts = () => {
  let contacts: Tcontact[] = [];
  const cached = localStorage.getItem("contacts");
  if (cached) {
    contacts = JSON.parse(cached);
  }
  return contacts;
};

const setContacts = (contacts: Tcontact[] | null) => {
  if (!contacts) {
    return;
  }

  localStorage.setItem("contacts", JSON.stringify(contacts));
};

const getContact = (id: number) => {
  const all = useContacts();
  if (!all.value || all.value.length === 0) {
    all.value = getContacts();
  }
  if (all.value.length === 0) {
    return null;
  }
  return all.value.find((contact) => contact.id === id) || null;
};

const updateContact = (contact: Tcontact | null) => {
  if (!contact) {
    return;
  }

  const all = useContacts();

  if (!all.value) {
    return;
  }

  setContacts([...all.value.filter((c) => c.id !== contact.id), contact]);
};

const loadDemoData = () => {
  console.log("updating contacts");
  const contacts = useContacts();
  contacts.value = demoContacts;
  localStorage.setItem("contacts", JSON.stringify(demoContacts));
};

const demoContacts: Tcontact[] = [
  {
    id: 1,
    firstName: "Abdulaziz",
    lastName: "Askaraliev",
    email: "pymanuz@gmail.com",
    photo: "https://avatars.githubusercontent.com/u/91887882?v=4",
    number: "+79032120900",
    tags: ["owner", "family"],
    selected: false,
  },
  {
    id: 2,
    firstName: "Azeek",
    lastName: "",
    email: "",
    photo:
      "https://pbs.twimg.com/profile_images/1398198122854166532/dRMq0r_0_400x400.jpg",
    number: "+123456789",
    tags: [],
    selected: false,
  },
  {
    id: 3,
    firstName: "Jo",
    lastName: "Mama",
    email: "",
    photo: "",
    number: "+998912345678",
    tags: ["other", "unknown"],
    selected: false,
  },
  {
    id: 4,
    firstName: "Bexzod",
    lastName: "",
    email: "",
    photo: "",
    number: "+79031234567",
    tags: ["friends"],
    selected: false,
  },
  {
    id: 5,
    firstName: "Dead",
    lastName: "Aydin",
    email: "",
    photo: "https://cdn.anisearch.com/images/character/cover/68/68716_300.webp",
    number: "+20200923",
    tags: ["family"],
    selected: false,
  },
  {
    id: 6,
    firstName: "LAM431",
    lastName: "Q2FycnkgT24",
    email: "",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/e/ee/Xxxtentacion_%28cropped%29.jpg",
    number: "+061818",
    tags: ["singer"],
    selected: false,
  },
  {
    id: 7,
    firstName: "You",
    lastName: "Tester",
    email: "example@example.com",
    photo: "",
    number: "+123456789",
    tags: ["tester"],
    selected: false,
  },
];

const sortedContacts = (contacts: Tcontact[] | null) => {
  if (!contacts) {
    return null;
  }
  const sortedContacts = [...contacts].sort((c1, c2) => {
    const n1 = c1.firstName + c1.lastName;
    const n2 = c2.firstName + c2.lastName;
    if (n1 > n2) {
      return 1;
    } else if (n1 < n2) {
      return -1;
    }
    return 0;
  });

  return sortedContacts;
};

const filterByTags = (contacts: Tcontact[] | null) => {
  if (!contacts) {
    return null;
  }
  const selectedTagsIndexes = useSelectedTags();
  if (selectedTagsIndexes.value.length === 0) {
    return contacts;
  }
  const tags = useTags();
  const filterWith = selectedTagsIndexes.value.map((i) => tags.value[i]);
  const filteredContacts = contacts.filter((contact) => {
    for (let i = 0; i < filterWith.length; i++) {
      if (contact.tags.includes(filterWith[i])) {
        return true;
      }
    }
    return false;
  });
  return filteredContacts;
};

export {
  getContacts,
  setContacts,
  getContact,
  updateContact,
  loadDemoData,
  sortedContacts,
  filterByTags,
};
