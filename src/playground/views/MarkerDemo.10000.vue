<template>
  <div style="height: 50vh; width: 100%">
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
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
import { LMarkerClusterGroup } from '../../components/index'
import { addressPoints } from './MarkerDemo.10000'
</script>
