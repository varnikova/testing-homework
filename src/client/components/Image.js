import React from 'react';
import { cn } from '@bem-react/classname';
var STUB = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkMAYAADkANVKH3ScAAAAASUVORK5CYII=';
var bem = cn('Image');
export var Image = function (_a) {
    var className = _a.className, _b = _a.src, src = _b === void 0 ? STUB : _b;
    return React.createElement("img", { className: bem(null, [className]), src: src });
};
