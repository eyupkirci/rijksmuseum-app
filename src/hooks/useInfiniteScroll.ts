import { RefObject, useEffect } from "react";
import { debounce } from "lodash";

const useInfiniteScroll = (
  fetchData: () => void,
  isFetching: boolean,
  ref: RefObject<HTMLDivElement>
) => {
  useEffect(() => {
    const handleScroll = debounce(() => {
      if (ref.current) {
        const scrolledToBottom =
          ref.current.scrollTop + ref.current.clientHeight >= ref.current.scrollHeight;
        if (scrolledToBottom && !isFetching) {
          fetchData();
        }
      }
    }, 300);

    const refElement = ref.current;

    if (refElement) {
      refElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (refElement) {
        refElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isFetching, fetchData, ref]);
};

export default useInfiniteScroll;
