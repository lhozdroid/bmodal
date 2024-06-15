export default class Util {
    /**
     *
     * @param base
     * @param extensions
     * @returns {{}|*}
     */
    static deepExtend(base, ...extensions) {
        base = base || {};
        extensions = extensions || [];

        for(let extensionIndex = 0; extensionIndex < extensions.length; extensionIndex++) {
            const extension = extensions[extensionIndex];
            const keys = Object.keys(extension);

            for(let keyIndex = 0; keyIndex < keys.length; keyIndex++) {
                const key = keys[keyIndex];
                if(base.hasOwnProperty(key)) {
                    const baseValue = base[key];
                    const extensionValue = extension[key];

                    const isBaseValueJson = {}.constructor == baseValue.constructor;
                    const isExtensionValueJson = {}.constructor == extensionValue.constructor;

                    if(isBaseValueJson && isExtensionValueJson) {
                        base[key] = Util.deepExtend(baseValue, extensionValue);
                    } else {
                        base[key] = extensionValue;
                    }
                } else {
                    base[key] = extension[key];
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