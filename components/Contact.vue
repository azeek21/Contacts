<template>
  <v-list-item :value="id" variant="elevated">
    <template #prepend>
      <v-avatar color="green" :image="photo">
        {{ firstName![0] }} {{ lastName![0] }}
      </v-avatar>
    </template>

    <NuxtLink :to="'/contacts/' + id">
      <v-list-item-title> {{ firstName }} {{ lastName }} </v-list-item-title>
      <v-list-item-subtitle>
        {{ number }}
      </v-list-item-subtitle>
    </NuxtLink>

    <template #append>
      <v-container class="">
        <v-row style="max-width: 200px">
          <v-chip
            v-for="(tag, index) in tags"
            :key="index"
            class="mx-1"
            size="small"
            @click.stop
            >{{ tag }}</v-chip
          >
        </v-row>
      </v-container>
      <v-btn
        color="green-darken-2"
        icon="mdi-phone"
        variant="tonal"
        :href="'tel:' + number"
        @click.stop
      >
      </v-btn>
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
console.log("contact list item");
const props = defineProps({
  firstName: String,
  lastName: String,
  number: String,
  photo: String,
  selected: Boolean,
  id: Number,
  tags: Array<String>,
  email: String,
});
</script>

<style>
a {
  color: inherit;
  text-decoration: none;
}
</style>
