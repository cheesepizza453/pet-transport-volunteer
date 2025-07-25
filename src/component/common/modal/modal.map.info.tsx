

interface IProps {
    data?: {
        id: number;
        name: string;
        position: {
            lat: number;
            lng: number;
        };
        from: string;
        to: string;
        requester: string;
        contact: string;
        note: string;
        image: string;
    } | undefined;
}

export default function ModalMapInfo(props: IProps) {
    return(
        <div className={'flex items-center flex-col w-[500px] h-[600px] p-[30px] '}>
            <p className={'font-15 font-bold'}>이동 봉사 정보</p>
            <p className={'mt-[30px]'}>출발 지역 {props.data && props.data.from}</p>
            <p>도착 지역 {props.data && props.data.to}</p>
            <p>강아지 이름 {props.data && props.data.name}</p>
            <figure>
                <img src={props.data && props.data.image} alt=""/>
            </figure>
            <p>의뢰자 {props.data && props.data.requester}</p>
            <p>의뢰자 연락처 {props.data && props.data.contact}</p>
            <p>{props.data && props.data.note}</p>
        </div>
    )
}