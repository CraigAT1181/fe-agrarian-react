import { useEffect } from "react";

export default function Maps(){
    
    

    useEffect(() => {
        function initMap(){
        const map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8
          });
        
          // Add a marker to the map
          const marker = new google.maps.Marker({
            position: { lat: -34.397, lng: 150.644 },
            map: map,
            title: 'Hello World!'
          })
        }
    
       // Load the Google Maps API script
       const script = document.createElement('script');
       script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBPEL9RgJfKnr58ff5ZEPSAituv9TMxRXY&callback=initMap`;
       script.async = true;
       document.head.appendChild(script);
   
       // Clean up the script tag when the component is unmounted
       return () => {
         document.head.removeChild(script);
    }, []});

    return <div id="map" style={{ height: '400px' }}></div>;
}