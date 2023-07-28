import type { Ref, SetupContext, ExtractPropTypes } from 'vue'
import type { MarkerClusterGroup, Layer } from 'leaflet'
import type { ILayerDefinition } from '@vue-leaflet/vue-leaflet/dist/src/types/interfaces/ILayerDefinition.d.ts'
import type { LeafletEventKeys } from '@/types/eventKeys'
import { provide } from 'vue'
import { Functions, Utilities, InjectionKeys } from '@vue-leaflet/vue-leaflet'
import { debounce } from './utils'

const { featureGroupProps, setupFeatureGroup } = Functions.FeatureGroup
const { AddLayerInjection, RemoveLayerInjection } = InjectionKeys
const { propsToLeafletOptions } = Utilities

const featureGroupEvents = [
  'layeradd',
  'layerremove',
  'click',
  'dblclick',
  'mousedown',
  'mouseup',
  'mouseover',
  'mouseout',
  'contextmenu'
] as const

export const markerClusterGroupEvents: LeafletEventKeys = [
  ...featureGroupEvents,
  'clusterclick',
  'clustermouseover',
  'clustermouseout',
  'animationend',
  'spiderfied',
  'unspiderfied'
]

export const markerClusterGroupProps = {
  ...featureGroupProps,
  /**
   * The maximum radius that a cluster will cover from the central
   * marker (in pixels). Default 80. Decreasing will make more,
   * smaller clusters. You can also use a function that accepts the
   * current map zoom and returns the maximum cluster radius in pixels.
   **/
  maxClusterRadius: {
    type: Number,
    default: 80
  },
  /**
   * Map pane where the cluster icons will be added.
   * Defaults to L.Marker's default (currently 'markerPane').
   */
  clusterPane: {
    type: String,
    default: 'markerPane'
  },
  /**
   * Allows clicking a cluster to spiderfy it at any zoom level,
   * not just the maximum.
   */
  spiderfyOnEveryZoom: {
    type: Boolean,
    default: false
  },
  /**
   * When you click a cluster at the bottom zoom level we spiderfy it
   * so you can see all of its markers. (Note: the spiderfy occurs at
   * the current zoom level if all items within the cluster are still
   * clustered at the maximum zoom level or at zoom specified by
   * disableClusteringAtZoom option).
   */
  spiderfyOnMaxZoom: {
    type: Boolean,
    default: true
  },
  /**
   * When you mouse over a cluster it shows the bounds of its markers.
   */
  showCoverageOnHover: {
    type: Boolean,
    default: true
  },
  /**
   * When you click a cluster we zoom to its bounds.
   */
  zoomToBoundsOnClick: {
    type: Boolean,
    default: true
  },
  /**
   * If set to true, overrides the icon for all added markers to make
   * them appear as a 1 size cluster. Note: the markers are not replaced
   * by cluster objects, only their icon is replaced. Hence they still
   * react to normal events, and option disableClusteringAtZoom does
   * not restore their previous icon.
   */
  singleMarkerMode: {
    type: Boolean,
    default: false
  },
  /**
   * If set, at this zoom level and below, markers will not be clustered.
   * This defaults to disabled. See Example. Note: you may be interested
   * in disabling spiderfyOnMaxZoom option when using.
   */
  disableClusteringAtZoom: {
    type: Number,
    default: null
  },
  /**
   * Setting this to false prevents the removal of any clusters
   * outside of the viewpoint, which is the default behavior
   * for performance reasons.
   */
  removeOutsideVisibleBounds: {
    type: Boolean,
    default: true
  },
  /**
   * Set to false to disable all animations (zoom and spiderfy).
   * If false, option animateAddingMarkers below has no effect.
   * If L.DomUtil.TRANSITION is falsy, this option has no effect.
   */
  animate: {
    type: Boolean,
    default: true
  },
  /**
   * If set to true (and animate option is also true) then adding individual
   * markers to the MarkerClusterGroup after it has been added to the map
   * will add the marker and animate it into the cluster. Defaults to false
   * as this gives better performance when bulk adding markers. addLayers
   * does not support this, only addLayer with individual Markers.
   */
  animateAddingMarkers: {
    type: Boolean,
    default: false
  },
  /**
   * Make it possible to provide custom function to calculate spiderfy
   * shape positions "function(count, centerPt) { ... }"
   */
  spiderfyShapePositions: {
    type: Function,
    default: null
  },
  /**
   * Increase from 1 to increase the distance away from the center that
   * spiderfied markers are placed. Use if you are using big marker icons.
   */
  spiderfyDistanceMultiplier: {
    type: Number,
    default: 1
  },
  /**
   * Allows you to specify PolylineOptions to style spider legs.
   * By default, they are { weight: 1.5, color: '#222', opacity: 0.5 }
   */
  spiderLegPolylineOptions: {
    type: Object,
    default: () => ({ weight: 1.5, color: '#222', opacity: 0.5 })
  },
  /**
   * Boolean to split the addLayers processing in to small intervals
   * so that the page does not freeze.
   */
  chunkedLoading: {
    type: Boolean,
    default: false
  },
  /**
   * Time interval (in ms) during which addLayers works before pausing to
   * let the rest of the page process. In particular, this prevents the page
   * from freezing while adding a lot of markers.
   */
  chunkInterval: {
    type: Number,
    default: 200
  },
  /**
   * Time delay (in ms) between consecutive periods of
   * processing for addLayers. Default to 50ms.
   */
  chunkDelay: {
    type: Number,
    default: 50
  },
  /**
   * progress callback: "function(processed, total, elapsed)"
   * (e.g. for a progress indicator)
   */
  chunkProgress: {
    type: Function,
    default: null
  },
  /**
   * Options to pass when creating the L.Polygon(points, options)
   * to show the bounds of a cluster.
   */
  polygonOptions: {
    type: Object,
    default: () => ({})
  }
} as const

