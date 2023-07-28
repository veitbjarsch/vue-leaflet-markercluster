import * as L from 'leaflet'

declare module 'leaflet' {
  interface LeafletEventHandlerFnMap {
    /*
     * Fires when mouse starts hovering the cluster
     */
    clustermouseover?: LeafletMouseEventHandlerFn | undefined

    /*
     * Fires when mouse stops hovering the cluster
     */
    clustermouseout?: LeafletMouseEventHandlerFn | undefined

    /*
     * Fires when cluster was clicked
     */
    clusterclick?: LeafletMouseEventHandlerFn | undefined
  }
}

export type LeafletEventKeys = Array<keyof L.LeafletEventHandlerFnMap>
export type EmitterEvents = L.LeafletMouseEvent | L.MarkerClusterSpiderfyEvent | L.LeafletEvent

export type EventHandlerFn = L.LeafletMouseEventHandlerFn &
  L.SpiderfyEventHandlerFn &
  L.AnimationEndEventHandlerFn
