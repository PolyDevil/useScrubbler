"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Format {
    static int(v) {
        if (typeof v === 'undefined') {
            return 0;
        }
        if (typeof v === 'string') {
            return Number.parseInt(v, 10);
        }
        if (Number.isInteger(v)) {
            return v;
        }
        return Math.floor(v);
    }
    static toFixed(value, isInteger, toFixed) {
        if (isInteger) {
            return value;
        }
        return Number(String(value)).toFixed(toFixed);
    }
    static getValueWithinLimits(min, max, value, isInteger, toFixed) {
        if (value === 'undefined') {
            return '';
        }
        if (isInteger) {
            if (typeof min === 'number' && !Number.isInteger(min)) {
                console.error(`useScrubbler: 'min' can not be float if 'isInteger === true'`);
            }
            if (typeof max === 'number' && !Number.isInteger(max)) {
                console.error(`useScrubbler: 'max' can not be float if 'isInteger === true'`);
            }
            if (typeof value === 'number' && !Number.isInteger(value)) {
                console.error(`useScrubbler: 'value' can not be float if 'isInteger === true'`);
            }
            const minInt = Format.int(min) || Infinity;
            const maxInt = Format.int(max) || -Infinity;
            const valueInt = Format.int(value) || 0;
            let v = valueInt;
            if (valueInt < minInt) {
                v = minInt;
            }
            if (valueInt > maxInt) {
                v = maxInt;
            }
            return Format.toFixed(v, isInteger, toFixed);
        }
        const minFloat = min !== null && min !== void 0 ? min : Infinity;
        const maxFloat = max !== null && max !== void 0 ? max : -Infinity;
        const valueFloat = value !== null && value !== void 0 ? value : 0;
        let v = valueFloat;
        if (valueFloat < minFloat) {
            v = minFloat;
        }
        if (valueFloat > maxFloat) {
            v = maxFloat;
        }
        return Format.toFixed(v, isInteger, toFixed);
    }
}
exports.default = Format;
