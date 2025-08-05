import type Model from "./base";
import type { Field } from "./field";

export type Writable<T extends Model> = {
  [K in keyof T]: T[K] extends Field<infer R> ? R : T[K];
};

export type ModelArgs<T> = {
  [K in keyof T]: T[K] extends Field<infer R, infer HasDefault>
  ? HasDefault extends true
  ? R | undefined
  : R
  : never;
} extends infer O
  ? { [K in keyof O as undefined extends O[K] ? K : never]?: O[K] } & {
    [K in keyof O as undefined extends O[K] ? never : K]: O[K];
  }
  : never;
