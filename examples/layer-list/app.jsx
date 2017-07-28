/** Very basic SDK application example with a feature table and some data fetch
 *
 *  Contains a Map and demonstrates some of the dynamics of
 *  using the store.
 *
 */

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import React from 'react';
import ReactDOM from 'react-dom';

import SdkMap from '@boundlessgeo/sdk/components/map';
import SdkMapReducer from '@boundlessgeo/sdk/reducers/map';
import * as mapActions from '@boundlessgeo/sdk/actions/map';

import fetch from 'isomorphic-fetch';


// This will have webpack include all of the SDK styles.
import '@boundlessgeo/sdk/stylesheet/sdk.scss';

//Use app.css to style current app

/* eslint-disable no-underscore-dangle */
const store = createStore(combineReducers({
  map: SdkMapReducer,
}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
   applyMiddleware(thunkMiddleware));

function main() {
  // Start with a view of the sample data location
  store.dispatch(mapActions.setView([ -7070054.9651234485,9521866.402961753], 2));

  // add the OSM source
  store.dispatch(mapActions.addSource('osm', {
    type: 'raster',
    tileSize: 256,
    tiles: [
      'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
      'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
      'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png',
    ],
  }));

  // and an OSM layer.
  // Raster layers need not have any paint styles.
  store.dispatch(mapActions.addLayer({
    id: 'osm',
    source: 'osm',
  }));

  // 'geojson' sources allow rendering a vector layer
  // with all the features stored as GeoJSON. "data" can
  // be an individual Feature or a FeatureCollection.
  store.dispatch(mapActions.addSource('dynamic-source', {
      type: 'geojson'
    }
  ));

  store.dispatch(mapActions.addLayer({
    id: 'dynamic-layer',
    type:'circle',
    source: 'dynamic-source',
    paint: {
      'circle-radius': 5,
      'circle-color': '#552211',
      'circle-stroke-color': '#00ff11',
    },
  }));

  // Background layers change the background color of
  // the map. They are not attached to a source.
  store.dispatch(mapActions.addLayer({
    id: 'background',
    type: 'background',
    paint: {
      'background-color': '#eee',
    },
  }));

  //Fetch the geoJson file from a url and add it to the map at the named source
  const addLayerFromGeoJSON = (url, sourceName) => {
    //Fetch URL
    fetch(url)
      .then(
        response => response.json(),
        error => console.error('An error occured.', error),
      )
      .then(json => {
        //addFeatures with the features, soruce name, and crs
        store.dispatch(mapActions.addFeatures(sourceName, json.features, json.crs));
    })
  }

  //This is called by the onClick, keeping the onClick HTML clean
  const runFetchGeoJSON = () => {
    var url = './data/airports.json'
    addLayerFromGeoJSON(url, 'dynamic-source');
  }

  //Show the data in a table
  const displayLayers = () => {
    var layers = store.getState().map.layers;

    for (let i = 0, ii = layers.length; i < ii; i++) {
      console.log(layers[i].id)
    }
    //Place the table on the page
    // ReactDOM.render((
    // ), document.getElementById('table'));
  }
  // place the map on the page.
  ReactDOM.render(<SdkMap store={store} />, document.getElementById('map'));

  // add some buttons to demo some actions.
  ReactDOM.render((
    <div>
      <button className="sdk-btn" onClick={runFetchGeoJSON}>Fetch Data</button>
      <button className="sdk-btn" onClick={displayLayers}>Show layer data</button>
    </div>
  ), document.getElementById('controls'));
}

main();
