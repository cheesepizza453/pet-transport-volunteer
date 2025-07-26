import { VolunteerMarkers } from "interface/interface.common";
import React from "react";
import useStoreContent from "../../store/store.content";
import Modal from "../common/modal/modal";
import ModalMapInfo from "../common/modal/modal.map.info";

type IProps = {
  markers: VolunteerMarkers[];
  setMarkers: React.Dispatch<React.SetStateAction<VolunteerMarkers[]>>;
  selected: string | null;
  setSelected: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function ComponentMainList(props:IProps) {
  const { openModal, isModal, modalId } = useStoreContent();

  return (
    <>
    <div className={'p-[30px] pt-[40px] pb-[100px] h-[300px] overflow-y-scroll'}>
      <p className={'font-bold font-14'}>{props.markers.length || 0}마리의 반려동물이 이동을 기다리고 있어요.</p>
    <ul className={'mt-[30px] flex flex-col'}>
      {props.markers.map((marker) => (
        <li key={marker.id} className={'mb-[15px] flex bg-[#f8f8f8] p-[15px] rounded-[10px] overflow-hidden cursor-pointer'}
            onClick={() => {
              openModal('volunteerInfo');
              props.setSelected(marker.id);
            }}>
          <figure className={'shrink-0 w-[60px] h-[60px] rounded-[10px] overflow-hidden mr-[10px]'}>
            <img src={marker.image} alt={marker.title}/>
          </figure>
          <div className={'pr-[50px]'}>
            <p className={'truncate font-16 font-bold'}><strong>{marker.title}</strong></p>
            <p className={'truncate mt-[4px] font-14 font-light'}>{marker.name}</p>
          </div>
        </li>
      ))}
    </ul>
    </div>
    {
      isModal &&
      modalId === 'volunteerInfo' &&
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
  )
}