<template class="x">
        <v-sheet class="w-screen h-100">

        <v-form class="ma-auto pa-4" style="max-width: 800px;" validate-on="input">

            <v-container class="my-3">
                <v-row class="justify-center mb-4" >
                    <v-avatar color="green" size="100" :image="contact?.photo">
            </v-avatar>
                </v-row>
                <v-row class="d-flex justify-center">
                    <v-col class="d-flex justify-end">
                        <v-btn prepend-icon="mdi-upload" rounded="lg">
                            New
                        </v-btn>
                    </v-col>
                    <v-col>
                        <v-btn rounded="lg">
                            Delete
                            <template v-slot:prepend>
                                <v-icon color="red">
                                    mdi-delete
                                </v-icon>
                            </template>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>

      <v-text-field
        v-model="contact.firstName"
        label="First name"
        prepend-inner-icon="mdi-account"
      />

      <v-text-field
        v-model="contact.lastName"
        label="Last Name"
        prepend-inner-icon="mdi-account"
      />
      <v-text-field
        v-model="contact.number"
        label="Phone Number"
        prepend-inner-icon="mdi-phone"
      />
      <v-text-field
        v-model="contact.email"
        type="email"
        aria-required="true"
        validate-on="blur"
        :rules="[]"
        label="Email"
        prepend-inner-icon="mdi-email"
      />

      <v-combobox
          v-model="contact.tags"
          :items="allTags"
          label="Tags"
          multiple
          variant="outlined"
          chips
          prepend-inner-icon="mdi-tag-multiple"
        ></v-combobox>
        <v-container>
            <v-row>
                <v-col> 
                    <v-btn class="w-100" block>
                        <template v-slot:prepend>
                                <v-icon color="red">
                                    mdi-delete
                                </v-icon>
                            </template>
                        Delete
                    </v-btn>
                </v-col>
                <v-col>
                    <v-btn block class="w-100" prepend-icon="mdi-content-save">Save</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>

    <v-dialog
      v-model="isDialogOpen"
      persistent
      width="auto"
    >
    <v-card title="Opsie wupsie..." text="You have not provided minimal inormation to create new contact. If you go back this contact will be deleted...">
        
    <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn variant="text" color="red" @click="() => {deleteAndExit = true; isDialogOpen = false}">
            Delete and exit
        </v-btn>
        
        <v-btn variant="text" color="green" @click="() => {deleteAndExit = false; isDialogOpen = false}">
            Contineu Editing
         </v-btn>


    </v-card-actions>

    </v-card>
    </v-dialog>
</v-sheet>
</template>

<script setup lang="ts">

const allTags = ref(['family', 'friends', 'dogs'])
let tmp = useRoute().params.id;
let id = ref(0);
const isDialogOpen = ref(false);
const deleteAndExit = ref(false);

if (typeof tmp == "string") {
   id.value = Number(tmp);
} else if ( typeof tmp == "object") {
    if (tmp.length > 0) {
        id.value = Number(tmp[0]);
    }
}
const all = useContacts();
const contact = ref(all.value.find(x => x.id == id.value)!);
const router = useRouter();

const valid = ref(false);
const removeEffect = router.beforeEach(() => {
    if (!validateContact(contact.value)) {
        isDialogOpen.value = true;
        return false;
    }
    return true;
})

watchEffect(() => {
    if (deleteAndExit.value == true) {
        console.log('eixt wanted, exiting ...')
        isDialogOpen.value = false;
        removeEffect();
        deleteContact(contact.value.id);
        router.replace('/');
    }
})

onUnmounted(() => {
    console.log('removing route hook');
    removeEffect()
})
</script>

<style>
.x {
    background-color: red;
}
</style>