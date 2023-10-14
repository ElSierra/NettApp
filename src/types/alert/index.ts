import { Dispatch, ReactNode, SetStateAction } from "react";

export interface AlertProviderProps {
  children: ReactNode;
}

export interface AlertArgs {
  type: string;
  message: string;
  timeout?: number | null;
}

export interface AlertState {
  showAlert: boolean;
  alertType: string;
  message: string;
  delay: number;
  setShowAlert: Dispatch<SetStateAction<boolean>>;
  showAlertAndContent: ({ type, message, timeout }: AlertArgs) => void;
  closeAlert: () => void;
}
