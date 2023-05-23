<template>
<div>
    <v-list lines="two">
      <template v-for="contact in contacts" :key="contact.id">
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

</script>