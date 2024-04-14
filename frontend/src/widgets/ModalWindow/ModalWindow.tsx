"use client";
import { useEffect, useRef } from "react";
import s from "./ModalWindow.module.scss";
import { CSSTransition } from "react-transition-group";
import { Portal } from "react-portal";

// TODO: types
interface ModalWindowProps {
  children: any;
  visible: any;
  setVisible: any;
  goBack?: () => void;
  h3?: string;
  mode?: string;
}

const ModalWindow = ({
  children,
  visible,
  setVisible,
  h3,
  mode,
}: ModalWindowProps) => {
  const rootClasses = [s.modal, mode && s[mode]];
  if (visible === true) {
    rootClasses.push(s.active);
  }

  const nodeRef = useRef(null);

  // Forbid body scrolling
  useEffect(() => {
    if (visible === true) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
  }, [visible]);

  return (
    <Portal>
      <div className={rootClasses.join(" ")} onClick={() => setVisible(false)}>
        <CSSTransition
          nodeRef={nodeRef}
          in={visible}
          timeout={200}
          classNames="modal"
        >
          <div
            className={s.content}
            onClick={(event) => event.stopPropagation()}
            ref={nodeRef}
          >
            <div className={s.ModalHeader}>
              <header>
                <div className={s.close}>
                  <a
                    onClick={() => {
                      setVisible(false);
                    }}
                  >
                    <div></div>
                    <div></div>
                  </a>
                </div>
                {h3 && <h3>{h3}</h3>}
              </header>
            </div>

            <div className={s.ModalBody}>{children}</div>
          </div>
        </CSSTransition>
        <div className={s.overlay}></div>
      </div>
    </Portal>
  );
};

export default ModalWindow;
