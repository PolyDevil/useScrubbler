import { useCallback, useEffect, useState, useRef } from 'react';
import Format from './format';
import { Props, Value } from './types';

const defaultClassName = 'scrubbing';

const useScrubbler = ({
	value: initialValue,
	min,
	max,
	step,
	isInteger,
	toFixed,
	className,
}: Props) => {
	const [value, setValue] = useState<Value>(
		Format.getValueWithinLimits(min, max, initialValue, isInteger, toFixed)
	);
	const capturingMode = useRef(false);
	const prevValueRef = useRef(value);
	const prevPositionRef = useRef(0);

	const onMouseDown = useCallback(
		({ clientX }: React.MouseEvent) => {
			prevPositionRef.current = clientX;

			setValue((prev: Value) => {
				prevValueRef.current = Number(prev) ?? 0;
				return prev;
			});

			capturingMode.current = true;
			document.body.classList.add(className || defaultClassName);
		},
		[capturingMode, setValue, prevValueRef, prevPositionRef, className],
	);

	useEffect(() => {
		const mouseMove = (e: MouseEvent) => {
			if (capturingMode.current) {
				e.preventDefault();
				e.stopPropagation();

				const { clientX } = e;
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

		const mouseUp = (e: MouseEvent) => {
			if (capturingMode.current) {
				e.preventDefault();
				e.stopPropagation();
				capturingMode.current = false;
				document.body.classList.remove(className || defaultClassName);
			}
		};

		/* todo: - consider testing and implementing support for touch */
		document.addEventListener('mousemove', mouseMove);
		document.addEventListener('mouseup', mouseUp);

		return () => {
			document.removeEventListener('mousemove', mouseMove);
			document.removeEventListener('mouseup', mouseUp);
		};
	}, [capturingMode, setValue, prevPositionRef, prevValueRef, min, max, step, isInteger, toFixed, className]);

	return {
		value,
		onChange: setValue,
		onMouseDown,
	};
};

export default useScrubbler;
