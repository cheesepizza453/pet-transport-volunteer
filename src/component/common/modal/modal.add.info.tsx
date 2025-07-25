import { useState } from 'react';
import Script from 'next/script';
import { componentFunctionSearchAddress } from '../../function/component.function.search.address';
import {submitVolunteer} from "../../../firebase/submitVolunteer";

type VolunteerFormData = {
    name: string;
    startAddress: string;
    startLat: number;
    startLng: number;
    arriveAddress: string;
    arriveLat: number;
    arriveLng: number;
    supportOptions: string[]
};

export default function ModalAddInfo({ onSubmit }: { onSubmit: (data: VolunteerFormData) => void }) {
    const [form, setForm] = useState<VolunteerFormData>({
        name: '',
        startAddress: '',
        startLat: 0,
        startLng: 0,
        arriveAddress: '',
        arriveLat: 0,
        arriveLng: 0,
        supportOptions: [],
    });

    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
console.log(form)
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
        await submitVolunteer(form); // form 데이터 파이어베이스로 전송
        onSubmit(form); // 필요하면 callback
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

    return (
        <div className="w-[500px] h-[600px] px-[30px] py-[50px]">
            <Script
                src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
                strategy="afterInteractive"
                onLoad={() => setIsScriptLoaded(true)}
            />
            <p className="mb-4 font-30 text-center font-pretendard font-bold">봉사 정보 등록</p>
            <form onSubmit={handleSubmit} className="flex flex-col mt-[40px]">
                <input name="title" placeholder="제목" onChange={handleChange}
                       className="w-full px-[10px] h-[40px] border-none rounded-[4px] bg-white"/>
                <input name="name" placeholder="강아지 이름" onChange={handleChange}
                       className="mt-[10px] w-full px-[10px] h-[40px] border-none rounded-[4px] bg-white"/>
                <div className={'flex mt-[10px] gap-x-[15px]'}>
                    <div className={'flex items-center'}><input name="kg" placeholder={'0'} onChange={handleChange}
                                                                className={'w-[100px] px-[10px] h-[40px] border-none rounded-[4px] bg-white'}/>
                        <p className={'ml-[5px]'}>kg</p>
                    </div>
                    <div className={'flex items-center'}><input name="age" placeholder={'0'} onChange={handleChange}
                                                                className={'w-[100px] px-[10px] h-[40px] border-none rounded-[4px] bg-white'}/>
                        <p className={'ml-[5px]'}>살</p>
                    </div>
                    <div className="flex gap-[10px]">
                        <label className="flex items-center gap-[5px]">
                            <input
                                type="radio"
                                name="gender"
                                value="female"
                                onChange={handleChange}
                                className="accent-[#ff872a]"
                            />
                            여자
                        </label>
                        <label className="flex items-center gap-[5px]">
                            <input
                                type="radio"
                                name="gender"
                                value="male"
                                onChange={handleChange}
                                className="accent-[#ff872a]"
                            />
                            남자
                        </label>
                    </div>
                </div>
                <div className={'mt-[10px]'}>
                    <textarea className={'w-full h-[100px]'} maxLength={300}></textarea>
                </div>
                <div className={'flex mt-[10px]'}>
                    <input
                        type="text"
                        name="startAddress"
                        value={form.startAddress}
                        readOnly
                        placeholder="주소를 검색해주세요"
                        className="w-full px-[10px] h-[40px] border-none rounded-[4px] bg-white"
                    />
                    <button
                        type="button"
                        onClick={handleSearchStartAddress}
                        className="font-15 shrink-0 ml-[10px] rounded-[4px] border-none bg-red text-white px-[10px] h-[40px] bg-[#ff872a] cursor-pointer"
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
                        placeholder="주소를 검색해주세요"
                        className="w-full px-[10px] h-[40px] border-none rounded-[4px] bg-white"
                    />
                    <button
                        type="button"
                        onClick={handleSearchArriveAddress}
                        className="font-15 shrink-0 ml-[10px] rounded-[4px] border-none bg-red text-white px-[10px] h-[40px] bg-[#ff872a] cursor-pointer"
                    >
                        도착지 검색
                    </button>
                </div>
                <div className="flex gap-[20px] mt-[10px]">
                    <label className="flex items-center gap-[5px]">
                        <input
                            type="checkbox"
                            name="supportOptions"
                            value="kennel"
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
                        켄넬 지원
                    </label>
                    <label className="flex items-center gap-[5px]">
                        <input
                            type="checkbox"
                            name="supportOptions"
                            value="toll"
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
                        톨비 지원
                    </label>
                    <label className="flex items-center gap-[5px]">
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
                    </label>
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
