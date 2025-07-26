import { create } from 'zustand';
import { IContentSize } from '@/interface/interface.content';

export type ModalId = 'addInfo' | 'volunteerInfo' | null;

type Store = {
    contentSize: IContentSize;
    isModal: boolean;
    modalId: ModalId;
    openModal: (id: ModalId) => void;
    closeModal: () => void;
    setContentSize: (contentSize: IContentSize) => void;
    inLogin: boolean;
    setInLogin: (inLogin: boolean) => void;
};

type Actions = {
    setContentSize: (contentSize: IContentSize) => void;
};

const useStoreContent = create<Store & Actions>()((set, get) => ({
    contentSize: {
        width: 0,
        clientWidth: 0,
        height: 0,
        heightVH: 0,
        minHeight: 0,
        isMobile: false,
        isTablet: false,
        isDesktop: false,
        column: {
            left: 0,
            width: 0,
            gap: 0
        },
        content: {
            left: 0,
            width: 0,
            padding: 0
        },
        header: {
            height: 0
        }
    },
    isModal: false,
    modalId: null,
    inLogin: false,

    openModal: (id) => set({ isModal: true, modalId: id }),
    closeModal: () => {set({ isModal: false, modalId: null })},

    setContentSize: (contentSize: IContentSize) => {
        set({ contentSize: contentSize });
    },

    setInLogin: (inLogin) => set({ inLogin })
}));

export default useStoreContent;
