export function debounce(func: Function, delay: number = 100) {
    let clearTimer: number | NodeJS.Timer;
    return function (this: any, ...args: any[]) {
        const context = this;
        clearTimeout(clearTimer);
        clearTimer = setTimeout(() => func.apply(context, args), delay);
    };
}
