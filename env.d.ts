/// <reference types="vite/client" />
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

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
