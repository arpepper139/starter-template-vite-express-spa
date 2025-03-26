import User from "../models/user.model.js";

const USERS: User[] = [{'id': '1', 'name': "Andrew", 'email': 'apa@gmail.com', createdAt: new Date(), updatedAt: new Date()}]

class UserService {
  // Fetch all users
  static async getAll(): Promise<User[]> {
    return await USERS
  }

  // Fetch a user by ID
  static async getById(id: string): Promise<User | null> {
    console.log('in get by id')
    const user = await USERS.find(user => user.id === id);
    if (!user) return null;
    return user;
  }

  // Create a new user
  static async create(name: string, email: string): Promise<User> {
    const newUser: User = {
      id: `${USERS.length + 1}`,
      name,
      email,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    await USERS.push(newUser)
    return newUser;
  }

  // Update a user
  // TO DO -- make this more flexible so only one piece can be updated
  static async update(id: string, name: string, email: string): Promise<User | null> {
    const user = USERS.find(user => user.id === id);
    if (!user) {
      return null;
    }
    const updatedUser = {
      ...user,
      name,
      email,
      updatedAt: new Date()
    }
    const userIndex = USERS.indexOf(user)

    await USERS.splice(userIndex, 1, updatedUser)
    return updatedUser;
  }

  // Delete a user
  static async delete(id: string): Promise<boolean> {
    const user = USERS.find(user => user.id === id);
    if (!user) {
      return false;
    }
    const userIndex = USERS.indexOf(user)
    await USERS.splice(userIndex, 1)
    console.log(USERS)
    return true;
  }
}

export default UserService;