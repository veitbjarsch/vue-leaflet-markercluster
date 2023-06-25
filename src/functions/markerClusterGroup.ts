import { Functions, Utilities } from '@vue-leaflet/vue-leaflet'

const { featureGroupProps, setupFeatureGroup } = Functions.FeatureGroup
const { propsToLeafletOptions } = Utilities

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
   * outside of the viewpoint, which is the default behaviour
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
   * Whether to animate adding markers after adding the MarkerClusterGroup
   * to the map. If you are adding individual markers set to true, if
   * adding bulk markers leave false for massive performance gains.
   */
  animateAddingMarkers: {
    type: Boolean,
    default: true
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
   * Increase to increase the distance away that spiderfied markers
   * appear from the center
   */
  spiderfyDistanceMultiplier: {
    type: Number,
    default: 1
  },
  /**
   * Make it possible to specify a polyline options on a spider leg
   */
  spiderLegPolylineOptions: {
    type: Object,
    default: () => ({ weight: 1.5, color: '#222', opacity: 0.5 })
  },
  /**
   * When bulk adding layers, adds markers in chunks. Means addLayers may not
   * add all the layers in the call, others will be loaded during setTimeouts
   */
  chunkedLoading: {
    type: Boolean,
    default: false
  },
  /**
   * process markers for a maximum of ~ n milliseconds
   * (then trigger the chunkProgress callback)
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
   * progress callback: "function(processed, total, elapsed)""
   * (e.g. for a progress indicator)
   */
  chunkProgress: {
    type: Function,
    default: null
  },
  /**
   * Options to pass to the L.Polygon constructor
   */
  polygonOptions: {
    type: Object,
    default: () => ({})
  }
} as const

export const setupMarkerClusterGroup = (props: Object, leafletRef: Object, context: Object) => {
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

  const methods = {
    ...featureGroupMethods
  }

  return { options, methods }
}
