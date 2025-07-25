import { IModal } from '@/interface/interface.common';
import { createPortal } from 'react-dom';
import useStoreContent from '@/store/store.content';
import { useEffect, useState } from 'react';
interface IProps extends IModal {
    className?: string
}

export default function Modal(props: IProps) {
    const { isModal, closeModal } = useStoreContent();
    const [target, setTarget] = useState<HTMLElement | null>(null);
    const [localOpen, setLocalOpen] = useState(false);


    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;

        if (isModal && props.type === 'bottom') {
            timer = setTimeout(() => {
                setLocalOpen(true);
            }, 100);
        } else if (!isModal && props.type === 'bottom') {
            setLocalOpen(false);
            timer = setTimeout(() => {
            }, 300);
        } else {
            setLocalOpen(isModal);
        }

        return () => {
            clearTimeout(timer);
        };
    }, [isModal, props.type]);

    useEffect(() => {
        const el = props.renderTarget ?? document.getElementById('frame-popup') ?? document.body;
        setTarget(el);
    }, [props.renderTarget]);

    useEffect(() => {
        if (isModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isModal]);

    if (!target) return null;

    return createPortal(
    <div
        className={`fixed top-[0] left-[0] w-full h-full overflow-hidden z-[10]`}
    >
      <span
          className='block absolute top-[0] left-[0] w-full h-full overflow-hidden bg-[rgba(0,0,0,0.5)] z-[11]'
          onClick={() => closeModal()}
      ></span>
            <div className={'relative flex justify-center items-center h-full'}>
                <article
                    className={
                        `mq-[padding|30px_20px<38px_35px] rounded-[30px] relative flex justify-center items-center overflow-hidden bg-[#F3F1EB] z-[12] ${props.className && props.className}`
                    }
                >
                    {props.content}
                </article>
            </div>
        </div>,
        target!
    );
}
