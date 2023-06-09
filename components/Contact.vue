<template>
  <v-list-item v-if="ced.visible" :value="id" variant="elevated">
    <template #prepend>
      <v-avatar color="green" :image="photo">
        {{ firstName![0] }} {{ lastName![0] }}
      </v-avatar>
    </template>

    <NuxtLink :to="'/contacts/' + id">
      <v-list-item-title v-html="`${ced.fn} ${ced.ln}`"></v-list-item-title>
      <v-list-item-subtitle
        v-html="`${ced.num} ${ced.email ? ' - ' : ''} ${ced.email}`"
      >
      </v-list-item-subtitle>
    </NuxtLink>

    <template #append>
      <v-container class="">
        <v-row style="max-width: 200px">
          <v-chip
            v-for="(tag, index) in ced.tags"
            :key="index"
            variant="outlined"
            class="mx-1"
            color="gray"
            size="small"
            @click.stop="
              () => {
                if (!searchText) {
                  searchText = tag;
                }
              }
            "
            v-html="tag"
          ></v-chip>
        </v-row>
      </v-container>
      <v-btn
        color="green-darken-2"
        icon="mdi-phone"
        variant="tonal"
        :title="$t('call')"
        :href="'tel:' + number"
        @click.stop
      >
      </v-btn>
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
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
const searchText = useSearchText();

const ced = computed(() => {
  const searchTerm = searchText.value;
  const res = {
    ln: "",
    fn: "",
    num: "",
    email: "",
    visible: true,
    tags: ["z"],
  };

  res.ln = search(props.lastName!, searchText.value);
  res.fn = search(props.firstName!, searchText.value);
  res.num = search(props.number!, searchText.value);
  res.email = search(props.email!, searchText.value);
  res.tags = props.tags!.map((tag) => search(tag, searchText.value));

  if (searchTerm.length < 2) {
    res.visible = true;
    return res;
  }

  res.visible =
    insensitiveIncludes(props.firstName!, searchTerm) ||
    insensitiveIncludes(props.lastName!, searchTerm) ||
    insensitiveIncludes(props.number!, searchTerm) ||
    insensitiveIncludes(props.email!, searchTerm) ||
    props.tags!.some((tag) => insensitiveIncludes(tag, searchTerm)) ||
    false;
  return res;
});
</script>

<style>
a {
  color: inherit;
  text-decoration: none;
}

.red {
  color: red;
}
</style>
