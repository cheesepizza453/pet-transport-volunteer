import useStoreContent from "../../store/store.content";
import Modal from "../common/modal/modal";
import React from "react";
import ModalAddInfo from "../common/modal/modal.add.info";
import { VolunteerFormData } from 'interface/interface.common';

type IProps = {
    markers: VolunteerFormData[];
    setMarkers: React.Dispatch<React.SetStateAction<VolunteerFormData[]>>;
};

export default function ComponentMainAdd(props:IProps) {
    const inLogin = useStoreContent(state => state.inLogin);
    const { openModal, isModal, modalId } = useStoreContent();

    const handleSubmit = (data: VolunteerFormData) => {
        console.log('📌 등록된 데이터:', data);
        // 여기에 상태 업데이트나 서버 요청 로직 작성
        // 예: setMarkers([...markers, newMarker])
    };

    return(
        <>
            { inLogin &&
            <button onClick={() => {
                openModal('addInfo')
            }} type={'button'}
                    className={'absolute bottom-[30px] right-[30px] w-[50px] h-[50px] rounded-full overflow-hidden bg-[#63b8ff] text-white font-30 cursor-pointer'}>+
            </button>
            }
            {
                isModal && modalId === 'addInfo' &&
                <Modal content={<ModalAddInfo onSubmit={handleSubmit}/>} type={'center'}/>
            }
        </>
    )
}