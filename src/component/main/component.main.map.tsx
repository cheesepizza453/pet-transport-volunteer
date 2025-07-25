import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import {volunteerMarkers} from "../../../public/data/volunteer.markers";
import {volunteerInfo} from "../../../public/data/volunteer.info";
import useStoreContent from "../../store/store.content";
import Modal from "../common/modal/modal";
import ModalMapInfo from "../common/modal/modal.map.info";


const containerStyle = {
    width: '100%',
    height: '500px',
};

export default function ComponentMainMap() {
    const [currentPosition, setCurrentPosition] = useState<google.maps.LatLngLiteral | null>(null);
    const { openModal, isModal, modalId } = useStoreContent();
    const [selected, setSelected] = useState<number | null>(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    setCurrentPosition({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                error => {
                    console.error('Error getting current location:', error);
                },
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, []);

    return (
        <>
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
            {currentPosition && (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={currentPosition}
                    zoom={13}
                >
                    {volunteerMarkers.map(marker => (
                        <Marker
                            key={marker.id}
                            position={marker.position}
                            title={marker.name}
                            onClick={()=>{openModal('volunteerInfo');setSelected(marker.id)}}
                        />
                    ))}
                </GoogleMap>
            )}
        </LoadScript>
            {
                isModal && modalId === 'volunteerInfo' && <Modal content={<ModalMapInfo data={volunteerMarkers.find(m => m.id === selected)}/>} type={'center'}/>
            }

        </>
    );
}
