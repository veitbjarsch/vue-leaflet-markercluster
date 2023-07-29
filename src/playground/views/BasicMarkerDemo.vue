<template>
  <div style="height: 50vh; width: 100%">
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
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
import { LMarkerClusterGroup } from '../../components/index'
</script>
