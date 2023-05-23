<template>
    <v-navigation-drawer temporary v-model="drawer">
            <v-list density="compact">
                <v-list-subheader>Contacts</v-list-subheader>
                <v-list-item
                    active-color="primary"
                    value="import"
                    title="Import"
                    prepend-icon="mdi-import"
                    />

                <v-list-item
                    active-color="primary"
                    value="export"
                    title="Export"
                    prepend-icon="mdi-export"
                    />

            </v-list>
        </v-navigation-drawer>
</template>

<script setup>
    const drawer = useDrawer();
</script>