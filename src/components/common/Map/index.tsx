import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

export default function Map({ contactName, location }) {
    const mapRef = useRef(null);
    const { lat, lng } = location;

    useEffect(() => {
        const { LatLng, Map: MapMaker, Marker, Position, CustomControl, Event } = window.naver.maps;
        const position = new LatLng(lat, lng);
        const options = { center: position, zoom: 19 };
        const map = new MapMaker('map', options);
        Event.once(map, 'init', () => {
            const mapLink = `https://map.naver.com/p?title=${contactName}&lng=${lng}&lat=${lat}&zoom=19`;
            const svgTag = '<svg fill="#000000" width="36px" height="36px" viewBox="0 0 24 24" id="turn-right-direction-circle" data-name="Flat Color" xmlns="http://www.w3.org/2000/svg" class="icon flat-color"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#808080" stroke-width="0.336"><circle id="primary" cx="12" cy="12" r="10" style="fill: #ffffff;"></circle><path id="secondary" d="M16.71,9.29l-2-2a1,1,0,1,0-1.42,1.42l.3.29H11a2,2,0,0,0-2,2v5a1,1,0,0,0,2,0V11h2.59l-.3.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l2-2A1,1,0,0,0,16.71,9.29Z" style="fill: #2c81ff;"></path></g><g id="SVGRepo_iconCarrier"><circle class="circle" id="primary" cx="12" cy="12" r="10" style="fill: #ffffff;"></circle><path id="secondary" d="M16.71,9.29l-2-2a1,1,0,1,0-1.42,1.42l.3.29H11a2,2,0,0,0-2,2v5a1,1,0,0,0,2,0V11h2.59l-.3.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l2-2A1,1,0,0,0,16.71,9.29Z" style="fill: #2c81ff;"></path></g></svg>';
            const shortCutEl = `<a target="_blank" href="${mapLink}">${svgTag}</a>`;
            const shortCutControl = new CustomControl(shortCutEl, { position: Position.TOP_RIGHT });
            shortCutControl.setMap(map);
            map.controls[Position.TOP_RIGHT].push(shortCutEl);
        });

        const markerOptions = { position, map };
        const marker = new Marker(markerOptions);
        mapRef.current = marker;
        return () => {
            mapRef.current?.map.destroy();
        };
    }, [lat, lng]);
    return (
        <Container id="map" />
    );
}

const Container = styled.div`
    width: 100%;
    height: 150px;
    border-radius: 6px;
    border: solid 1px rgba(128, 128, 128, 0.5);
    svg:hover .circle {
        fill: #f1f1f1 !important;
    }
`;