export const setupMarkerClusterGroup = (
  props: ExtractPropTypes<typeof markerClusterGroupProps>,
  leafletRef: Ref<MarkerClusterGroup | undefined>,
  context: SetupContext
) => {
  const { options: featureOptions, methods: featureGroupMethods } = setupFeatureGroup(
    props,
    leafletRef,
    context
  )

  const options = propsToLeafletOptions<L.InteractiveLayerOptions>(
    props,
    markerClusterGroupProps,
    featureOptions
  )

  let layersToAdd = [] as Array<any>
  const _addLayers = debounce(() => {
    if (layersToAdd.length === 1) {
      leafletRef.value?.addLayer(layersToAdd[0])
    } else {
      leafletRef.value?.addLayers(layersToAdd)
    }
    layersToAdd = []
  }, 0)

  let layersToRemove = [] as Array<any>
  const _removeLayers = debounce(() => {
    if (layersToRemove.length === 1) {
      leafletRef.value?.removeLayer(layersToRemove[0])
    } else {
      leafletRef.value?.removeLayers(layersToRemove)
    }
    layersToRemove = []
  }, 0)

  const methods = {
    ...featureGroupMethods,
    addLayer(layer: ILayerDefinition<Layer>) {
      if (props.animateAddingMarkers) {
        return leafletRef.value?.addLayer(layer.leafletObject)
      }

      layersToAdd.push(layer.leafletObject)
      _addLayers()
    },
    removeLayer(layer: ILayerDefinition<Layer>) {
      if (props.animateAddingMarkers) {
        return leafletRef.value?.removeLayer(layer.leafletObject)
      }

      layersToRemove.push(layer.leafletObject)
      _removeLayers()
    }
  }

  provide(AddLayerInjection, methods.addLayer)
  provide(RemoveLayerInjection, methods.removeLayer)

  return { options, methods }
}
