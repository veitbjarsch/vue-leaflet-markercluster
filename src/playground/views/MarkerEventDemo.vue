<template>
  <div class="marker-event__map-wrapper">
    <l-map :useGlobalLeaflet="true" :zoom="8" :center="[50.4, 30.5]">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="OpenStreetMap"
      />
      <l-marker-cluster-group v-on="eventHandler">
        <l-marker :lat-lng="[50, 30.4]" />
        <l-marker :lat-lng="[50, 30.4]" />
        <l-marker :lat-lng="[50.6, 30.5]" />
        <l-marker :lat-lng="[50.7, 30.6]" />
        <l-marker :lat-lng="[50.1, 30.7]" />
      </l-marker-cluster-group>
    </l-map>
  </div>
  <div class="marker-event">
    <template v-for="(event, idx) in eventList" :key="idx">{{ event }}<br /></template>
  </div>
  <div class="marker-event__switch">
    <v-switch
      v-for="event in events"
      :disabled="event === 'ready'"
      :key="event"
      :label="event"
      :value="event"
      color="blue"
      v-model="activeEvents"
      hide-details
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
import { LMarkerClusterGroup } from '../../components/index'
import { markerClusterGroupEvents } from '../../functions/markerClusterGroup'

const events = JSON.parse(JSON.stringify(markerClusterGroupEvents))

const activeEvents = ref([
  'ready',
  'click',
  'clusterclick',
  'clustermouseover',
  'spiderfied',
  'unspiderfied'
])
const eventList = ref<string[]>([])
const logger = (type: string) => {
  var m = new Date()
  var date =
    ('0' + m.getUTCHours()).slice(-2) +
    ':' +
    ('0' + m.getUTCMinutes()).slice(-2) +
    ':' +
    ('0' + m.getUTCSeconds()).slice(-2)

  eventList.value.unshift(`(${date}) Fired Event: ${type}`)
}

const eventHandler = computed(() => {
  const events = {}
  activeEvents.value.forEach((key) => {
    events[key] = () => logger(key)
  })
  return events
})
</script>

<style>
.marker-event {
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

.marker-event__switch {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.marker-event__switch > div {
  width: 200px;
}

.marker-event__map-wrapper {
  height: 50vh;
  width: 100%;
  border-radius: 5px;
  overflow: hidden;
}
</style>
