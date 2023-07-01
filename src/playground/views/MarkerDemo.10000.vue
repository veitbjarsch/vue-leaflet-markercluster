<template>
  <div style="height: 600px; width: 800px">
    <l-map :useGlobalLeaflet="true" :zoom="13" :center="[-37.9, 175.46]">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      />
      <l-marker-cluster-group>
        <l-marker
          v-for="address in addressPoints"
          :key="address[2]"
          :lat-lng="[address[0] as number, address[1] as number]"
        />
      </l-marker-cluster-group>
    </l-map>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import L from 'leaflet'
globalThis.L = L

import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
import LMarkerClusterGroup from '@/components/LMarkerClusterGroup.vue'
import { addressPoints } from './MarkerDemo.10000.js'

import 'leaflet/dist/leaflet.css'

const test = ref(true)

setTimeout(() => (test.value = false), 5000)
</script>
