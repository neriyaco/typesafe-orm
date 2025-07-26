import { Model } from "@/index";
import { field } from "@/model/field";

class User extends Model {
  id = field(Number, 3);
  name = field(String, "");
  age = field(Number);
}

const user = User.where("age", 1).get();
user.age = 1;

User.create({ age: 1 });
