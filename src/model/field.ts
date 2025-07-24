export class Field<T = object> {
    private _value: T;
    constructor(readonly type: Constructor<T>) {
        this.value = new type();
    }

    set value(newValue: T) {
        this._value = newValue;
    }

    get value() {
        return this._value;
    }
}

export function field<T>(type: Constructor<T>) { return new Field(type); }