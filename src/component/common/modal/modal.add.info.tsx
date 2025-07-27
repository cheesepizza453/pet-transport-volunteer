import React, { useState } from 'react';
import Script from 'next/script';
import { componentFunctionSearchAddress } from '../../function/component.function.search.address';
import {submitVolunteer} from "../../../firebase/submitVolunteer";
import useStoreContent from "../../../store/store.content";
import {uploadImage} from "../../../firebase/uploadImage";
import ModalAddInfoImgUploader from './modal.add.info.img.uploader';
import { VolunteerFormData } from 'interface/interface.common';

export default function ModalAddInfo({onSubmit}: {onSubmit: (data: VolunteerFormData) => void}, ): JSX.Element {
  const { closeModal } = useStoreContent();

  const [form, setForm] = useState<VolunteerFormData>({
    title: '',
    name: '',
    startAddress: '',
    startLat: 0,
    startLng: 0,
    arriveAddress: '',
    arriveLat: 0,
    arriveLng: 0,
    gender: '',
    age: 0,
    weight: 0,
    image: '',
    desc: '',
    petDesc: '',
    requesterName: '',
    requesterPhone: '',
    requesterInfo: '',
    createdAt: new Date(),
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const handleSearchStartAddress = () => {
    new (window as any).daum.Postcode({
      oncomplete: async function (data: any) {
        const selectedAddress = data.address;
        const coords = await componentFunctionSearchAddress(selectedAddress);
        if (coords) {
          setForm((prev) => ({
            ...prev,
            startAddress: selectedAddress,
            startLat: coords.lat,
            startLng: coords.lng,
          }));
        } else {
          alert('출발지 주소를 좌표로 변환할 수 없습니다.');
        }
      },
    }).open();
  };

  const handleSearchArriveAddress = () => {
    new (window as any).daum.Postcode({
      oncomplete: async function (data: any) {
        const selectedAddress = data.address;
        const coords = await componentFunctionSearchAddress(selectedAddress);
        if (coords) {
          setForm((prev) => ({
            ...prev,
            arriveAddress: selectedAddress,
            arriveLat: coords.lat,
            arriveLng: coords.lng,
          }));
        } else {
          alert('도착지 주소를 좌표로 변환할 수 없습니다.');
        }
      },
    }).open();
  };

  const handleSubmitInfo = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.title.trim() ||
      !form.desc.trim() ||
      !form.startAddress.trim() ||
      !form.arriveAddress.trim() ||
      !form.name.trim() ||
      !form.image.trim() ||
      !form.requesterName.trim() ||
      !form.requesterPhone.trim() ||
      !form.gender ||
      !form.age
    ) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }

    await submitVolunteer(form);
    onSubmit(form);
    closeModal()
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: ['age', 'weight'].includes(name) ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const url = await uploadImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      console.log("✅ 업로드된 이미지 URL:", url);
      setForm(prev => ({ ...prev, image: url }));
    } catch (err) {
      alert("이미지 업로드에 실패했습니다.");
    }
  };

  const handleImageUploadRemove = () => {
    setForm(prev => ({ ...prev, image: '' }));
    setImagePreview(null);
  };

  return (
    <div className="w-[85vw] h-[500px] px-[30px] pb-[40px] overflow-y-scroll overflow-x-hidden">
      <Script
        src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="afterInteractive"
        onLoad={() => setIsScriptLoaded(true)}
      />
      <p className="font-24 text-center font-pretendard font-bold">이동 도움 구하기</p>
      <p className={'mt-[8px] font-12 text-[#aaa] text-center tracking-[-0.4px]'}>
        * 표시된 항목은 필수 입력 항목입니다.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col mt-[20px]">
        <h4 className={'mt-[15px] font-bold font-16'}>이동 봉사 정보</h4>
        <div className={'mt-[20px]'}>
          <label className={'font-14 font-bold font-pretendard text-[#333333]'} htmlFor={'title'}>
            제목 <sup className={'text-red-500'}>*</sup>
          </label>
          <input
            name="title"
            placeholder="제목을 입력해 주세요."
            onChange={handleChange}
            maxLength={80}
            className="w-full mt-[8px] px-[10px] h-[40px] font-14 font-pretendard border-none rounded-[4px] bg-white"
          />
        </div>
        <div className={'flex flex-col mt-[20px]'}>
          <label
            className={'font-14 font-bold font-pretendard text-[#333333]'}
            htmlFor={'startAddress'}
          >
            이동 경로 <sup className={'text-red-500'}>*</sup>
          </label>
          <div className={'flex mt-[8px]'}>
            <input
              type="text"
              name="startAddress"
              value={form.startAddress}
              readOnly
              placeholder="출발지 주소를 검색해주세요"
              className="w-full px-[10px] h-[40px] border-none font-pretendard font-14 rounded-[4px] bg-white"
            />
            <button
              type="button"
              onClick={handleSearchStartAddress}
              className="font-15 shrink-0 ml-[10px] rounded-[4px] border-none text-white px-[10px] h-[40px] bg-[#ff872a] cursor-pointer"
            >
              출발지 검색
            </button>
          </div>
        </div>
        <div className={'flex mt-[10px]'}>
          <input
            type="text"
            name="aliveAddress"
            value={form.arriveAddress}
            readOnly
            placeholder="도착지 주소를 검색해주세요"
            className="w-full px-[10px] h-[40px] border-none font-pretendard font-14 rounded-[4px] bg-white"
          />
          <button
            type="button"
            onClick={handleSearchArriveAddress}
            className="font-15 shrink-0 ml-[10px] rounded-[4px]  font-pretendard font-14  border-none text-white px-[10px] h-[40px] bg-[#ff872a] cursor-pointer"
          >
            도착지 검색
          </button>
        </div>
        <div className={'mt-[20px]'}>
          <label className={'font-14 font-bold font-pretendard text-[#333333]'} htmlFor={'desc'}>
            이동 설명 <sup className={'text-red-500'}>*</sup>
          </label>
          <textarea
            name={'desc'}
            onChange={handleChange}
            className={'mt-[8px] w-full h-[100px] font-pretendard font-14 p-[10px]'}
            maxLength={500}
            placeholder={'출발, 도착 장소에 대해 설명해주세요.'}
          ></textarea>
        </div>
        <h4 className={'mt-[35px] font-bold font-16'}>반려동물</h4>
        <div className={'mt-[20px]'}>
          <label className={'font-14 font-bold font-pretendard text-[#333333]'} htmlFor={'name'}>
            반려동물 이름 <sup className={'text-red-500'}>*</sup>
          </label>
          <input
            name="name"
            placeholder="반려동물 이름을 입력해주세요."
            onChange={handleChange}
            className="mt-[8px] w-full px-[10px] h-[40px] font-14 font-pretendard border-none rounded-[4px] bg-white"
          />
        </div>
        <ModalAddInfoImgUploader imagePreview={imagePreview} handleImageUpload={handleImageUpload}
                                 handleImageUploadRemove={handleImageUploadRemove} />
        <div className={'mt-[40px]'}>
          <label className={'font-14 font-bold font-pretendard text-[#333333]'} htmlFor={'name'}>
            정보 <sup className={'text-red-500'}>*</sup>
          </label>
          <div className={'flex gap-x-[15px] mt-[8px]'}>
            <div className={'flex items-center'}>
              <input
                name="weight"
                placeholder={'0'}
                onChange={handleChange}
                className={
                  'w-[50px] px-[10px] h-[40px] border-none font-14 font-pretendard rounded-[4px] bg-white'
                }
              />
              <p className={'ml-[5px] font-12 font-pretendard'}>kg</p>
            </div>
            <div className={'flex items-center'}>
              <input
                name="age"
                placeholder={'0'}
                onChange={handleChange}
                className={
                  'w-[50px] px-[10px] h-[40px] border-none font-14 font-pretendard rounded-[4px] bg-white'
                }
              />
              <p className={'ml-[5px] font-12 font-pretendard'}>살</p>
            </div>
            <div className="flex gap-[10px]">
              <label className="flex items-center gap-[5px] font-12 font-pretendard">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div
                  className="w-[16px] h-[16px] rounded-full border-white bg-white
                                peer-checked:border-white border-4 peer-checked:bg-[#ff872a]
                              "
                ></div>
                <span className="mq-[2px] font-pretendard font-14">여</span>
              </label>

              <label className="flex items-center gap-[5px] font-12 font-pretendard">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div
                  className="w-[16px] h-[16px] rounded-full border-white bg-white
                                peer-checked:border-white border-4 peer-checked:bg-[#ff872a]
                              "
                ></div>
                <span className="mq-[2px] font-pretendard font-14">남</span>
              </label>
            </div>
          </div>
        </div>
        <div className={'mt-[20px]'}>
          <label
            className={'font-14 font-bold font-pretendard text-[#333333]'}
            htmlFor={'petDesc'}
          >
            반려동물 소개
          </label>
          <textarea
            name={'petDesc'}
            onChange={handleChange}
            className={'mt-[8px] w-full h-[100px] font-pretendard font-14 p-[10px]'}
            maxLength={300}
            placeholder={'이동할 반려동물을 소개해주세요.'}
          ></textarea>
        </div>
        <h4 className={'mt-[35px] font-bold font-16'}>작성자</h4>
        <div className={'mt-[20px]'}>
          <label className={'font-14 font-bold font-pretendard text-[#333333]'} htmlFor={'requesterName'}>
            작성자 정보 <sup className={'text-red-500'}>*</sup>
          </label>
          <input
            name="requesterName"
            placeholder="작성자 또는 보호소 이름을 입력해 주세요."
            onChange={handleChange}
            maxLength={80}
            className="w-full mt-[8px] px-[10px] h-[40px] font-14 font-pretendard border-none rounded-[4px] bg-white"
          />
        </div>
        <div className={'mt-[20px]'}>
          <label className={'font-14 font-bold font-pretendard text-[#333333]'} htmlFor={'requesterPhone'}>
            작성자 연락처 <sup className={'text-red-500'}>*</sup>
          </label>
          <input
            name="requesterPhone"
            placeholder="봉사자가 연락할 수 있는 휴대폰 번호를 입력해주세요."
            onChange={handleChange}
            maxLength={80}
            className="w-full mt-[8px] px-[10px] h-[40px] font-14 font-pretendard border-none rounded-[4px] bg-white"
          />
        </div>
        <div className={'mt-[20px]'}>
          <label className={'font-14 font-bold font-pretendard text-[#333333]'} htmlFor={'requesterInfo'}>
            작성자 소개
          </label>
          <textarea
            name={'requesterInfo'}
            onChange={handleChange}
            className={'mt-[8px] w-full h-[60px] font-pretendard font-14 p-[10px]'}
            maxLength={200}
            placeholder={'작성자 또는 보호소를 소개해주세요.'}
          ></textarea>
        </div>
        <button
          onClick={handleSubmitInfo}
          type="submit"
          className="mt-[20px] p-[15px] rounded-[4px] text-white border-none bg-[#ff872a] font-15 "
        >
          등록
        </button>
      </form>
    </div>
  );
}
