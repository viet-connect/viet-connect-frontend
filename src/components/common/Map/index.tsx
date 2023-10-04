import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

export default function Map({ location }) {
    const mapRef = useRef(null);
    const { lat, lng } = location;

    useEffect(() => {
        const { LatLng, Map: MapMaker, Marker } = window.naver.maps;
        const position = new LatLng(lat, lng);
        const options = { center: position, zoom: 20 };
        const map = new MapMaker('map', options);
        const markerOptions = { position, map };
        const marker = new Marker(markerOptions);
        mapRef.current = marker;
        return () => {
            mapRef.current?.map.destroy();
        };
    }, [lat, lng]);
    return (
        <Container id="map"/>
    );
}

const Container = styled.div`
    width: 100%;
    height: 300px;
`;
