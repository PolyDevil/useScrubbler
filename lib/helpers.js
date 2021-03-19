"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientX = void 0;
const getClientX = (e) => {
    if (e instanceof MouseEvent) {
        return e.clientX;
    }
    if (e instanceof TouchEvent) {
        return e.touches[0].clientX;
    }
    return 0;
};
exports.getClientX = getClientX;
