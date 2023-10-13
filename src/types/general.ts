import { ReactNode } from "react";

export type ButtonProps = {
  children: ReactNode;
  clickHandler?: () => void;
  classnames?: string;
  variant: "small" | "large";
};

export type CompetitonReview = {
  brand: string;
  activation: string;
  isPromoRunning: boolean;
  mechanism: string;
  date: Date;
  otherInfo: string;
  image?: string;
};
