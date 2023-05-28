<template>
  <div>
    <Header />

    <v-navigation-drawer v-model="drawer" temporary>
      <v-list>
        <v-list-item
          :title="$t('soon')"
          prepend-icon="mdi-information"
          value="x"
        />
        <v-list-item
          :title="$t('import')"
          prepend-icon="mdi-import"
          value="y"
        />
        <v-list-item
          :title="$t('export')"
          prepend-icon="mdi-export"
          value="z"
        />
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <ContactList />
    </v-main>

    <v-layout-item
      v-model="lay"
      class="d-flex justify-end align-end pa-10"
      position="bottom"
      style="pointer-events: none"
    >
      <v-btn
        icon="mdi-plus"
        elevation="5"
        color="secondary"
        size="x-large"
        style="pointer-events: all"
        :title="'Create contact'"
        @click="createContact"
      />
    </v-layout-item>
  </div>
</template>

<script setup lang="ts">
const drawer = useDrawer();
const lay = ref(true);
const contacts = useContacts();
const newContactId = ref(0);

const createContact = () => {
  const router = useRouter();
  const newId = useId();
  newId.value++;
  const id = newId.value;
  const newContact = {
    id,
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    photo: "",
    tags: [],
    selected: false,
  };

  if (!contacts.value) {
    contacts.value = [newContact];
  } else {
    contacts.value.push(newContact);
  }

  newContactId.value = id;
  router.push("/contacts/" + id);
};

watchEffect(() => {
  if (contacts && contacts.value && contacts.value.length > 0) {
    setContacts(contacts.value);
  }
});
onBeforeMount(() => {
  contacts.value = getContacts();
});
</script>
