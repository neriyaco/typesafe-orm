import { QueryBuilder } from "@/query-builder";
import Query from "@/query-builder/types";
import { Field } from "./field";

import type { ModelArgs, Writable } from "./types";

class Model {
  constructor() {
    return new Proxy(this, {
      set(target: any, key, value) {
        if (typeof key === "symbol") {
          target[key] = value;
          return true;
        }
        if (!(key in target)) {
          throw new TypeError(
            `Property ${key} does not exist on model ${target.constructor.name}`
          );
        }

        switch (true) {
          case target[key] instanceof Field:
            target[key].value = value;
            break;
          default:
            throw new TypeError(`Property ${key} is not a field`);
        }
        return true;
      },
    });
  }

  static where<T extends Model, K extends keyof T>(
    this: Constructor<T>,
    ...wheres: Query.WhereArgs<T, K>
  ) {
    return Model._queryBuilder<T>(this).where(...wheres);
  }

  private static _queryBuilder<T extends Model>(
    constructor: Constructor<T>
  ): QueryBuilder<T> {
    return new QueryBuilder<T>(constructor);
  }

  static create<T extends Model>(this: Constructor<T>, args?: ModelArgs<T>) {
    const ModelClass = this as Constructor<Writable<T>>;
    return new Proxy(new ModelClass(), {
      set(target: any, key, value) {
        if (typeof key === "symbol") {
          target[key] = value;
          return true;
        }
        if (!(key in target)) {
          throw new TypeError(
            `Property ${key} does not exist on model ${target.constructor.name}`
          );
        }

        switch (true) {
          case target[key] instanceof Field:
            target[key].value = value;
            break;
          default:
            throw new TypeError(`Property ${key} is not a field`);
        }
        return true;
      },
    });
  }
}

export default Model;
