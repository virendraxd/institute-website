import { useInView } from "react-intersection-observer";

export function useCountUpAnimation() {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  return { ref, inView };
};