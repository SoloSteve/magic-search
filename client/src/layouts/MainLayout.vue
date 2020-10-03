<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-yellow-2">
        <q-btn flat :icon="hatIcon"/>
        <q-toolbar-title class="text-primary">
          Magic Search
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container style="background-color: #eee">
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import magicIcon from "../assets/hat.svg";

export default {
  name: 'MainLayout',
  data() {
    return {
      hatIcon: null,
    }
  },
  created() {
    this.hatIcon = `img:${magicIcon}`;
  }
}
</script>
