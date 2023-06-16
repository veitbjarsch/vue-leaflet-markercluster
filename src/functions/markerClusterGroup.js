import { Functions } from '@vue-leaflet/vue-leaflet'
import { propsToLeafletOptions } from '@/utils'

const { featureGroupProps, setupFeatureGroup } = Functions.FeatureGroup

export const markerClusterGroupProps = {
  ...featureGroupProps,
  /**
   * A cluster will cover at most this many pixels from its center
   **/
  maxClusterRadius: {
    type: Number,
    default: 80
  },
  // clusterPane: {
  //   type: Object,
  // },
  spiderfyOnEveryZoom: {
    type: Boolean,
    default: false
  },
  spiderfyOnMaxZoom: {
    type: Boolean,
    default: true
  },
  showCoverageOnHover: {
    type: Boolean,
    default: true
  },
  zoomToBoundsOnClick: {
    type: Boolean,
    default: true
  },
  singleMarkerMode: {
    type: Boolean,
    default: false
  },
  disableClusteringAtZoom: {
    type: Boolean,
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
   * shape positions
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
   * at the end of each interval, give n milliseconds back to system/browser
   */
  chunkDelay: {
    type: Number,
    default: 50
  },
  /**
   * progress callback: function(processed, total, elapsed)
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
}

export const setupMarkerClusterGroup = (props, leafletRef, context) => {
  const { options: featureOptions, methods: featureGroupMethods } = setupFeatureGroup(
    props,
    leafletRef,
    context
  )

  const options = propsToLeafletOptions(props, markerClusterGroupProps, featureOptions)

  const methods = {
    ...featureGroupMethods
  }

  return { options, methods }
}
