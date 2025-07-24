import { QueryBuilder } from "../query-builder";
import Query from "../query-builder/types";
import { Field } from "./field";

type Modifiable<T extends Model> = {
    [K in keyof T]: T[K] extends Field ? InstanceType<T[K]["type"]> : T[K];
};

function modifiable<T extends Model>(model: Constructor<T>) {
    return model as Constructor<Modifiable<T>>;
}

export interface IModel {
    new <T extends Model>(): Modifiable<T>;
    where<T extends Model, K extends keyof T>(...wheres: Query.WhereArgs<T, K>): QueryBuilder<T>;
    create<T extends Model>(): Modifiable<T>;
}

class Model implements IModel {
    constructor() {}

    static where<T extends Model, K extends keyof T>(this: Constructor<T>, ...wheres: Query.WhereArgs<T, K>) {
        return Model._queryBuilder<T>().where(...wheres);
    }

    private static _queryBuilder<T extends Model>(): QueryBuilder<T> {
        return new QueryBuilder(this);
    }

    static create<T extends Model>(this: Constructor<T>) {
        const modelClass = modifiable(this);
        return new Proxy(new modelClass(), {
            set(target, key, value) {
                if (typeof key === "symbol") {
                    target[key] = value;
                    return true;
                }
                if (!(key in target)) {
                    throw new TypeError(`Property ${key} does not exist on model ${target.constructor.name}`);
                }

                switch (true) {
                    case target[key] instanceof Field:
                        target[key].value = value;
                        break;
                    default:
                        throw new TypeError(`Property ${key} is not a field`);

                }
                return true;
            }
        });
    }
}

export default Model;