<script lang="ts">
import type { MarkerClusterGroup } from 'leaflet'
import { ref, markRaw, onMounted, nextTick } from 'vue'
import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import { InjectionKeys, Functions, Utilities } from '@vue-leaflet/vue-leaflet'

import { markerClusterGroupProps, setupMarkerClusterGroup } from '@/functions/markerClusterGroup'

const { remapEvents, propsBinder, assertInject, WINDOW_OR_GLOBAL } = Utilities
const { AddLayerInjection } = InjectionKeys
const { render } = Functions.Layer

export default {
  props: markerClusterGroupProps,
  setup(props, context) {
    const leafletObject = ref<MarkerClusterGroup>()
    const ready = ref(false)

    const addLayer = assertInject(AddLayerInjection)

    const { methods, options } = setupMarkerClusterGroup(props, leafletObject, context)

    onMounted(async () => {
      const { markerClusterGroup } = WINDOW_OR_GLOBAL.L
      leafletObject.value = markRaw(markerClusterGroup(options))

      const { listeners } = remapEvents(context.attrs)
      leafletObject.value.on(listeners)

      propsBinder(methods, leafletObject.value, props)
      addLayer({
        ...props,
        ...methods,
        leafletObject: leafletObject.value
      })
      ready.value = true
      nextTick(() => context.emit('ready', leafletObject.value))
    })

    return { ready, leafletObject }
  },
  render() {
    return render(this.ready, this.$slots)
  }
}
</script>
