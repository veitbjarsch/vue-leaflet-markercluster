<script lang="ts">
import type { MarkerClusterGroup, LeafletEventHandlerFnMap } from 'leaflet'
import { ref, markRaw, onMounted, nextTick } from 'vue'
import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import { InjectionKeys, Functions, Utilities } from '@vue-leaflet/vue-leaflet'

import type { LeafletEventKeys, EventHandlerFn, EmitterEvents } from '@/types/eventKeys'
import {
  markerClusterGroupProps,
  markerClusterGroupEvents,
  setupMarkerClusterGroup
} from '@/functions/markerClusterGroup'

const { propsBinder, assertInject, WINDOW_OR_GLOBAL } = Utilities
const { AddLayerInjection } = InjectionKeys
const { render } = Functions.Layer

export default {
  props: markerClusterGroupProps,
  emits: ['ready', ...markerClusterGroupEvents] as string[],
  setup(props, context) {
    const leafletObject = ref<MarkerClusterGroup>()
    const ready = ref(false)

    const addLayer = assertInject(AddLayerInjection)

    const { methods, options } = setupMarkerClusterGroup(props, leafletObject, context)

    onMounted(async () => {
      const { markerClusterGroup } = WINDOW_OR_GLOBAL.L
      leafletObject.value = markRaw(markerClusterGroup(options))
      const emitter =
        (key: LeafletEventKeys[number]): EventHandlerFn =>
        (e: EmitterEvents) =>
          context.emit(key, e)

      const remapEvents = (): LeafletEventHandlerFnMap => {
        const listeners: LeafletEventHandlerFnMap = {}
        for (const event of markerClusterGroupEvents) {
          listeners[event] = emitter(event)
        }

        return listeners
      }
      leafletObject.value?.on(remapEvents())

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
@/types/markercluster
