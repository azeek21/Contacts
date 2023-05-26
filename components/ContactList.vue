<template>
  <div>
    <v-app-bar
      app
      scroll-behavior="hide"
      density="compact"
      scroll-threshold="20"
      location="top"
    >
      <v-chip-group
        v-model="selectedTags"
        class="px-10"
        multiple
        selected-class="text-secondary"
      >
        <v-chip v-for="tag in tags" :key="tag">
          {{ tag }}
        </v-chip>
      </v-chip-group>
    </v-app-bar>

    <v-list lines="two">
      <template v-for="contact in filteredContacts" :key="contact.id">
        <Contact
          :id="contact.id"
          :email="contact.email"
          :first-name="contact.firstName"
          :last-name="contact.lastName"
          :number="contact.number"
          :tags="contact.tags"
          :photo="contact.photo"
        >
        </Contact>
      </template>
    </v-list>
  </div>
</template>

<script setup lang="ts">
const contacts = useContacts();
const filteredContacts = ref(sortedContacts(contacts.value));
const tags = useTags();
const selectedTags = ref<number[]>([]);

watchEffect(() => {
  console.log("render changed 5: ");
});
</script>
