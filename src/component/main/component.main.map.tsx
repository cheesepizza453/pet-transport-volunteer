import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import useStoreContent from "../../store/store.content";
import Modal from "../common/modal/modal";
import ModalMapInfo from "../common/modal/modal.map.info";
import { VolunteerFormData } from '../../../interface/interface.common';
import { Timestamp } from 'firebase/firestore';


const containerStyle = {
  width: '100%',
  height: '68dvh',
};

const DEFAULT_LOCATION = {
  lat: 37.5665,
  lng: 126.9780,
};

type IProps = {
  markers: VolunteerFormData[];
  setMarkers: React.Dispatch<React.SetStateAction<VolunteerFormData[]>>;
  selected: string | null;
  setSelected: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function ComponentMainMap(props:IProps) {
  const [currentPosition, setCurrentPosition] = useState<google.maps.LatLngLiteral>(DEFAULT_LOCATION);
  const { openModal, isModal, modalId } = useStoreContent();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.warn('📍 위치 접근 실패:', error.message);
          alert('위치 권한이 거부되어 기본 위치(서울)로 지도를 표시합니다.');
          // fallback 이미 설정됨 (DEFAULT_LOCATION)
        }
      );
    } else {
      console.warn('이 브라우저는 위치 정보를 지원하지 않음');
    }

    const fetchMarkers = async () => {
      const querySnapshot = await getDocs(collection(db, 'volunteers'));
      const data: VolunteerFormData[] = [];
      querySnapshot.forEach((doc) => {
        const d = doc.data();
        data.push({
          id: doc.id,
          title: d.title,
          name: d.name,
          startAddress: d.startAddress,
          startLat: d.startLat,
          startLng: d.startLng,
          arriveAddress: d.arriveAddress,
          arriveLat: d.arriveLat,
          arriveLng: d.arriveLng,
          gender: d.gender,
          age: d.age,
          weight: d.weight,
          image: d.image,
          petDesc: d.petDesc,
          requesterName: d.requesterName,
          requesterPhone: d.requesterPhone,
          requesterInfo: d.requesterInfo,
          desc: d.desc,
          createdAt: (d.createdAt instanceof Timestamp)
            ? d.createdAt.toDate()
            : new Date(),
        });
      });
      props.setMarkers(data);
    };

    fetchMarkers();
  }, []);

  return (
    <>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentPosition}
          zoom={13}
        >
          {props.markers.map(marker => (
            <Marker
              key={marker.id}
              position={{ lat: marker.startLat, lng: marker.startLng }}
              title={marker.name}
              icon={{
                url: '/img/pin.png',
                scaledSize: new google.maps.Size(43, 34),
              }}
              onClick={() => {
                openModal('volunteerInfo');
                props.setSelected(marker.id || null);
              }}
            />
          ))}
        </GoogleMap>
      </LoadScript>

      {
        isModal &&
        modalId === 'volunteerInfo' &&
        props.selected &&
        (() => {
          const selectedData = props.markers.find(m => m.id === props.selected);
          if (!selectedData) return null;

          return (
            <Modal
              content={<ModalMapInfo data={selectedData} />}
              type="center"
            />
          );
        })()
      }
    </>
  );
}
