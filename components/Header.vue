<script setup lang="ts">
  const searchText = ref('');
  const drawer = useDrawer();
  const changeDrawer = () =>  drawer.value = !drawer.value;
</script>

<template>
  <v-app-bar class="cuss" app scroll-behavior="elevate" location="top">
    <v-app-bar-nav-icon icon="mdi-menu" @click="changeDrawer"/>
    <v-app-bar-title> Contacts | NOTE: actively under development </v-app-bar-title>
    <v-text-field
      label="Search"
      hide-details
      single-line
      variant="solo-filled"
      append-inner-icon="mdi-magnify"
      v-model="searchText"
    />
    <template v-slot:append>
      <v-btn icon="mdi-dots-vertical"></v-btn>
    </template>
</v-app-bar>
</template>
