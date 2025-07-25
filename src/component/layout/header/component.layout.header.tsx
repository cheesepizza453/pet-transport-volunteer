import ComponentSvgHamburger from "../../svg/component.svg.hamburger";
import Image from "next/image";
import {useState} from "react";

function ComponentLayoutHeader() {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // 부모 컴포넌트로 이벤트 전파 안 됨
    };

    return (
        <>
            <div className={'flex justify-between items-center w-full h-[54px] px-[20px]'}>
                <a href={'/'}>
                    <figure className={'w-[40px] h-[40px]'}>
                        <Image src={'/img/logo.png'} alt="" width={40} height={40}/>
                    </figure>
                </a>
                <div className={'cursor-pointer'} onClick={() => setIsOpen(true)}>
                    <figure className={'w-[25px] h-[25px]'}>
                        <ComponentSvgHamburger/>
                        <figcaption></figcaption>
                    </figure>
                </div>
            </div>
            {
                isOpen &&
                <div onClick={()=>{setIsOpen(false)}} className={'fixed flex justify-center top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[10]'}>
                    <div className={'max-w-[720px] w-full mx-auto h-full relative'}>
                        <div onClick={handleClick} className={'absolute py-[100px] px-[50px] top-0 right-0 w-[60%] min-w-[300px] h-[100vh] bg-white z-[20]'}>
                            <h1 className={'font-30 font-pretendard font-light'}><p>국내 강아지 이동봉사</p><strong className={'block mt-[5px] w-full font-bold'}>옆자리멈무</strong></h1>
                        </div>
                    </div>
                </div>
            }

        </>
    )

}

export default ComponentLayoutHeader;