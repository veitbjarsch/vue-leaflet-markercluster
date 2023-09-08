# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

## 0.5.1 - 2023-09-08
### Fixed
- added types key in package.json

## 0.5.0 - 2023-07-29
### Added
- added vuetify for styling the demo pages
- added demo page for props and events
- made events reactive and added support for event modifiers
- made most of the props reactive. Props which requires a complete rebuild of the component if changed will now throw an error

### Changed
- changed alpha version hint in readme to beta

### Fixed
- fixed spelling in README and markerClusterGroup

## 0.4.0 - 2023-07-02
### Added
- description and keywords for npmjs
- added markercluster example with 10.000 entries to playground
- added debounce functionality for adding or removing markers. Markers now added as bulk automatically, which double the rendering speed. Setting animateAddingMarkers to true will disable this behavior in favor for the animation.

## 0.3.0 - 2023-06-30
### Changed
- adjusted animateAddingMarkers default value to match the default options from leaflet markercluster

## 0.2.0 - 2023-06-25
### Added
- added missing clusterPane property
- improved property descriptions in preparation for the documentation

### Fixed
- changed disableClusteringAtZoom type from boolean to number

## 0.1.4 - 2023-06-24
### Fixed
- readme quickstart section now contains the registration of the global L
- readme quickstart now shows the correct path to the style.css file
- l-map now uses the global L in quickstart

## 0.1.4-beta.1 - 2023-06-21
### Changed
- switched to a manual release action

## 0.1.2 - 2023-06-20
### Added
- Improved Readme

## 0.1.1 - 2023-06-20
### Changed
- Fixed ci pipeline

## 0.1.0 - 2023-06-20
### Added
- Initial Release
