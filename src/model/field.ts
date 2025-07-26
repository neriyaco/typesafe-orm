export class Field<T = object, HasDefault extends boolean = false> {
  private _value: T;
  
  constructor(readonly type: Constructor<T>, defaultValue?: T) {
    this._value = new type(defaultValue);
  }

  set value(newValue: T) {
    this._value = newValue;
  }

  get value() {
    return this._value;
  }
}

export function field<T>(type: Constructor<T>): Field<T, false>;
export function field<T>(type: Constructor<T>, defaultValue: T): Field<T, true>;
export function field<T>(type: Constructor<T>, defaultValue?: T) {
  return new Field(type, defaultValue);
}
