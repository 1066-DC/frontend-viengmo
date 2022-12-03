import {
  ref, watch, computed, onMounted
} from '@vue/composition-api';
import mapboxgl from 'mapbox-gl';
import {
  VILLAGES_LAYER, VILLAGES_SOURCE
} from '@/helpers';
import router from '@/router';

const mapboxToken = process.env.VUE_APP_MAPBOX_TOKEN;


const initialCenter = [102.62, 17.97];
export const useMap = (buildings, building_id, initialZoom) => {
  const mapPromise = ref(null);
  const center = ref(null);

  const buildingLocations = computed(() => buildings.value.map(x => ({ ...x, longitude: Number(x.longitude), latitude: Number(x.latitude) }))
    .filter(x => x.latitude && !isNaN(x.latitude) && !isNaN(x.longitude)));

  const setMap = () => {
    mapboxgl.accessToken = mapboxToken;

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/satellite-streets-v11',
      center: initialCenter,
      zoom: initialZoom,
    });

    mapPromise.value = new Promise((resolve) => {
      map.on('load', () => resolve(map));
    });

    mapPromise.value.then((map) => {

      map.addSource(VILLAGES_SOURCE, {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [],
        },
      });

      map.addLayer({
        id: VILLAGES_LAYER,
        type: 'circle',
        source: VILLAGES_SOURCE,
        minzoom: 6,
        paint: {
          'circle-radius': ['interpolate', ['linear'], ['zoom'], 10, 4, 11, 10],
          'circle-color': '#2FB459',
          'circle-stroke-color': 'black',
          'circle-stroke-width': 1,
        },
      });

      map.on('mouseenter', VILLAGES_LAYER, () => {
        map.getCanvas().style.cursor = 'pointer';
      });

      map.on('mouseleave', VILLAGES_LAYER, () => {
        map.getCanvas().style.cursor = '';
      });

      map.on('click', VILLAGES_LAYER, (e) => {
        if (!e.originalEvent.defaultPrevented) {
          const building = e.features[0].properties;
          router.push({
            name: 'analytics',
            params: { id: building.id },
          }).catch(() => { });
          const coordinates = e.lngLat.wrap();
          center.value = [coordinates.lng, coordinates.lat];
          e.originalEvent.preventDefault();
        }
      });
      setBuildings();
      focusMap();
    });
  };

  const flyTo = (center) => {
    const zoom = 12 + (initialZoom - 6);

    mapPromise.value.then((map) => {

      map.flyTo({
        center,
        zoom,
      });
    });
    center.value = null;
  };

  const setStyle = () => {
    if (!mapPromise.value) {
      return;
    }
    const filterValue = String(building_id);
    mapPromise.value.then((map) => {
      map.setPaintProperty(VILLAGES_LAYER, 'circle-color', [
        'case',
        ['==', ['get', 'building_id'], filterValue.substring(0, 7)],
        '#ff0000',
        '#2FB459',
      ]);

    });
  };

  const setBuildings = () => {
    if (!mapPromise.value) {
      return;
    }
    mapPromise.value.then((map) => {
      const buildingSource = map.getSource(VILLAGES_SOURCE);
      if (!buildingSource) {
        return;
      }
      buildingSource.setData({
        type: 'FeatureCollection',
        features: buildingLocations.value.map((v) => ({
          type: 'Feature',
          properties: v,
          geometry: {
            type: 'Point',
            coordinates: [v.latitude, v.longitude],
          },
        })),
      });
    });
  };

  const focusMap = () => {
    if (!mapPromise.value) {
      return;
    }
    setStyle();
    let target = buildingLocations.value.find((v) => v.building_id === building_id);
    if (target) {
      flyTo([target.latitude, target.longitude]);
    }
  };

  watch(buildings, () => {
    setBuildings();
  });

  watch(location, () => {
    focusMap();
  });

  onMounted(() => setMap());

  return {
    mapPromise,
  };
};