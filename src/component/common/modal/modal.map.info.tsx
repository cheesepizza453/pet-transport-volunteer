import React from 'react';
import { VolunteerFormData } from '../../../../interface/interface.common';

interface IProps{
    data: VolunteerFormData;
}

export default function ModalMapInfo({ data }: IProps) {

  function formatDate(date: string | Date): string {
    const d = new Date(date);
    return d.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }

    return (
      <div className="w-[85vw] h-[55dvh] px-[25px] pb-[40px] overflow-y-scroll overflow-x-hidden">
        <p className="font-18 text-left font-extrabold">{data.title}</p>
        <div className={'relative mt-[20px]'}>
          <figure className={'relative w-full min-h-[300px] bg-gray-100 rounded-[12px] overflow-hidden'}>
            <img className={'absolute w-full h-full object-cover left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'} src={data.image} alt=""/>
            <i
              className={'absolute top-0 left-0 block w-full h-full bg-gradient-to-b from-transparent to-black/50'}></i>
          </figure>
          <div className={'absolute left-0 w-full bottom-[15px] px-[15px]'}>
            <div className={'w-full flex justify-between'}>
              <p className={'mt-[8px] w-full font-18 font-bold text-white'}>{data.name} ({data.weight}kg)</p>
              <p className={'flex self-end justify-end mt-[8px] w-full font-14 text-white text-right'}>{data.age}세
                | {data.gender}</p>
            </div>
            <p className={'mt-[8px] w-full font-14 text-left font-light text-white'}>{data.desc}</p>
          </div>
        </div>

        <div className={'bg-[#F3F1EB] mt-[20px] rounded-[12px] p-[20px]'}>
          <div className={'flex w-full items-center gap-x-[6px]'}>
            <p className={'shrink-0 font-15 font-extrabold text-[#333333] tracking-[-0.5px]'}>출발 지역</p>
            <p className={'w-full font-pretendard font-15 tracking-[-0.5px]'}>{data.startAddress}</p>
          </div>
          <div className={'flex w-full items-center gap-x-[6px] mt-[6px] tracking-[-0.5px]'}>
            <p className={'shrink-0 font-15 font-extrabold text-[#333333] tracking-[-0.5px]'}>도착 지역</p>
            <p className={'w-full font-pretendard font-15'}>{data.arriveAddress}</p>
          </div>
        </div>

        <div className={'bg-[#F3F1EB] mt-[20px] rounded-[12px] p-[20px]'}>
          <div className={'flex flex-col w-full gap-x-[6px] text-left'}>
            <p className={'mb-[10px] text-left font-15 font-extrabold text-[#333333] tracking-[-0.5px]'}>{data.requesterName}</p>
            <p className={'mb-[4px] w-full font-pretendard font-14 tracking-[-0.2px]'}>{data.requesterInfo}</p>
            <p className={'mb-[20px] w-full font-pretendard font-12 tracking-[-0.2px] text-gray-500'}>{formatDate(data.createdAt)}</p>
          </div>
          <div className={''}>
            {/*<span className={'font-bold font-14 text-[#3d9eef]'}>채팅 하기</span>*/}
            <span className={'font-bold font-14 text-[#3d9eef]'}>오픈카톡방 가기</span>
            <a href={`sms:${data.requesterPhone}`} className={'ml-[20px] font-bold font-14 text-[#3d9eef]'}>문자하기</a>
          </div>
        </div>
      </div>
    );
}
