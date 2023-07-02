<template>
  <div style="height: 600px; width: 800px">
    <l-map :useGlobalLeaflet="true" :zoom="13" :center="[-37.9, 175.46]">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      />
      <l-marker-cluster-group :chunked-loading="true">
        <l-marker
          v-for="address in addressPoints"
          :key="address[2]"
          :lat-lng="[address[0], address[1]]"
        />
      </l-marker-cluster-group>
    </l-map>
  </div>
</template>

<script setup lang="ts">
import L from 'leaflet'
globalThis.L = L

import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
import { LMarkerClusterGroup } from '../../components/index'
import { addressPoints } from './MarkerDemo.10000'

import 'leaflet/dist/leaflet.css'
</script>
