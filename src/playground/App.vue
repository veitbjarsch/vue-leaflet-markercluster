<template>
  <div style="height: 600px; width: 800px">
    <l-map ref="map" :zoom="8" :center="[50, 30.5]">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      />
      <l-marker-cluster-group>
        <l-marker :lat-lng="[50, 30.4]"></l-marker>
        <l-marker :lat-lng="[50.6, 30.5]"></l-marker>
        <l-marker :lat-lng="[50.7, 30.6]"></l-marker>
        <l-marker :lat-lng="[50.1, 30.7]"></l-marker>
      </l-marker-cluster-group>
    </l-map>
  </div>
</template>

<script setup lang="ts">
import 'leaflet/dist/leaflet.css'

import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
import LMarkerClusterGroup from '@/components/LMarkerClusterGroup.vue'
</script>
