<template>
  <div>
    <v-toolbar
      color="#212121"
      density="compact"
      :elevation="8"
      class="rounded-pill mx-auto mb-3 mt-1"
      style="width: max-content; min-width: 50%; max-width: 90%"
    >
      <v-chip-group
        v-model="selectedTags"
        class="px-3 justify-center w-100"
        multiple
        selected-class="text-secondary"
      >
        <v-chip v-for="tag in tags" :key="tag" class="mx-1">
          {{ tag }}
        </v-chip>
      </v-chip-group>
    </v-toolbar>

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
const tags = useTags();
const selectedTags = useSelectedTags();
const filteredContacts = computed(() => {
  console.log("CONTACTLIST: computed...");
  return sortedContacts(filterByTags(contacts.value));
});

console.log("contactlist ..123...aaaa33.   aaa   aaa");
</script>
