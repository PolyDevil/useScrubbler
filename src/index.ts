import { useCallback, useEffect, useState, useRef } from "react";
import Format from "./format";
import { getClientX } from "./helpers";
import { Props, Value } from "./types";

const defaultClassName = "scrubbing";

const useScrubbler = ({
	value: initialValue,
	min,
	max,
	step,
	isInteger,
	toFixed,
	className
}: Props) => {
	const [value, setValue] = useState<Value>(
		Format.getValueWithinLimits(min, max, initialValue, isInteger, toFixed)
	);
	const capturingMode = useRef(false);
	const prevValueRef = useRef(value);
	const prevPositionRef = useRef(0);

	const onScrubble = useCallback(
		(e: React.MouseEvent | React.TouchEvent) => {
			const clientX = 0;

			prevPositionRef.current = clientX;

			setValue((prev: Value) => {
				prevValueRef.current = Number(prev) ?? 0;
				return prev;
			});

			capturingMode.current = true;
			document.body.classList.add(className || defaultClassName);
		},
		[capturingMode, setValue, prevValueRef, prevPositionRef, className]
	);

	const getScrubbler = useCallback(
		() => ({
			onMouseDown: onScrubble,
			onTouchStart: onScrubble
		}),
		[onScrubble]
	);

	useEffect(() => {
		const move = (e: MouseEvent | TouchEvent) => {
			if (capturingMode.current) {
				e.preventDefault();
				e.stopPropagation();

				const clientX = getClientX(e);
				const dx = (clientX - prevPositionRef.current) * (Number(step) || 1);
				let i1 = (Number(prevValueRef.current) || 0) + dx;

				if (min) {
					i1 = Math.max(i1, Number(min));
				}
				if (max) {
					i1 = Math.min(i1, Number(max));
				}

				setValue(Format.toFixed(i1, isInteger, toFixed));
			}
		};

		const up = (e: MouseEvent | TouchEvent) => {
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

export default useScrubbler;
