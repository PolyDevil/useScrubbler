import { Props, Value } from './types';
export default class Format {
    static int(v: Value): number;
    static toFixed(value: Props['value'], isInteger: Props['isInteger'], toFixed: Props['toFixed']): Value;
    static getValueWithinLimits(min: Props['min'], max: Props['max'], value: Props['value'], isInteger: Props['isInteger'], toFixed: Props['toFixed']): Value;
}
