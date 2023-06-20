# vue-leaflet-markercluster

This is an extension of the [vue-leaflet](https://github.com/vue-leaflet/vue-leaflet) package, which adds the functionality of using the leaflet [markerculster](https://github.com/Leaflet/Leaflet.markercluster) in an intuitive simple style.

:warning: This package is currently an alpha version. Breaking changes in upcoming minor versions are high likely :warning:

## Prerequirements

- [leaflet](https://github.com/Leaflet/Leaflet) (v 1.9.4 or higher)
- [@vue-leaflet/vue-leaflet](https://github.com/vue-leaflet/vue-leaflet) (v 0.10.1 or higher)

## Installation

```
yarn add veitbjarsch/vue-leaflet-markercluster
```

or

npm i -D veitbjarsch/vue-leaflet-markercluster

## Usage

The documentation is still work in progress feel free to open a PR and add some more content here

### QUickstart

```
<template>
  <div style="height: 600px; width: 800px">
    <l-map :zoom="8" :center="[50, 30.5]">
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

<script setup>
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
import { LMarkerClusterGroup } from 'vue-leaflet-markercluster'

import 'leaflet/dist/leaflet.css'
import 'vue-leaflet-markercluster/styles'
</script>
```

## Component playground

To see the component playground in action, clone this repo and run the local devserver, then visit http://127.0.0.1:5173,

```
git clone https://github.com/veitbjarsch/vue-leaflet-markercluster.git
cd vue-leaflet-markercluster
npm i
npm run dev
```

## Server-side rendering (SSR)

Note, while it is possible to enable SSR using `@vue-leaflet/vue-leaflet`. We can't use the SSR capability with `vue-leaflet-markercluster`. The reason here is that the leaflet.markercluster relies on the global L ([read here](https://github.com/Leaflet/Leaflet.markercluster/issues/874) for more infomation), so we can't use the Leaflet ESM, which is crucial for the SSR support.
