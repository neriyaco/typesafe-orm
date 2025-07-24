import type { default as Model, IModel } from "../model/base";
import FieldOperator from "./operator";
import type Query from "./types";

export class QueryBuilder<M extends Model> {
    private readonly clauses: Query.ClauseMap<M> = {
        where: [],
    };

    constructor(private readonly ModelType: IModel) {

    }

    where(...[field, ...wheres]: Query.WhereArgs<M>) {
        this.clauses.where.push({
            field,
            operator: wheres.length === 2 ? wheres[0] : FieldOperator.Equal,
            value: wheres.length === 2 ? wheres[1] : wheres[0],
        });

        return this;
    }

    whereIn(field: keyof M, values: any[]) {
        this.clauses.where.push({
            field,
            operator: FieldOperator.In,
            value: values,
        });

        return this;
    }

    get() {
        return this.ModelType.create<M>();
    }
}