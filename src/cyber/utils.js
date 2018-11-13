class Utils {
    static sortObjectKeys(obj) {
        const sort = function (obj) {
            const tmp = {};

            Object.keys(obj).sort().forEach((k) => {
                if (Array.isArray(obj[k])) {
                    const p = [];

                    obj[k].forEach((item) => {
                        if (item != null && typeof (item) === 'object') {
                            p.push(sort(item));
                        } else {
                            p.push(item);
                        }
                    });
                    tmp[k] = p;
                } else if (obj[k] != null && typeof (obj[k]) === 'object') {
                    tmp[k] = sort(obj[k]);
                } else if (obj[k] != null && typeof (obj[k]) === 'function') {
                    tmp[k] = eval(obj[k].toString());
                } else {
                    tmp[k] = String(obj[k]).toString();
                }
            });
            return tmp;
        };

        return sort(obj);
    }

    static isEmpty(obj) {
        switch (typeof obj) {
        case 'undefined': {
            return true;
        }
        case 'string': {
            return obj.length === 0;
        }
        case 'number': {
            return obj === 0;
        }
        case 'object': {
            if (obj == null) {
                return true;
            } if (Array.isArray(obj)) {
                return obj.length === 0;
            }
            return Object.keys(obj).length === 0;
        }
        default: {

        }
        }
    }

    static toString(str) {
        if (typeof str === 'number') {
            return `${str}`;
        } if (this.isEmpty(str)) {
            return '';
        }
        return str.toString();
    }
}

export default Utils;
