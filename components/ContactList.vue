<template>
  <div>
    <v-toolbar
      density="compact"
      :elevation="8"
      color="blue-grey-darken-4"
      class="rounded-pill mx-auto mb-3 mt-1 px-2 border"
      style="width: max-content; min-width: 30%; max-width: 95%"
    >
      <v-slide-group
        v-model="selectedTags"
        class="mx-auto"
        selected-class="bg-secondary"
        multiple
        show-arrows
      >
        <v-slide-group-item
          v-for="n in tags"
          :key="n"
          :value="n"
          v-slot="{ toggle, selectedClass }"
        >
          <v-chip
            :class="['mx-1', selectedClass]"
            height="200"
            width="100"
            @click="toggle"
            size="small"
          >
            {{ n }}
          </v-chip>
        </v-slide-group-item>
      </v-slide-group>
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
console.log("yoo");
const filteredContacts = computed(() => {
  return sortedContacts(filterByTags(contacts.value));
});
</script>
