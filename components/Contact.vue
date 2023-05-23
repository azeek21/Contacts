<template>
<v-list-item :value="id" variant="elevated">
    <template v-slot:prepend>
        <v-avatar color="green" :image="photo">
            {{ firstName![0] }} {{ lastName![0] }}
        </v-avatar>
    </template>

    <NuxtLink :to="'/contacts/' + id">
    <v-list-item-title>
        {{ firstName }} {{ lastName }}
    </v-list-item-title>
    <v-list-item-subtitle>
            {{ number }}
    </v-list-item-subtitle>

    </NuxtLink>

    <template v-slot:append>
        <v-container class="">
            <v-row style="max-width: 200px;">
                <v-chip @click.stop class="mx-1" size="small" v-for="tag in tags">{{ tag }}</v-chip>
            </v-row>
        </v-container>
        <v-divider vertical />
        <v-btn
            color="grey-lighten-1"
            icon="mdi-dots-vertical"
            variant="text"
            @click.stop
        >
        </v-btn>
    </template>
</v-list-item>
</template>

<script setup lang="ts">
import { Tcontact } from '~/types';

    const props = defineProps({
        firstName: String, 
        lastName: String, 
        number: String,
        photo: String,
        selected: Boolean,
        id: Number,
        tags: Array<String>,
        email: String,
    })
</script>

<style>
a {
    color: inherit;
    text-decoration: none;
}
</style>