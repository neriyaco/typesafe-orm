type Constructor<T> = { new(...args: unknown[]): T }

class Parent {
    static create<T>(this: Constructor<T>): T {
        return new this();
    }

    call() {
        console.log("Call from Parent, this is: ", this);
    }
}

class Child extends Parent {
    calc(a, b) {
        return a + b;
    }
}

const foo = Child.create();
foo.call();
console.log(foo.calc(1, 2));