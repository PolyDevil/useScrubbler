/// <reference types="react" />
import { Props, Value } from "./types";
declare const useScrubbler: ({ value: initialValue, min, max, step, isInteger, toFixed, className }: Props) => {
    value: Value;
    onChange: import("react").Dispatch<import("react").SetStateAction<Value>>;
    onScrubble: (e: React.MouseEvent | React.TouchEvent) => void;
    getScrubbler: () => {
        onMouseDown: (e: React.MouseEvent | React.TouchEvent) => void;
        onTouchStart: (e: React.MouseEvent | React.TouchEvent) => void;
    };
};
export default useScrubbler;
