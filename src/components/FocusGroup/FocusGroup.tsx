import {ElementRef, ElementType, ReactNode, createContext, useRef} from "react";
import {useHotkeys} from "../../utils/hotkeys";
import {AsElementProps} from "../../types/as-element";
import AriaBlock from "../AriaBlock/AriaBlock";

type FocusGroupProps<T extends ElementType> = {
  hotkey: string;
  title: string;

  children: ReactNode | ReactNode[];
} & Partial<AsElementProps<T>>;

function FocusGroup<T extends ElementType>({
  hotkey,
  as,
  children,
  ...props
}: FocusGroupProps<T>) {
  const ref = useRef<ElementRef<"button">>(null);

  useHotkeys(hotkey, (event, handler) => {
    event.preventDefault();

    ref.current?.focus();
  });

  return (
    <AriaBlock ref={ref} as={as || "section"} tabIndex={0} {...props}>
      {children}
    </AriaBlock>
  );
}

export default FocusGroup;
