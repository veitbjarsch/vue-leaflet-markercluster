<template>
  <div class="marker-props__map-wrapper">
    <l-map :useGlobalLeaflet="true" :zoom="8" :center="[50.4, 30.5]">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      />
      <l-marker-cluster-group v-bind="cleanProps">
        <l-marker :lat-lng="[50, 30.4]" />
        <l-marker :lat-lng="[50, 30.4]" />
        <l-marker :lat-lng="[50.6, 30.5]" />
        <l-marker :lat-lng="[50.7, 30.6]" />
        <l-marker :lat-lng="[50.1, 30.7]" />
      </l-marker-cluster-group>
    </l-map>
  </div>
  <h2>Default options</h2>
  <div class="marker-props__switch">
    <v-text-field
      label="maxClusterRadius"
      variant="underlined"
      :hide-details="true"
      disabled
      v-model="props.maxClusterRadius"
    ></v-text-field>

    <v-text-field
      label="clusterPane"
      variant="underlined"
      :hide-details="true"
      disabled
      v-model="props.clusterPane"
    ></v-text-field>

    <v-switch
      label="showCoverageOnHover"
      color="blue"
      v-model="props.showCoverageOnHover"
      hide-details
    />

    <v-switch
      label="zoomToBoundsOnClick"
      color="blue"
      v-model="props.zoomToBoundsOnClick"
      hide-details
    />

    <v-switch
      label="singleMarkerMode"
      color="blue"
      disabled
      v-model="props.singleMarkerMode"
      hide-details
    />

    <v-text-field
      label="disableClusteringAtZoom"
      variant="underlined"
      :hide-details="true"
      disabled
      v-model="props.disableClusteringAtZoom"
    ></v-text-field>

    <v-switch
      label="removeOutsideVisibleBounds"
      color="blue"
      v-model="props.removeOutsideVisibleBounds"
      hide-details
    />
  </div>
  <h2>Animation</h2>
  <div class="marker-props__switch">
    <v-switch label="animate" color="blue" disabled v-model="props.animate" hide-details />

    <v-switch
      label="animateAddingMarkers"
      color="blue"
      v-model="props.animateAddingMarkers"
      hide-details
    />
  </div>
  <h2>Spiderfy</h2>
  <div class="marker-props__switch">
    <v-switch
      label="spiderfyOnEveryZoom"
      color="blue"
      v-model="props.spiderfyOnEveryZoom"
      hide-details
    />

    <v-switch
      label="spiderfyOnMaxZoom"
      color="blue"
      v-model="props.spiderfyOnMaxZoom"
      hide-details
    />
    <v-text-field
      label="spiderfyDistanceMultiplier"
      variant="underlined"
      :hide-details="true"
      v-model="props.spiderfyDistanceMultiplier"
    ></v-text-field>

    <v-text-field
      label="spiderLegPolylineOptions"
      variant="underlined"
      :hide-details="true"
      v-model="props.spiderLegPolylineOptions"
    ></v-text-field>
  </div>
  <h2>Marker loading</h2>
  <div class="marker-props__switch">
    <v-switch label="chunkedLoading" color="blue" v-model="props.chunkedLoading" hide-details />

    <v-text-field
      label="chunkInterval"
      variant="underlined"
      :hide-details="true"
      v-model="props.chunkInterval"
    ></v-text-field>

    <v-text-field
      label="chunkDelay"
      variant="underlined"
      :hide-details="true"
      v-model="props.chunkDelay"
    ></v-text-field>

    <v-text-field
      label="polygonOptions"
      variant="underlined"
      :hide-details="true"
      v-model="props.polygonOptions"
    ></v-text-field>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
import { LMarkerClusterGroup } from '../../components/index'

const props = reactive({
  maxClusterRadius: '80',
  clusterPane: 'markerPane',
  spiderfyOnEveryZoom: false,
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: true,
  zoomToBoundsOnClick: true,
  singleMarkerMode: false,
  disableClusteringAtZoom: '',
  removeOutsideVisibleBounds: true,
  animate: true,
  animateAddingMarkers: false,
  spiderfyShapePositions: null, // TODO function
  spiderfyDistanceMultiplier: '1',
  spiderLegPolylineOptions: `{ "weight": 1.5, "color": "#222", "opacity": 0.5 }`,
  chunkedLoading: false,
  chunkInterval: '200',
  chunkDelay: '50',
  chunkProgress: null, // TODO function
  polygonOptions: `{}`
})

const cleanProps = computed(() => ({
  ...props,
  maxClusterRadius: parseInt(props.maxClusterRadius) || 80,

  disableClusteringAtZoom:
    props.disableClusteringAtZoom.length > 0 ? parseInt(props.disableClusteringAtZoom) : undefined,
  spiderfyShapePositions: undefined, // TODO function
  spiderfyDistanceMultiplier: parseInt(props.spiderfyDistanceMultiplier) || 1,
  spiderLegPolylineOptions: JSON.parse(props.spiderLegPolylineOptions),
  chunkInterval: parseInt(props.chunkInterval) || 200,
  chunkDelay: parseInt(props.chunkDelay) || 50,
  chunkProgress: undefined, // TODO function
  polygonOptions: JSON.parse(props.polygonOptions)
}))
</script>

<style>
.marker-props {
  line-height: 24px;
  font-size: 16px;
  height: 128px;
  width: 100%;
  background-color: #151515;
  border-radius: 5px;
  overflow-y: scroll;
  padding: 8px;
  color: #fff;
  font-family: monospace;
  white-space: normal;
}

.marker-props__switch {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
}

.marker-props__switch > * {
  width: 250px;
}

.marker-props__map-wrapper {
  height: 50vh;
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
}
h2 {
  margin-top: 16px;
}
</style>
