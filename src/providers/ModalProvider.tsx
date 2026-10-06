import {
    createContext, useCallback,
    useMemo,
    useState,
} from "react";

import * as React from "react";

type tModalContext = {
    isOpen: React.ReactNode | null;
    openModal: (modal: React.ReactNode) => void;
    closeModal: () => void;
};

type tModalProviderProps = {
    children: React.ReactNode;
};

export const ModalContext = createContext<tModalContext | null>(null);

const ModalProvider: React.FC<tModalProviderProps> = ({ children }) => {
    const [isOpen, setOpen] = useState<React.ReactNode | null>(null);

    const openModal = useCallback((modal: React.ReactNode) => {
        document.body.classList.add('no-scroll');
        setOpen(modal);
    }, []);

    const closeModal = useCallback(() => {
        document.body.classList.remove('no-scroll');
        setOpen(null);
    }, []);

    const value = useMemo<tModalContext>(() => ({
        isOpen,
        openModal,
        closeModal,
    }), [isOpen, openModal, closeModal]);

    return (
        <ModalContext.Provider value={value}>
            {children}

            {isOpen && (
                <div
                    className='bg-[#17181c]/50 fixed top-0 z-10  flex items-center justify-center h-screen w-full'
                    onClick={closeModal}
                >
                    {isOpen}
                </div>
            )}
        </ModalContext.Provider>
    );
}

export default ModalProvider;