# Los Angeles Crime Mapping Application

### Overview
The Los Angeles Crime Mapping application is a web-based tool designed for visualizing crime data and McDonald's locations in Los Angeles. It uses LeafletJS, MarkerCluster, D3 for the frontend while utilizing NodeJS and PostgreSQL for the backend to provide an interactive map that displays detailed information on crimes and business locations.

This application is collaborative work to fulfill the Project 3 requirement for UCB Ext Data Bootcamp.

### Features
* Interactive map with crime data and McDonald's locations.
* Dynamic data visualization using LeafletJS 1.9.4, MarkerCluster 1.7.1, and D3 libraries
* Customizable map icons and popups for enriched user experience.
* Filters for crime types, date ranges, and specific areas.*

### Frontend
LeafletJS 1.9.4: JavaScript library for responsive maps
Leaflet.MarkerCluster 1.7.1: Manages large numbers of map markers
D3: A powerful JavaScript library for manipulating documents based on data
Geolib: A library that provides geospatial operations

### Backend
* **PostgreSQL** Database
    * Crime Data: Derived from the [Los Angeles Open Data Portal](https://data.lacity.org/Public-Safety/Crime-Data-from-2020-to-Present/2nrs-mtv8/about_data)
    * Los Angeles Business Aggragate Data, also from [Los Angeles Open Data Portal](https://data.lacity.org/Administration-Finance/Listing-of-Active-Businesses/6rrh-rzua/about_data)
* **NodeJS** Libraries:
    * **fs** 0.0.1-security: File system interactions.
    * **papaparse** 5.4.1: For CSV parsing (used for testing)
    * **pg** 8.11.3: PostgreSQL client.
    * **express** 4.18.2: Minimal Node JS web framework

## Getting Started

### Prerequisite
* Local install
    * NodeJS, npm, PostgreSQL
* Remote Javascript libraries can be leveraged using the following libraries CDN sites. Check [index.html](index.html) for location of CDNs
    * Leaflet
    * MarkerCluster
    * Plotly
    * D3
    * Geolib


### Collaborators
* [Ahlden Brough](https://github.com/AhldenBrough)
* [Diahann Castellon](https://github.com/Diahann-c)
* [Leon Luong](https://github.com/leonluong1)
* [Roland Abellano](https://github.com/rabellan/)
* Steven Joseph Islava