export default class Util {
    /**
     *
     * @param base
     * @param extensions
     * @returns {{}|*}
     */
    static deepExtend(base, ...extensions) {
        if (!base) return {};

        for (const obj of extensions) {
            if (!obj) continue;

            for (const [key, value] of Object.entries(obj)) {
                switch (Object.prototype.toString.call(value)) {
                    case "[object Object]":
                        base[key] = base[key] || {};
                        base[key] = Util.deepExtend(base[key], value);
                        break;
                    case "[object Array]":
                        base[key] = Util.deepExtend(new Array(value.length), value);
                        break;
                    default:
                        base[key] = value;
                }
            }
        }

        return base;
    }

    /**
     *
     * @param fn
     */
    static ready(fn) {
        if (document.readyState !== "loading") fn();
        else document.addEventListener("DOMContentLoaded", fn);
    }
}