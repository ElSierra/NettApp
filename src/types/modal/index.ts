import { Dispatch, ReactNode, SetStateAction } from "react";

export interface ModalProviderProps {
  children: ReactNode;
}

export interface ModalArgs {
  title: string;
  message: string;
  actionBtnText: string;
  action: string;
  param?: boolean;
}

export interface ModalState {
  showModal: boolean;
  title: string;
  message: string;
  actionBtnText: string;
  action: string;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  param?: boolean | undefined;
  setParam: Dispatch<SetStateAction<boolean | undefined>>;
  showModalAndContent: ({ title, message, actionBtnText }: ModalArgs) => void;
  closeModal: () => void;
}
