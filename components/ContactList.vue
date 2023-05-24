<template>
<div>
  <v-app-bar  app scroll-behavior="hide" density="compact" scroll-threshold="20" location="top">
  <v-chip-group
  class="px-10"
          multiple
          selected-class="text-secondary"
          v-model="selectedTags"
        >
          <v-chip
            v-for="tag in tags"
            :key="tag"
          >
            {{ tag }}
          </v-chip>
        </v-chip-group>
</v-app-bar>


    <v-list lines="two">
      <template v-for="contact in filteredContacts" :key="contact.id">
        <Contact 
        :email="contact.email"
        :first-name="contact.firstName"
        :last-name="contact.lastName"
        :number="contact.number"
        :id="contact.id"
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
const filteredContacts = ref([...contacts.value]);
const tags = useTags();
const selectedTags = ref<number[]>([]);

filteredContacts.value = contacts.value.sort((a, b) => {
  const n1 = a.firstName + a.lastName;
  const n2 = b.firstName + b.lastName;
  if (n1 > n2) {
    return 1;
  } else if ( n1 < n2 ) {
    return -1;
  }
  return 0;
})

// watchEffect(() => {
//   console.log(selectedTags.value);
//   if (selectedTags.value.length > 0) {
//     console.log(typeof selectedTags.value[0])
//   }
// })

</script>