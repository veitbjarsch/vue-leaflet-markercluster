<template>
  <div style="height: 600px; width: 800px">
    <l-map :useGlobalLeaflet="true" :zoom="8" :center="[50.4, 30.5]">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      />
      <l-marker-cluster-group>
        <l-marker :lat-lng="[50, 30.4]" />
        <l-marker :lat-lng="[50.6, 30.5]" />
        <l-marker :lat-lng="[50.7, 30.6]" />
        <l-marker :lat-lng="[50.1, 30.7]" />
      </l-marker-cluster-group>
    </l-map>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import L from 'leaflet'
globalThis.L = L

import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
import { LMarkerClusterGroup } from '../../components/index'

import 'leaflet/dist/leaflet.css'

const test = ref(true)

setTimeout(() => (test.value = false), 5000)
</script>
