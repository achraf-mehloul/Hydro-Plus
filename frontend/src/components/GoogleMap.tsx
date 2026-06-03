import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Layers, Thermometer } from 'lucide-react';

const MAPS_API_KEY = 'AIzaSyDK3hKEyon4ra1Vvpi10e0quZ-ZRWR4Cj4';

interface GoogleMapProps {
  className?: string;
}

export default function GoogleMapView({ className = '' }: GoogleMapProps) {
  const { t } = useTranslation();
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'markers' | 'heatmap'>('markers');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if ((window as any).google?.maps) {
      setLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&libraries=visualization,places`;
    script.async = true;
    script.defer = true;
    script.onload = () => setLoaded(true);
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!loaded || !mapRef.current || mapInstance) return;

    const g = (window as any).google;
    if (!g?.maps) return;

    const map = new g.maps.Map(mapRef.current, {
      center: { lat: 28.0339, lng: 1.6596 },
      zoom: 5,
      styles: getMapStyles(),
      disableDefaultUI: true,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
    });

    setMapInstance(map);
  }, [loaded, mapInstance]);

  return (
    <div className={`relative w-full ${className}`}>
      <div ref={mapRef} className="w-full h-[500px] rounded-2xl overflow-hidden"/>

      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted rounded-2xl">
          <div className="w-10 h-10 border-[3px] border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      <div className="absolute top-4 right-4 flex gap-1 p-1 rounded-xl glass">
        <button
          onClick={() => setViewMode('markers')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            viewMode === 'markers' ? 'bg-primary text-primary-foreground' : 'text-foreground'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          {t('markersView')}
        </button>

        <button
          onClick={() => setViewMode('heatmap')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            viewMode === 'heatmap' ? 'bg-primary text-primary-foreground' : 'text-foreground'
          }`}
        >
          <Thermometer className="w-3.5 h-3.5" />
          {t('heatmapView')}
        </button>
      </div>
    </div>
  );
}

function getMapStyles() {
  return [
    { elementType: 'geometry', stylers: [{ color: '#f5f5f5' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#f5f5f5' }] },
    { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#c9d6e3' }] },
    { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#9e9e9e' }] },
    { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#ffffff' }] },
    { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#eeeeee' }] },
    { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: '#c9c9c9' }] },
  ];
}