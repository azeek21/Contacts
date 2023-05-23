<template>
    <v-layout>
        <Header />

        <NavigationDrawer />
        <v-main>
            <ContactList />
        </v-main>
    </v-layout>
</template>

<script setup lang="ts">
const drawer = useDrawer();
</script>