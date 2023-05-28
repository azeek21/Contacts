<template>
  <v-app-bar app scroll-behavior="elevate">
    <v-btn icon="mdi-menu" @click="changeDrawer"> </v-btn>
    <v-text-field
      v-model="searchText"
      :label="$t('search')"
      style="min-width: 150px"
      hide-details
      density="compact"
      single-line
      variant="outlined"
      color="green"
      prepend-inner-icon="mdi-magnify"
    >
    </v-text-field>

    <v-form class="mx-2">
      <v-select
        v-model="locale"
        :label="$t('language')"
        prepend-inner-icon="mdi-translate"
        :items="['en', 'ru', 'uz']"
        variant="solo"
        hide-details
        single-line
        density="compact"
      ></v-select>
    </v-form>

    <v-btn
      class="mx-2"
      prepend-icon="mdi-wrench"
      :title="$t('demoTitle')"
      color="yellow"
      variant="elevated"
      :loading="isDialogOpen"
      @click="demoModeHandler"
    >
      {{ $t("demo") }}
    </v-btn>
  </v-app-bar>

  <!-- <v-toolbar title="Hii"> </v-toolbar> -->

  <v-dialog v-model="isDialogOpen" persistent width="auto">
    <v-card :title="$t('warning')" :text="$t('demoMessage')">
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          variant="outlined"
          color="yellow"
          @click="
            () => {
              loadDemoData();
              isDialogOpen = false;
            }
          "
        >
          {{ $t("switch") }}
        </v-btn>

        <v-btn variant="outlined" color="green" @click="isDialogOpen = false">
          {{ $t("cancel") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const drawer = useDrawer();
const changeDrawer = () => (drawer.value = !drawer.value);
const isDialogOpen = ref(false);
const searchText = useSearchText();
const { locale } = useI18n();
const demoModeHandler = () => {
  const contacts = useContacts();
  if (contacts && contacts.value && contacts.value.length > 0) {
    isDialogOpen.value = true;
  } else {
    loadDemoData();
  }
};

watch(locale, () => {
  localStorage.setItem("locale", locale.value);
});
</script>
