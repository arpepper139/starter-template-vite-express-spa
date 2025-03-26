import {pool} from "../config/db.js";
import User from "../models/user.model.js";

class UserService {
  // Fetch all users
  static async getAll(): Promise<User[]> {
    const result = await pool.query("SELECT * FROM users ORDER BY created_at DESC");
    return result.rows.map((row) => new User(row.id, row.name, row.email, row.created_at, row.updated_at));
  }

  // Fetch a user by ID
  static async getById(id: string): Promise<User | null> {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return new User(row.id, row.name, row.email, row.created_at, row.updated_at);
  }

  // Create a new user
  static async create(name: string, email: string): Promise<User> {
    const result = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );
    const row = result.rows[0];
    return new User(row.id, row.name, row.email, row.created_at, row.updated_at);
  }

  // Update a user
    // TO DO -- make this more flexible so only one piece can be updated
  static async update(id: string, name: string, email: string): Promise<User | null> {
    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2, updated_at = NOW() WHERE id = $3 RETURNING *",
      [name, email, id]
    );
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return new User(row.id, row.name, row.email, row.created_at, row.updated_at);
  }

  // Delete a user
  static async delete(id: string): Promise<boolean> {
    const result = await pool.query("DELETE FROM users WHERE id = $1", [id]);
    return result.rowCount ? result.rowCount > 0 : false;
  }
}

export default UserService;