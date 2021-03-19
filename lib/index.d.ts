/// <reference types="react" />
import { Props, Value } from './types';
declare const useScrubbler: ({ value: initialValue, min, max, step, isInteger, toFixed, className, }: Props) => {
    value: Value;
    onChange: import("react").Dispatch<import("react").SetStateAction<Value>>;
    onMouseDown: ({ clientX }: React.MouseEvent) => void;
};
export default useScrubbler;
