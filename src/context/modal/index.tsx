import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import ReactDOM from "react-dom";

interface ModalContextProps {
  isOpen: boolean;
  openModal: (modalContent: React.ReactNode) => void;
  closeModal: () => void;
  modalContent: React.ReactNode;
}

const ModalContext = createContext<ModalContextProps>({
  isOpen: false,
  openModal: (modalContent: React.ReactNode) => {},
  closeModal: () => {},
  modalContent: <></>,
});

const ModalProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(<></>);

  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const modal = document.getElementById("modal");
    if (modal && !modal.contains(event.target as Node)) {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <ModalContext.Provider
      value={{ isOpen, openModal, closeModal, modalContent }}
    >
      {children}
      {isOpen &&
        ReactDOM.createPortal(
          <>
            <div className="absolute left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur-sm">
              <div id="modal">{modalContent}</div>
            </div>
          </>,
          document.body
        )}
    </ModalContext.Provider>
  );
};

const useModal = () => useContext(ModalContext);

export { ModalContext, ModalProvider, useModal };
