import React, { useEffect, useRef, useState } from 'react';

const cityCoordinates: Record<string, [number, number]> = {
  'Москва': [55.751574, 37.573856],
  'Санкт-Петербург': [59.934280, 30.335099],
  'Казань': [55.830430, 49.066080],
  'Екатеринбург': [56.838011, 60.605703],
  'Новосибирск': [55.008353, 82.935727],
  'Омск': [54.988889, 73.324167],
  'Нижний Новгород': [56.326667, 44.007222],
  'Мурманск': [68.970417, 33.075278],
  'Краснодар': [45.044444, 38.976111],
  'Сочи': [43.602222, 39.734167],
  'Воронеж': [51.660781, 39.200296],
  'Уфа': [54.734444, 55.967222],
  'Челябинск': [55.164444, 61.436667],
  'Иннополис': [55.764722, 48.720556],
  'Ростов-на-Дону': [47.235714, 39.701500],
  'Самара': [53.241944, 50.217222],
  'Красноярск': [56.015278, 92.893611],
  'Пермь': [58.010456, 56.250172],
  'Владивосток': [43.115556, 131.885556],
  'Волгоград': [48.719722, 44.501944],
  'Саратов': [51.533333, 46.000000],
  'Тюмень': [57.153056, 65.534167],
  'Иркутск': [52.286944, 104.296389],
  'Хабаровск': [48.480556, 135.083889],
  'Ярославль': [57.626389, 39.883889],
  'Калининград': [54.710833, 20.452222],
  'Ульяновск': [54.314444, 48.403611],
  'Барнаул': [53.354722, 83.769722],
  'Томск': [56.497222, 84.976111],
  'Кемерово': [55.333333, 86.083333],
  'Новокузнецк': [53.755556, 87.109722],
  'Астрахань': [46.349722, 48.040833],
  'Пенза': [53.200000, 45.000000],
  'Липецк': [52.603611, 39.570833],
  'Тула': [54.196111, 37.618056],
  'Рязань': [54.629167, 39.736111],
  'Белгород': [50.595556, 36.587222],
  'Курск': [51.737222, 36.187222],
  'Орёл': [52.965000, 36.078333],
  'Тверь': [56.858333, 35.900000],
  'Иваново': [56.997222, 40.973611],
  'Калуга': [54.529167, 36.275556],
  'Брянск': [53.252222, 34.371667],
  'Смоленск': [54.781667, 32.045000],
  'Вологда': [59.223889, 39.883889],
  'Архангельск': [64.539167, 40.536944],
  'Петрозаводск': [61.784722, 34.346944],
  'Сыктывкар': [61.668056, 50.806389],
  'Киров': [58.603611, 49.668056],
  'Ижевск': [56.849722, 53.204722],
  'Чебоксары': [56.143889, 47.251944],
  'Йошкар-Ола': [56.637222, 47.890833],
  'Саранск': [54.183889, 45.174444],
  'Нижнекамск': [55.636667, 51.821111],
  'Альметьевск': [54.900000, 52.300000],
  'Набережные Челны': [55.725000, 52.406944],
  'Зеленодольск': [55.833333, 48.516667],
};

interface RouteMapProps {
  origin: string;
  destination: string;
  onClose: () => void;
}

export const RouteMap: React.FC<RouteMapProps> = ({ 
  origin, 
  destination, 
  onClose 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState<string>('—');
  const [duration, setDuration] = useState<string>('—');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current) return;

      try {
        await loadYandexMaps();
        await window.ymaps.ready();

        const map = new window.ymaps.Map(mapRef.current, {
          center: [55.751574, 37.573856],
          zoom: 10,
          controls: ['zoomControl', 'fullscreenControl'],
        });

        const originCoords = getCoordinates(origin);
        const destCoords = getCoordinates(destination);

        if (!originCoords || !destCoords) {
          setLoading(false);
          return;
        }

        const originPlacemark = new window.ymaps.Placemark(originCoords, {
          hintContent: origin,
          balloonContent: `<strong>Откуда:</strong> ${origin}`,
        }, {
          preset: 'islands#greenCircleIcon',
        });

        const destPlacemark = new window.ymaps.Placemark(destCoords, {
          hintContent: destination,
          balloonContent: `<strong>Куда:</strong> ${destination}`,
        }, {
          preset: 'islands#redCircleIcon',
        });

        map.geoObjects.add(originPlacemark);
        map.geoObjects.add(destPlacemark);

        const polyline = new window.ymaps.Polyline(
          [originCoords, destCoords],
          {},
          {
            strokeColor: '#00ff88',
            strokeWidth: 3,
            strokeOpacity: 0.8,
          }
        );

        map.geoObjects.add(polyline);

        const bounds = [
          [
            Math.min(originCoords[0], destCoords[0]),
            Math.min(originCoords[1], destCoords[1]),
          ],
          [
            Math.max(originCoords[0], destCoords[0]),
            Math.max(originCoords[1], destCoords[1]),
          ],
        ];

        map.setBounds(bounds, {
          checkZoomRange: true,
          margins: [50, 50, 50, 50],
        });

        const dist = calculateDistance(originCoords, destCoords);
        setDistance(`${Math.round(dist)} км`);
        setDuration(`${Math.round(dist / 80)} ч`);

        setLoading(false);
      } catch (err) {
        console.error('Map init error:', err);
        setLoading(false);
      }
    };

    initMap();

    return () => {
      if (mapRef.current) {
        mapRef.current.innerHTML = '';
      }
    };
  }, [origin, destination]);

  const loadYandexMaps = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (window.ymaps) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://api-maps.yandex.ru/2.1/?apikey=1bf0689c-95ab-47c6-8f92-3620d14bc609&lang=ru_RU';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = (err) => reject(new Error('Failed to load Yandex Maps'));
      document.head.appendChild(script);
    });
  };

  const getCoordinates = (city: string): [number, number] | null => {
    return cityCoordinates[city] || null;
  };

  const calculateDistance = (coord1: [number, number], coord2: [number, number]): number => {
    const R = 6371;
    const dLat = (coord2[0] - coord1[0]) * Math.PI / 180;
    const dLon = (coord2[1] - coord1[1]) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(coord1[0] * Math.PI / 180) * Math.cos(coord2[0] * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl w-full max-w-6xl h-[80vh] flex flex-col overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-800 bg-gray-900">
          <div>
            <h3 className="text-xl font-bold text-white">Маршрут</h3>
            <p className="text-gray-400 text-sm mt-1">{origin} → {destination}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-green-400 font-semibold">{distance}</div>
              <div className="text-blue-400 text-sm">{duration}</div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-3xl transition ml-4"
            >
              ×
            </button>
          </div>
        </div>
        
        {loading && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-white text-xl">Загрузка карты...</div>
          </div>
        )}
        
        <div ref={mapRef} className="flex-1" style={{ display: loading ? 'none' : 'block' }} />
      </div>
    </div>
  );
};

declare global {
  interface Window {
    ymaps: any;
  }
}