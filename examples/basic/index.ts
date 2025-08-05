import { Model } from "@/index";
import { field } from "@/model/field";

class User extends Model {
  id = field(Number, 3);
  name = field(String, "");
  age = field(Number);
}

const user = User.select().where("age", 1).whereIn("id", [1]).get();
user.age = 1;
