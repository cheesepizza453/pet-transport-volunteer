import React from 'react';
import Script from "next/script";
import type { VolunteerFormData } from '@/component/common/modal/modal.add.info'

interface IProps{
    data: {
      title: string;
      name: string;
      startAddress: string;
      startLat: number;
      startLng: number;
      arriveAddress: string;
      arriveLat: number;
      arriveLng: number;
      supportOptions: string[]
      gender: string;
      age: number;
      weight: number;
      image: string;
      desc: string;
      contact: string;
      phone: string;
    };
}

export default function ModalMapInfo({ data }: IProps) {
  console.log(data);
    return (
      <div className="w-[85vw] h-[500px] px-[50px] pb-[40px] overflow-y-scroll overflow-x-hidden">
        <p className="font-18 text-left font-extrabold">{data.title}</p>
        <div className={'relative mt-[20px]'}>
          <figure className={'relative w-full min-h-[300px] bg-gray-100 rounded-[12px] overflow-hidden'}>
            <img src={data.image} alt=""/>
            <i
              className={'absolute top-0 left-0 block w-full h-full bg-gradient-to-b from-transparent to-black/50'}></i>
          </figure>
          <div className={'absolute left-0 w-full bottom-[15px]'}>
            <div className={'px-[15px] w-full flex justify-between'}>
              <p className={'mt-[8px] w-full font-18 font-bold text-white'}>{data.name} ({data.weight}kg)</p>
              <p className={'flex self-end justify-end mt-[8px] w-full font-14 text-white text-right'}>{data.age}세
                | {data.gender}</p>
            </div>
            <p className={'mt-[8px] w-full font-14 font-light text-white text-right'}>{data.desc}</p>
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
            <p className={'text-left font-15 font-extrabold text-[#333333] tracking-[-0.5px]'}>한사랑 멈무 사랑 보호소</p>
            <p className={'mt-[10px] w-full font-pretendard font-14 tracking-[-0.2px]'}>안녕하세요. 파주시에서 강아지를 보호하고 있는 한사랑 멈무
              사랑 보호소 입니다.</p>
            <p className={'mt-[4px] w-full font-pretendard font-12 tracking-[-0.2px] text-gray-500'}>2025.07.25 부터 2026.01.01 까지 구인 예정</p>
          </div>
          <div className={'mt-[20px]'}>
            <span className={'font-bold font-14 text-[#3d9eef]'}>채팅 하기</span>
            <span className={'ml-[20px] font-bold font-14 text-[#3d9eef]'}>오픈카톡방 가기</span>
          </div>
        </div>
      </div>
    );
}
