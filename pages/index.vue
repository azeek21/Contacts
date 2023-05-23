<template>
    <Header />

    <v-navigation-drawer
        v-model="drawer"
        temporary
      >
      <v-list>
        <v-list-item title="Item" prepend-icon="mdi-home" value="x"/>
        <v-list-item title="Item2" prepend-icon="mdi-car" value="y"/>
        <v-list-item title="Item2" prepend-icon="mdi-baby" value="z"/>
      </v-list>
    </v-navigation-drawer>

    <v-main>
        <ContactList />
    </v-main>

    <v-layout-item class="d-flex justify-end align-end pa-10" position="bottom" v-model="lay" style="pointer-events: none;">
            <v-btn
                icon="mdi-plus" 
                elevation="5" 
                color="secondary" 
                size="x-large" 
                style="pointer-events: all;"
                @click="createContact"
            />
    </v-layout-item>
</template>

<script setup lang="ts">
const drawer = useDrawer();
const lay = ref(true);
const contacts = useContacts();
const newContactId = ref(0);

const createContact = () => {
    const router = useRouter()
    const id = contacts.value[contacts.value.length - 1].id + 1;
    const newContact = {
        id: id,
        firstName: "",
        lastName: "",
        email: "",
        number: "",
        photo: "",
        tags: [],
        selected: false,
    }
    contacts.value.push(newContact);
    newContactId.value = id;
    router.push('/contacts/' + id);
}

</script>