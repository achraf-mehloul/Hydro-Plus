declare namespace google {
  namespace maps {
    class Map {
      constructor(el: HTMLElement, opts?: MapOptions);
    }
    interface MapOptions {
      center?: LatLngLiteral;
      zoom?: number;
      styles?: MapTypeStyle[];
      disableDefaultUI?: boolean;
      zoomControl?: boolean;
      mapTypeControl?: boolean;
      streetViewControl?: boolean;
      fullscreenControl?: boolean;
    }
    interface LatLngLiteral {
      lat: number;
      lng: number;
    }
    interface MapTypeStyle {
      elementType?: string;
      featureType?: string;
      stylers: Record<string, string>[];
    }
  }
}

interface Window {
  google?: typeof google;
}
