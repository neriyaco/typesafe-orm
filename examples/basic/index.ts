import { Model } from "../../src";
import { Field, field } from "../../src/model/field";
import Query from "../../src/query-builder/types";

class User extends Model {
    id = field(Number);
    name = field(String);
    age = field(Number);
}

const user = User.where("age", 1).get();
user.age = 1;