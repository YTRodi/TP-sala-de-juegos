type fnType = () => void;

export interface Icon {
  src: string;
  alt: string;
  name?: string;
  onClickFn: fnType;
}
