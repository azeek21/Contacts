<template>
  <v-app-bar app scroll-behavior="elevate">
    <v-app-bar-nav-icon icon="mdi-menu" @click="changeDrawer" />

    <v-text-field
      v-model="searchText"
      label="Search"
      hide-details
      density="compact"
      single-line
      variant="outlined"
      append-inner-icon="mdi-magnify"
      color="green"
    />

    <template #append>
      <v-btn
        class="mx-2"
        prepend-icon="mdi-wrench"
        title="Load demo data"
        color="yellow"
        variant="elevated"
        @click="demoModeHandler"
        >Demo</v-btn
      >
      <v-btn icon="mdi-dots-vertical"></v-btn>
    </template>
  </v-app-bar>

  <v-dialog v-model="isDialogOpen" persistent width="auto">
    <v-card
      title="Warning !"
      text="You have older contacts, If you switch to Demo mode, your old contacts will be deleted forever. Do you want to proceed ?"
    >
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
          Load Demo data
        </v-btn>

        <v-btn variant="outlined" color="green" @click="isDialogOpen = false">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const searchText = ref("");
const drawer = useDrawer();
const changeDrawer = () => (drawer.value = !drawer.value);
const isDialogOpen = ref(false);

const demoModeHandler = () => {
  const contacts = useContacts();
  if (contacts && contacts.value && contacts.value.length > 0) {
    isDialogOpen.value = true;
  } else {
    loadDemoData();
  }
};
</script>
