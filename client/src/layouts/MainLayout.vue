<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-yellow-2">
        <q-btn flat :icon="hatIcon"/>
        <q-space/>
        <q-toolbar-title class="text-primary">
          Magic Search
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container style="background-color: #eee">
      <router-view/>
    </q-page-container>
    <q-footer elevated>
      <q-toolbar class="bg-yellow-2">
        <q-toolbar-title>
          <q-btn flat color="grey" class="full-width" type="a" href="https://github.com/SoloSteve/magic-search#readme" target="_blank">Instructions on Github</q-btn>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
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
