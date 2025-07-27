import React from "react";
import useStoreContent from "../../store/store.content";
import Modal from "../common/modal/modal";
import ModalMapInfo from "../common/modal/modal.map.info";
import { VolunteerFormData } from '../../../interface/interface.common';

type IProps = {
  markers: VolunteerFormData[];
  setMarkers: React.Dispatch<React.SetStateAction<VolunteerFormData[]>>;
  selected: string | null;
  setSelected: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function ComponentMainList(props:IProps) {
  const { openModal, isModal, modalId } = useStoreContent();

  return (
    <>
    <div className={'absolute bottom-0 w-full bg-[white] p-[30px] pt-[30px] pb-[40px] h-[28dvh] overflow-y-scroll'}>
      <p className={'font-bold font-16'}>{props.markers.length || 0}마리의 반려동물이 이동을 기다리고 있어요.</p>
    <ul className={'mt-[20px] flex flex-col'}>
      {props.markers.map((marker) => (
        <li key={marker.id} className={'mb-[15px] flex p-[15px] rounded-[10px] overflow-hidden cursor-pointer'}
            onClick={() => {
              openModal('volunteerInfo');
              props.setSelected(marker.id ?? null);
            }}>
          <figure className={'shrink-0 w-[60px] h-[60px] rounded-[10px] overflow-hidden mr-[10px]'}>
            <img src={marker.image} alt={marker.title}/>
          </figure>
          <div className={'w-0 flex-1'}>
            <h5 className={'w-full truncate font-16 font-bold'}>{marker.title}</h5>
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