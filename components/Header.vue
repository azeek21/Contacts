<template>
  <v-app-bar app scroll-behavior="elevate">
    <v-btn icon="mdi-menu" @click="changeDrawer"> </v-btn>
    <v-text-field
      v-model="searchText"
      label="Поиск контактов..."
      hide-details
      density="compact"
      single-line
      variant="outlined"
      append-inner-icon="mdi-magnify"
      color="green"
    />
    <v-btn
      class="mx-2"
      prepend-icon="mdi-wrench"
      title="Загрузить демонстрационные данные"
      color="yellow"
      variant="elevated"
      @click="demoModeHandler"
      >Демо
    </v-btn>
    <v-btn icon="mdi-dots-vertical"></v-btn>
  </v-app-bar>

  <!-- <v-toolbar title="Hii"> </v-toolbar> -->

  <v-dialog v-model="isDialogOpen" persistent width="auto">
    <v-card
      title="Предупреждение !"
      text="У вас есть старые контакты. Если вы переключитесь в демонстрационный режим, ваши старые контакты будут удалены навсегда. Продолжить ?"
    >
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          variant="outlined"
          color="yellow"
          @click="
            () => {
              loadDemoData();
              isDialogOpen = false;
            }
          "
        >
          Переключит
        </v-btn>

        <v-btn variant="outlined" color="green" @click="isDialogOpen = false">
          Отмена
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const drawer = useDrawer();
const changeDrawer = () => (drawer.value = !drawer.value);
const isDialogOpen = ref(false);
const searchText = useSearchText();

const demoModeHandler = () => {
  const contacts = useContacts();
  if (contacts && contacts.value && contacts.value.length > 0) {
    isDialogOpen.value = true;
  } else {
    loadDemoData();
  }
};
</script>
