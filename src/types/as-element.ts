import {ComponentPropsWithRef, ElementType} from "react";

export type AsElementProps<T extends ElementType> = {
  as: T;
} & ComponentPropsWithRef<T>;
