<script>
import { ref, markRaw, onMounted, inject, nextTick } from 'vue'
import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import { InjectionKeys, Functions } from '@vue-leaflet/vue-leaflet'
import { remapEvents, propsBinder } from '@/utils'

import { markerClusterGroupProps, setupMarkerClusterGroup } from '@/functions/markerClusterGroup'

const { AddLayerInjection } = InjectionKeys
const { render } = Functions.Layer

export default {
  props: markerClusterGroupProps,
  setup(props, context) {
    const leafletObject = ref()
    const ready = ref(false)

    const addLayer = inject(AddLayerInjection)

    const { methods, options } = setupMarkerClusterGroup(props, leafletObject, context)

    onMounted(async () => {
      leafletObject.value = markRaw(L.markerClusterGroup(undefined, options))

      const listeners = remapEvents(context.attrs)
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
