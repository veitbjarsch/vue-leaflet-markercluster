# vue-leaflet-markercluster

:warning: This package is currently a beta version. If you find any bugs or missing features please open an issue or feel free to extend the package and create a PR. :warning:

This is an extension of the [vue-leaflet](https://github.com/vue-leaflet/vue-leaflet) package, which adds the functionality of using the leaflet [markercluster](https://github.com/Leaflet/Leaflet.markercluster) in an intuitive simple style.

:information_source: The plugin works quite well for a small to medium numbers of markers. If you plan to use 10.000 markers or more at once, I would recommend you to use the leaflet.markercluster addLayers function directly.

## Prerequirements

- [leaflet](https://github.com/Leaflet/Leaflet) (v1.9.4 or higher)
- [@vue-leaflet/vue-leaflet](https://github.com/vue-leaflet/vue-leaflet) (v0.10.1 or higher)

## Installation

```
yarn add leaflet.markercluster
yarn add vue-leaflet-markercluster
```

or

```
npm i -D leaflet.markercluster
npm i -D vue-leaflet-markercluster
```

add the following lines to your main.css file:

```
@import 'leaflet.markercluster/dist/MarkerCluster.css';
@import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
```


## Usage

The documentation is still work in progress feel free to open a PR and add some more content here

### QUickstart

```
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

<script setup>
import L from 'leaflet'
globalThis.L = L

import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
import { LMarkerClusterGroup } from 'vue-leaflet-markercluster'

import 'leaflet/dist/leaflet.css'
import 'vue-leaflet-markercluster/dist/style.css'
</script>
```

## Component playground

To see the component playground in action, clone this repo and run the local dev server, then visit http://127.0.0.1:5173,

```
git clone https://github.com/veitbjarsch/vue-leaflet-markercluster.git
cd vue-leaflet-markercluster
npm i
npm run dev
```

## Server-side rendering (SSR)

Note, while it is possible to enable SSR using `@vue-leaflet/vue-leaflet`. We can't use the SSR capability with `vue-leaflet-markercluster`. The reason here is that the leaflet.markercluster relies on the global L ([read here](https://github.com/Leaflet/Leaflet.markercluster/issues/874) for more information), so we can't use the Leaflet ESM, which is crucial for the SSR support.
