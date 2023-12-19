export function setExpireTime(key: string, value: number | string, expire: number) {
    const now = new Date();

    const item = {
        value: value,
        expire: now.getTime() + expire * 60 * 60 * 1000,
    };

    localStorage.setItem(key, JSON.stringify(item));
}

export function getExpireValue(key: string) {
    const itemStr = localStorage.getItem(key);

    if (!itemStr) return null;

    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime() > item.expire) {
        localStorage.removeItem(key);
        return null;
    }

    return item.value;
}
