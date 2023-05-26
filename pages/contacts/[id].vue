<template>
  <v-sheet class="w-screen h-100">
    <v-skeleton-loader
      v-if="contact == null"
      class="ma-auto mt-10"
      max-width="800"
      type="avatar, divider, heading, divider, heading, divider, heading, divider, heading, divider, heading,divider, heading, actions"
    >
    </v-skeleton-loader>

    <client-only>
      <v-form
        v-if="contact"
        class="ma-auto pa-4"
        style="max-width: 800px"
        validate-on="input"
      >
        <v-container class="my-3">
          <v-row class="justify-center mb-4">
            <v-avatar
              color="green-darken-3"
              size="100"
              :image="contact?.photo"
              @click="isPfpSelectOpen = true"
            >
              {{ contact.firstName[0] }}{{ contact.lastName[0] }}
            </v-avatar>
            <v-dialog v-model="isPfpSelectOpen" max-width="800">
              <v-card class="pa-10" variant="elevated">
                <v-text-field
                  v-model="pfpUrl"
                  label="Picture Url"
                  type="url"
                  placeholder="Only urls supported for now"
                  hint="Desn't support file uploads yet. Plase paste image url"
                >
                </v-text-field>
                <v-card-actions>
                  <v-btn
                    class="ml-auto"
                    variant="outlined"
                    @click="isPfpSelectOpen = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    class=""
                    color="green"
                    variant="outlined"
                    @click="setPfp"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
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
              <v-btn class="w-100" block @click="deleteAndExit">
                <template #prepend>
                  <v-icon color="red"> mdi-delete </v-icon>
                </template>
                Delete
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                block
                class="w-100"
                prepend-icon="mdi-content-save"
                @click="saveContact"
              >
                Save
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </client-only>

    <v-dialog v-model="isDialogOpen" persistent width="auto">
      <v-card
        title="Opsie wupsie..."
        text="You have not provided minimal inormation to create new contact. If you go back this contact will be deleted..."
      >
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn variant="text" color="red" @click="deleteAndExit">
            Delete and exit
          </v-btn>

          <v-btn variant="text" color="green" @click="isDialogOpen = false">
            Contineu Editing
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="isSnackbarOpen" :timeout="1000">
      {{ snackbarMessage }}
    </v-snackbar>
  </v-sheet>
</template>

<script setup lang="ts">
import { VSkeletonLoader } from "vuetify/lib/labs/components.mjs";
import { Tcontact } from "~/types";
const router = useRouter();
const route = useRoute();
const id = Number(route.params.id!);
const contact = ref<Tcontact | null>(null);
console.log("contact: ", contact.value);
const isDialogOpen = ref(false);
const isSnackbarOpen = ref(false);
const snackbarMessage = ref("Hii");
const isPfpSelectOpen = ref(false);
const pfpUrl = ref("");

onBeforeMount(() => {
  console.log("before mount ...");
  contact.value = getContact(id);
});

const deleteAndExit = () => {
  snackbarMessage.value = "Contact deleted, leaving ...";
  isSnackbarOpen.value = true;
  removeGuard();
  stopAutoSave();
  isDialogOpen.value = false;
  deleteContact(id);

  setTimeout(() => {
    router.replace("/");
  }, 1000);
};

const saveContact = () => {
  if (validateContact(contact.value)) {
    updateContact(contact.value);
    snackbarMessage.value = "Contact saved...";
  } else {
    snackbarMessage.value = "Can not save. Invalid contact!";
  }
  isSnackbarOpen.value = true;
};

const setPfp = () => {
  isPfpSelectOpen.value = false;
  if (contact && contact.value) {
    contact.value.photo = pfpUrl.value;
    pfpUrl.value = "";
  }
};

const removeGuard = router.beforeEach(() => {
  if (!validateContact(contact.value)) {
    isDialogOpen.value = true;
    return false;
  }
});

const stopAutoSave = watchEffect(() => {
  if (process.client) {
    updateContact(contact.value);
  }
});
</script>

<style></style>
