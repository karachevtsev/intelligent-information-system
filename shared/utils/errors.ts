export class ResponseError {
    get type(): string {
        return 'response';
    }

    #response: Response;

    get response() {
        return this.#response;
    }

    constructor(response: Response) {
        this.#response = response;
    }
}

export class ThrottleError extends ResponseError {
    get type(): string {
        return 'throttle';
    }

    #reset: Number;

    get reset(): Date {
        return new Date(this.#reset * 1000);
    }

    get left(): Number {
        return this.#reset - parseInt(new Date().getTime() / 1000);
    }

    constructor(response: Response) {
        super(response);
        this.#reset = parseInt(response.headers.get('x-ratelimit-reset'));
    }

    /**
     * @deprecated
     * @return {Date}
     */
    getReset(): Date {
        return new Date(this.#reset * 1000);
    }

    /**
     * @deprecated
     * @return {number}
     */
    getLeft(): Number {
        return this.#reset - parseInt(new Date().getTime() / 1000);
    }
}

export class ValidationError extends ResponseError {
    get type(): string {
        return 'validation';
    }

    #errors: {
        [key: string]: string[];
    } = {};

    get errors(): Record<string, string[]> {
        return this.#errors;
    }

    constructor(response: Response, errors: Record<string, string[]>) {
        console.log(errors);
        super(response);
        this.#errors = errors;
    }

    has(key: string): boolean {
        return this.#errors.hasOwnProperty(key);
    }
}
