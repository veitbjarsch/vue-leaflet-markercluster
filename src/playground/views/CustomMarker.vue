<template>
  <div style="height: 50vh; width: 100%">
    <l-map :useGlobalLeaflet="true" :zoom="8" :center="[50.4, 30.5]">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="openstreetmap"
      />
      <l-marker-cluster-group :icon-create-function="drawRedCluster">
        <l-marker :lat-lng="[50, 31.5]" />
        <l-marker :lat-lng="[50, 31.5]" />
        <l-marker :lat-lng="[50.1, 31.4]" />
        <l-marker :lat-lng="[50.12, 31.4]" />
        <l-marker :lat-lng="[50.144444, 31.4]" />
        <l-marker :lat-lng="[50, 31.4]" />
        <l-marker :lat-lng="[50.1, 31.7]" />
      </l-marker-cluster-group>
      <l-marker-cluster-group :icon-create-function="drawBlueCluster">
        <l-marker :lat-lng="[50, 30.5]" />
        <l-marker :lat-lng="[50.1, 30.4]" />
        <l-marker :lat-lng="[50.12, 30.4]" />
        <l-marker :lat-lng="[50.144444, 30.4]" />
        <l-marker :lat-lng="[50, 30.4]" />
        <l-marker :lat-lng="[50.1, 30.7]" />
      </l-marker-cluster-group>
    </l-map>
  </div>
</template>

<script setup lang="ts">
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
import { LMarkerClusterGroup } from '../../components/index'
import { point } from 'leaflet'
import { divIcon } from 'leaflet'
const drawBlueCluster = (cluster: any) => {
  const icon = divIcon({
    className: 'blue-cluster',
    iconSize: point(25, 25)
  })
  return icon
}
const drawRedCluster = (cluster: any) => {
  const html = `${cluster._childCount}`
  const icon = divIcon({
    className: 'red-cluster',
    html,
    iconSize: point(50, 50)
  })
  return icon
}
</script>

<style>
.blue-cluster {
  background: rgb(10, 20, 225);
  color: white;
}

.red-cluster {
  background: rgb(185,26,0,0.333);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
</style>
