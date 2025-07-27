import React from 'react';
import ComponentSvgClose from '../../svg/component.svg.close';

type IProps = {
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageUploadRemove: () => void;
  imagePreview: string | null;
};

export default function ModalAddInfoImgUploader(props:IProps) {

  return (
    <div className={'relative mt-[20px]'}>
      <label className={'font-14 font-bold font-pretendard text-[#333333]'} htmlFor={'name'}>
        반려동물 이미지 <sup className={'text-red-500'}>*</sup>
      </label>
      <input
        id="pet-image-upload"
        className={'hidden'}
        type="file"
        accept="image/*"
        onChange={props.handleImageUpload}
      />
      <label
        htmlFor={'pet-image-upload'}
        className="relative flex items-center justify-center w-[120px] h-[120px] top-[22px] rounded-[6px] bg-gray-200 border-gray-500 cursor-pointer"
      >
        <figure className={'-rotate-45 w-[10px]'}>
        <ComponentSvgClose/>
        </figure>
        {props.imagePreview && (
          <div>
            <figure className={'absolute top-0 left-0 w-[120px] h-[120px]'}>
              <img
                src={props.imagePreview}
                alt="반려동물 미리보기"
                className="absolute object-cover left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[10px]"
              />
            </figure>
            <button onClick={()=>{props.handleImageUploadRemove()}} type={'button'} className={'absolute top-[5px] right-[5px] w-[16px] h-[16px] rounded-full overflow-hidden bg-white p-[4px]'}>
              <ComponentSvgClose />
            </button>
          </div>
        )}
      </label>

    </div>
  );
}
