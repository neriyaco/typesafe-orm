import type { Writable } from "@/model/types";
import type { default as Model } from "../model/base";
import FieldOperator from "./operator";
import type Query from "./types";

export class QueryBuilder<M extends Model> {
  private readonly clauses: Query.ClauseMap<M> = {
    where: [],
    select: [],
  };

  constructor(private readonly ModelType: Constructor<M>) { }

  select(...fields: Array<Query.SelectField<M>>) {
    this.clauses.select.push(...fields);
    return this;
  }

  where(...[field, ...wheres]: Query.WhereArgs<M>) {
    this.clauses.where.push({
      field,
      operator: wheres.length === 2 ? wheres[0] : FieldOperator.Equal,
      value: wheres.length === 2 ? wheres[1] : wheres[0],
    });

    return this;
  }

  whereIn<K extends keyof M>(field: K, values: Query.FieldValue<M, K>[]) {
    this.clauses.where.push({
      field,
      operator: FieldOperator.In,
      value: values,
    });

    return this;
  }

  get() {
    return new this.ModelType() as Writable<M>;
  }
}
