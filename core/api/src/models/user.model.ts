import { UserShape } from "api-types";
class User implements UserShape {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    name: string,
    email: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toAPIShape(): UserShape {
    const { id, name, email } = this;
    return {
      id,
      name,
      email,
    };
  }
}

export default User;
