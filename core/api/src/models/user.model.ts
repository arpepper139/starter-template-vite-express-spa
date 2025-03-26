// TO DO -- move this interface type in the API Types to represent what gets returned, and implement it here.
interface UserShape {
  id: string;
  name: string;
  email: string;
}

class User implements UserShape {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(id: string, name: string, email: string, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export default User;