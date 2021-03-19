"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const format_1 = require("./format");
const helpers_1 = require("./helpers");
const defaultClassName = "scrubbing";
const useScrubbler = ({ value: initialValue, min, max, step, isInteger, toFixed, className }) => {
    const [value, setValue] = react_1.useState(format_1.default.getValueWithinLimits(min, max, initialValue, isInteger, toFixed));
    const capturingMode = react_1.useRef(false);
    const prevValueRef = react_1.useRef(value);
    const prevPositionRef = react_1.useRef(0);
    const onScrubble = react_1.useCallback((e) => {
        const clientX = 0;
        prevPositionRef.current = clientX;
        setValue((prev) => {
            var _a;
            prevValueRef.current = (_a = Number(prev)) !== null && _a !== void 0 ? _a : 0;
            return prev;
        });
        capturingMode.current = true;
        document.body.classList.add(className || defaultClassName);
    }, [capturingMode, setValue, prevValueRef, prevPositionRef, className]);
    const getScrubbler = react_1.useCallback(() => ({
        onMouseDown: onScrubble,
        onTouchStart: onScrubble
    }), [onScrubble]);
    react_1.useEffect(() => {
        const move = (e) => {
            if (capturingMode.current) {
                e.preventDefault();
                e.stopPropagation();
                const clientX = helpers_1.getClientX(e);
                const dx = (clientX - prevPositionRef.current) * (Number(step) || 1);
                let i1 = (Number(prevValueRef.current) || 0) + dx;
                if (min) {
                    i1 = Math.max(i1, Number(min));
                }
                if (max) {
                    i1 = Math.min(i1, Number(max));
                }
                setValue(format_1.default.toFixed(i1, isInteger, toFixed));
            }
        };
        const up = (e) => {
            if (capturingMode.current) {
                e.preventDefault();
                e.stopPropagation();
                capturingMode.current = false;
                document.body.classList.remove(className || defaultClassName);
            }
        };
        document.addEventListener("mousemove", move);
        document.addEventListener("touchmove", move);
        document.addEventListener("mouseup", up);
        document.addEventListener("touchend", up);
        return () => {
            document.removeEventListener("mousemove", move);
            document.removeEventListener("touchmove", move);
            document.removeEventListener("mouseup", up);
            document.removeEventListener("touchend", up);
        };
    }, [
        capturingMode,
        setValue,
        prevPositionRef,
        prevValueRef,
        min,
        max,
        step,
        isInteger,
        toFixed,
        className
    ]);
    return {
        value,
        onChange: setValue,
        onScrubble,
        getScrubbler
    };
};
exports.default = useScrubbler;
