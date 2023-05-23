<template>
<div>
    <v-list lines="two">
      <Contact 
        v-for="contact in contacts"
        :email="contact.email"
        :first-name="contact.firstName"
        :last-name="contact.lastName"
        :number="contact.number"
        :id="contact.id"
        :key="contact.id"
        :tags="contact.tags"
        :photo="contact.photo"
        />
    </v-list>
</div>
</template>

<script setup lang="ts">

const contacts = useContacts();

</script>