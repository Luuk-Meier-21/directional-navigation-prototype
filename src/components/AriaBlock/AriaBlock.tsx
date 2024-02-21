import {ElementType, ReactNode, forwardRef} from "react";
import {AsElementProps} from "../../types/as-element";

type AriaBlockProps<T extends ElementType> = {
  children?: ReactNode | ReactNode[];
} & AsElementProps<T>;

const AriaBlock = forwardRef(function AriaBlock<T extends ElementType>(
  {as, children, ...props}: AriaBlockProps<T>,
  ref?: any
) {
  const Element = as || "div";

  return (
    <Element
      ref={ref}
      data-testid="AriaBlock"
      data-component-name="AriaBlock"
      {...props}
    >
      {children}
    </Element>
  );
});

export default AriaBlock;
