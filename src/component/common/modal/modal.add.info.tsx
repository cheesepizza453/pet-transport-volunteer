import { useState } from 'react';
import Script from 'next/script';
import { componentFunctionSearchAddress } from '../../function/component.function.search.address';
import {submitVolunteer} from "../../../firebase/submitVolunteer";
import useStoreContent from "../../../store/store.content";
import {uploadImage} from "../../../firebase/uploadImage";

export type VolunteerFormData = {
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

export default function ModalAddInfo({onSubmit}: {onSubmit: (data: VolunteerFormData) => void}, ): JSX.Element {
    const { closeModal } = useStoreContent();

    const [form, setForm] = useState<VolunteerFormData>({
        title:'',
        name: '',
        startAddress: '',
        startLat: 0,
        startLng: 0,
        arriveAddress: '',
        arriveLat: 0,
        arriveLng: 0,
        supportOptions: [],
        gender: '',
        age: 0,
        weight: 0,
        image: '',
        desc:'',
        contact:'',
        phone:'',
    });

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
          !form.name.trim() ||
          !form.image.trim() ||
          !form.startAddress.trim() ||
          !form.arriveAddress.trim() ||
          !form.gender ||
          !form.age ||
          !form.weight
        ) {
            alert("모든 필수 항목을 입력해주세요.");
            return;
        }

        await submitVolunteer(form);
        onSubmit(form);
        closeModal()
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === 'lat' || name === 'lng' ? Number(value) : value,
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
            console.log("✅ 업로드된 이미지 URL:", url);
            setForm(prev => ({ ...prev, image: url }));
        } catch (err) {
            alert("이미지 업로드에 실패했습니다.");
        }
    };

    return (
      <div className="w-[85vw] h-[500px] px-[30px] pb-[40px] overflow-y-scroll overflow-x-hidden">
          <Script
            src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
            strategy="afterInteractive"
            onLoad={() => setIsScriptLoaded(true)}
          />
          <p className="font-24 text-center font-pretendard font-bold">이동 도움 구하기</p>
          <p className={'mt-[8px] font-12 text-[#aaa] text-center'}>* 업로드 90일 경과 후 데이터는 자동 삭제됩니다.</p>
          <form onSubmit={handleSubmit} className="flex flex-col mt-[20px]">
              <div className={''}>
                  <label className={'font-14 font-bold font-pretendard text-[#333333]'} htmlFor={'title'}>제목</label>
                  <input name="title" placeholder="제목을 입력해 주세요." onChange={handleChange} maxLength={80}
                         className="w-full mt-[8px] px-[10px] h-[40px] font-14 font-pretendard border-none rounded-[4px] bg-white"/>
              </div>
              <div className={'mt-[20px]'}>
                  <label className={'font-14 font-bold font-pretendard text-[#333333]'} htmlFor={'name'}>반려동물 이름</label>
                  <input name="name" placeholder="반려동물 이름을 입력해주세요." onChange={handleChange}
                         className="mt-[8px] w-full px-[10px] h-[40px] font-14 font-pretendard border-none rounded-[4px] bg-white"/>
              </div>
              <div className={'relative mt-[20px]'}>
                  <label className={'font-14 font-bold font-pretendard text-[#333333]'} htmlFor={'name'}>반려동물
                      이미지</label>
                  <input className={'opacity-0'} type="file" accept="image/*" onChange={handleImageUpload}/>
                  <div
                    className="absolute flex items-center justify-center top-[22px] font-15 rounded-[4px] border-none bg-red text-white px-[10px] h-[40px] bg-[#ff872a] cursor-pointer"
                  >
                      이미지 첨부
                  </div>
              </div>
              <div className={'mt-[30px]'}>
                  <label className={'font-14 font-bold font-pretendard text-[#333333]'} htmlFor={'name'}>정보</label>
                  <div className={'flex gap-x-[15px] mt-[8px]'}>
                      <div className={'flex items-center'}><input name="weight" placeholder={'0'}
                                                                  onChange={handleChange}
                                                                  className={'w-[50px] px-[10px] h-[40px] border-none font-14 font-pretendard rounded-[4px] bg-white'}/>
                          <p className={'ml-[5px] font-12 font-pretendard'}>kg</p>
                      </div>
                      <div className={'flex items-center'}><input name="age" placeholder={'0'} onChange={handleChange}
                                                                  className={'w-[50px] px-[10px] h-[40px] border-none font-14 font-pretendard rounded-[4px] bg-white'}/>
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
                              <div className="
                                w-[16px] h-[16px] rounded-full border-white bg-white
                                peer-checked:border-white border-4 peer-checked:bg-[#ff872a]
                              "></div>
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
                              <div className="
                                w-[16px] h-[16px] rounded-full border-white bg-white
                                peer-checked:border-white border-4 peer-checked:bg-[#ff872a]
                              "></div>
                              <span className="mq-[2px] font-pretendard font-14">남</span>
                          </label>
                      </div>
                  </div>
              </div>
              <div className={'mt-[20px]'}>
                  <label className={'font-14 font-bold font-pretendard text-[#333333]'} htmlFor={'desc'}>설명</label>
                  <textarea name={'desc'} className={'mt-[8px] w-full h-[100px] font-pretendard font-14 p-[10px]'} maxLength={300} placeholder={'반려동물과 이동 봉사에 대해 설명해주세요.'}></textarea>
              </div>
              <div className={'flex mt-[10px]'}>
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
              <div className="flex gap-[20px] mt-[10px]">

                  <label className="flex items-center gap-[5px] font-12 font-pretendard">
                      <input
                        type="checkbox"
                        name="supportOptions"
                        value="kennel"
                        className={'peer sr-only'}
                        checked={form.supportOptions.includes('kennel')}
                        onChange={(e) => {
                            const {value, checked} = e.target;
                            setForm((prev) => ({
                                ...prev,
                                supportOptions: checked
                                  ? [...prev.supportOptions, value]
                                  : prev.supportOptions.filter((v) => v !== value),
                            }));
                        }}
                      />
                      <div className="
                                w-[16px] h-[16px] rounded-full border-white bg-white
                                peer-checked:border-white border-4 peer-checked:bg-[#ff872a]
                              "></div>
                      <span className="mq-[2px] font-pretendard font-14">켄넬 지원</span>
                  </label>

                  <label className="flex items-center gap-[5px] font-12 font-pretendard">
                      <input
                        type="checkbox"
                        name="supportOptions"
                        value="toll"
                        className={'peer sr-only'}
                        checked={form.supportOptions.includes('toll')}
                        onChange={(e) => {
                            const {value, checked} = e.target;
                            setForm((prev) => ({
                                ...prev,
                                supportOptions: checked
                                  ? [...prev.supportOptions, value]
                                  : prev.supportOptions.filter((v) => v !== value),
                            }));
                        }}
                      />
                      <div className="
                                w-[16px] h-[16px] rounded-full border-white bg-white
                                peer-checked:border-white border-4 peer-checked:bg-[#ff872a]
                              "></div>
                      <span className="mq-[2px] font-pretendard font-14">사례 있음</span>
                  </label>
                  {/*                  <label className="flex items-center gap-[5px]">
                      <input
                        type="checkbox"
                        name="supportOptions"
                        value="carwash"
                        checked={form.supportOptions.includes('carwash')}
                        onChange={(e) => {
                            const {value, checked} = e.target;
                            setForm((prev) => ({
                                ...prev,
                                supportOptions: checked
                                  ? [...prev.supportOptions, value]
                                  : prev.supportOptions.filter((v) => v !== value),
                            }));
                        }}
                      />
                      세차비 지원
                  </label>*/}
              </div>
              <button
                onClick={handleSubmitInfo}
                type="submit"
                className="mt-[20px] p-[15px] rounded-[4px] text-white border-none bg-[#ff872a] font-15 ">
                  등록
              </button>
          </form>
      </div>
    );
}
