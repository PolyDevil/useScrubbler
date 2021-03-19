export type Value = number | string | undefined;

export type Props = {
	value?: Value;
	min?: Value;
	max?: Value;
	step?: Value;
	isInteger?: boolean;
	toFixed?: number;
	className?: string;
};
