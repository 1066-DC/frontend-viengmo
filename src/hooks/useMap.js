import {
  ref, watch, computed, onMounted
} from '@vue/composition-api';
import mapboxgl from 'mapbox-gl';
import {
  BUILDINGS_LAYER, BUILDINGS_SOURCE
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
      style: 'mapbox://styles/mapbox/streets-v11',
      center: initialCenter,
      zoom: initialZoom,
    });

    mapPromise.value = new Promise((resolve) => {
      map.on('load', () => resolve(map));
    });

    mapPromise.value.then((map) => {

      map.addSource(BUILDINGS_SOURCE, {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [],
        },
      });

      map.addLayer({
        id: BUILDINGS_LAYER,
        type: 'circle',
        source: BUILDINGS_SOURCE,
        minzoom: 6,
        paint: {
          'circle-radius': ['interpolate', ['linear'], ['zoom'], 10, 4, 11, 6],
          'circle-color': '#2FB459',
          'circle-stroke-color': 'black',
          'circle-stroke-width': 1,
        },
      });

      map.on('mouseenter', BUILDINGS_LAYER, () => {
        map.getCanvas().style.cursor = 'pointer';
      });

      map.on('mouseleave', BUILDINGS_LAYER, () => {
        map.getCanvas().style.cursor = '';
      });

      map.on('click', BUILDINGS_LAYER, (e) => {
        if (!e.originalEvent.defaultPrevented) {
          const building = e.features[0].properties;
          router.push({
            name: 'building',
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
    const filterValue = Number(building_id.value);

    mapPromise.value.then((map) => {
      map.setPaintProperty(BUILDINGS_LAYER, 'circle-color', [
        'case',
        ['==', ['get', 'id'], filterValue],
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
      const buildingSource = map.getSource(BUILDINGS_SOURCE);
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
            coordinates: [v.longitude, v.latitude],
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

  watch(building_id, () => {
    setStyle();
  });

  onMounted(() => setMap());

  return {
    mapPromise,
  };
};