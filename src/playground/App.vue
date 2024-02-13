<template>
  <div class="main-wrapper">
    <div class="menu">
      <v-list density="compact" nav>
        <v-list-item title="Home" to="/" />
        <v-list-item title="Marker props" to="/props-marker" />
        <v-list-item title="Marker events" to="/event-marker" />
        <v-list-item title="10.000 Marker" to="/10000-marker" />
        <v-list-item title="Custom markers" to="/custom-marker" />
      </v-list>
    </div>
    <div class="map-wrapper">
      <router-view />
    </div>
  </div>
</template>
<script setup lang="ts">
import L from 'leaflet'
globalThis.L = L

import 'leaflet/dist/leaflet.css'
</script>

<style>
.main-wrapper {
  display: flex;
  max-width: 1000px;
  margin: 0 auto;
}
.menu {
  display: flex;
  flex-direction: column;
  width: 150px;
}

.menu a {
  padding: 0.25rem 0.5rem;
  text-decoration: none;
  font-family: Arial, Helvetica, sans-serif;
}

.menu .router-link-exact-active {
  background-color: lightgray;
}
.map-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 8px;
  gap: 8px;
  width: 100%;
}
</style>
