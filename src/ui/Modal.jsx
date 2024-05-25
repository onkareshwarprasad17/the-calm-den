import { cloneElement, createContext, useContext, useState } from "react";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext();

function Modal({ children }) {
  /*
        The reason we are setting the state as a string value and not boolean (true or false) is because
        --> The value of openName property will allow us to have one Modal component but to open multiple windows inside of it.

        If we pass true or false, then to have multiple windows(i.e. modals), we would have to declare this Modal component all over again
        This current implementation with the use of openName property will help the Modal to know which window it needs to open
    */
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ close, open, openName }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: modalOpenName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(modalOpenName) });
}

function Window({ children, name }) {
  const { close, openName } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (openName !== name) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
