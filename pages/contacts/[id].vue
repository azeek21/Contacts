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
                  :label="$t('img-select-label')"
                  type="url"
                  :placeholder="$t('img-select-placeholder')"
                  :hint="$t('img-select-hint')"
                >
                </v-text-field>
                <v-card-actions>
                  <v-btn
                    class="ml-auto"
                    variant="outlined"
                    @click="isPfpSelectOpen = false"
                  >
                    {{ $t("cancel") }}
                  </v-btn>
                  <v-btn
                    class=""
                    color="green"
                    variant="outlined"
                    @click="setPfp"
                  >
                    {{ $t("save") }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </v-container>

        <v-text-field
          v-model="contact.firstName"
          :label="$t('first-name')"
          prepend-inner-icon="mdi-account"
        />

        <v-text-field
          v-model="contact.lastName"
          :label="$t('last-name')"
          prepend-inner-icon="mdi-account"
        />
        <v-text-field
          v-model="contact.number"
          :label="$t('number')"
          prepend-inner-icon="mdi-phone"
        />
        <v-text-field
          v-model="contact.email"
          type="email"
          aria-required="true"
          validate-on="blur"
          :rules="[]"
          :label="$t('email')"
          prepend-inner-icon="mdi-email"
        />

        <v-combobox
          v-model="contact.tags"
          :items="allTags"
          :label="$t('tags')"
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
                {{ $t("delete") }}
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                block
                class="w-100"
                prepend-icon="mdi-content-save"
                @click="saveContact"
              >
                {{ $t("save") }}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </client-only>

    <v-dialog v-model="isDialogOpen" persistent width="auto">
      <v-card :title="$t('oops')" :text="$t('no-enough-data-to-save')">
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn variant="text" color="red" @click="deleteAndExit">
            {{ $t("delete-exit") }}
          </v-btn>

          <v-btn variant="text" color="green" @click="isDialogOpen = false">
            {{ $t("continue-editing") }}
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
import { useI18n } from "vue-i18n";
import { VSkeletonLoader } from "vuetify/lib/labs/components.mjs";
import { Tcontact } from "~/types";
const router = useRouter();
const route = useRoute();
const id = Number(route.params.id!);
const contact = ref<Tcontact | null>(null);
const isDialogOpen = ref(false);
const isSnackbarOpen = ref(false);
const snackbarMessage = ref("Hii");
const isPfpSelectOpen = ref(false);
const pfpUrl = ref("");
const allTags = useTags();
const { t } = useI18n();

onBeforeMount(() => {
  contact.value = getContact(id);
  if (!contact.value) {
    removeGuard();
    stopAutoSave();
    router.replace("/");
  }
});

const deleteAndExit = () => {
  snackbarMessage.value = t("contact-deleted");
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
    snackbarMessage.value = t("contact-saved");
  } else {
    snackbarMessage.value = t("save-error");
  }
  isSnackbarOpen.value = true;
};

const setPfp = () => {
  if (contact && contact.value) {
    contact.value.photo = pfpUrl.value;
    pfpUrl.value = "";
  }
  isPfpSelectOpen.value = false;
};

const removeGuard = router.beforeEach(() => {
  if (!validateContact(contact.value)) {
    isDialogOpen.value = true;
    return false;
  }
});
const stopAutoSave = watchEffect(() => {
  updateContact(contact.value);
});
</script>

<style></style>
