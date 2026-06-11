    import CountUpModule from "react-countup";
    import { useInView } from "react-intersection-observer";

    const CountUp = CountUpModule.default;

    function AnimatedCounter({
        end,
        suffix = "",
        duration = 2,
    }) {
        const { ref, inView } = useInView({
            triggerOnce: true,
        });

        return (
            <span ref={ref}>
                {inView && (
                    <CountUp
                        end={end}
                        duration={duration}
                    />
                )}
                {suffix}
            </span>
        );
    }

    export default AnimatedCounter;