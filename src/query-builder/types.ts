import type Model from "../model/base";
import type { Field } from "../model/field";
import type { FieldOperator } from "./operator";

namespace Query {
    export type FieldValue<T extends Model, K extends keyof T> = T[K] extends Field ? InstanceType<T[K]["type"]> : never;

    export type WhereArgs<T extends Model, K extends keyof T = keyof T> = [K, FieldOperator, FieldValue<T, K>] | [K, FieldValue<T, K>];

    export type WhereClause<T extends Model = any> = {
        field: keyof T;
        operator: FieldOperator;
        value: any;
    }

    export type ClauseMap<T extends Model> = {
        where: WhereClause<T>[];
    }
}


export default Query;