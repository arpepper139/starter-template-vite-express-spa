import { UserServiceAbstract } from "../../services/user.service.js";
import { USERS } from "../db.mock.js";
import User from "../../models/user.model.js";

class UserService extends UserServiceAbstract {
  // Fetch all users
  static async getAll(): Promise<User[]> {
    return await USERS;
  }

  // Fetch a user by ID
  static async getById(id: string): Promise<User | null> {
    const user = await USERS.find((user) => user.id === id);
    if (!user) return null;
    return user;
  }

  // Create a new user
  static async create(name: string, email: string): Promise<User> {
    const newUser: User = new User(
      `${USERS.length + 1}`,
      name,
      email,
      new Date(),
      new Date()
    );
    await USERS.push(newUser);
    return newUser;
  }

  // Update a user
  static async update(
    id: string,
    name?: string,
    email?: string
  ): Promise<User | null> {
    if (!name && !email) {
      throw new Error(
        "At least one field (name or email) must be provided for update."
      );
    }

    const user = USERS.find((user) => user.id === id);
    if (!user) {
      return null;
    }
    const updatedName = name ?? user.name;
    const updatedEmail = email ?? user.email;
    const updatedUser = new User(
      id,
      updatedName,
      updatedEmail,
      user.createdAt,
      new Date()
    );
    const userIndex = USERS.indexOf(user);

    await USERS.splice(userIndex, 1, updatedUser);
    return updatedUser;
  }

  // Delete a user
  static async delete(id: string): Promise<boolean> {
    const user = USERS.find((user) => user.id === id);
    if (!user) {
      return false;
    }
    const userIndex = USERS.indexOf(user);
    await USERS.splice(userIndex, 1);
    console.log(USERS);
    return true;
  }
}

export default UserService;
