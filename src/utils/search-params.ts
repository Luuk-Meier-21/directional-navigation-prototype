import {useState} from "react";

export function useSearchParams(): [
  Record<string, string>,
  (query: Record<string, string>) => void
] {
  const getParams = () => {
    const queryParameters = new URLSearchParams(window.location.search);
    const newSearchParams: Record<string, string> = {};

    for (const [key, value] of queryParameters.entries()) {
      newSearchParams[key] = value;
    }

    return newSearchParams;
  };

  const [params] = useState<Record<string, string>>(getParams());

  // useEffect(() => {
  //   console.log(params);
  // }, [params]);

  // const a = useCallback(() => {
  //   (a: Record<string, string>) => {
  //     setParams(a);
  //   };
  // }, [params]);

  return [params, () => {}];
}
