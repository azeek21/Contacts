<template class="x">
        <v-sheet class="w-screen h-100">

        <v-form class="ma-auto pa-4" style="max-width: 800px;" @submit.prevent>

            <v-container class="my-3">
                <v-row class="justify-center mb-4" >
                    <v-avatar color="green" size="100" :image="contact?.photo">
                FL
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
      />

      <v-text-field
        v-model="contact.lastName"
        label="Last Name"
      />
      <v-text-field
        v-model="contact.number"
        label="Phone Number"
      />
      <v-text-field
        v-model="contact.email"
        type="email"
        label="Email"
      />

      <v-combobox
          v-model="contact.tags"
          :items="allTags"
          label="Tags"
          multiple
          variant="outlined"
          chips
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
</v-sheet>
</template>

<script setup lang="ts">

const allTags = ref(['family', 'friends', 'dogs'])
let tmp = useRoute().params.id;
let id = ref(0);

if (typeof tmp == "string") {
   id.value = Number(tmp);
} else if ( typeof tmp == "object") {
    if (tmp.length > 0) {
        id.value = Number(tmp[0]);
    }
}
const all = useContacts();
const contact = ref(all.value.find(x => x.id == id.value)!);
onUnmounted(() => {
    // save contact
})
</script>

<style>
.x {
    background-color: red;
}
</style>