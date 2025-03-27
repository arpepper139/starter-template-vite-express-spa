import {pool} from "../config/db.js";
import User from "../models/user.model.js";

// Ensures consistent implementation across mock and actual Services
export abstract class UserServiceAbstract {
  static async create(name: string, email: string): Promise<User> {
    throw new Error("Method 'create' not implemented.");
  }

  static async update(id: string, name?: string, email?: string): Promise<User | null> {
    throw new Error("Method 'update' not implemented.");
  }

  static async getAll(): Promise<User[]> {
    throw new Error("Method 'getById' not implemented.");
  }

  static async getById(id: string): Promise<User | null> {
    throw new Error("Method 'getById' not implemented.");
  }

  static async delete(id: string): Promise<boolean> {
    throw new Error("Method 'delete' not implemented.");
  }
}

class UserService extends UserServiceAbstract {
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

  // Update a user - flexible update for name, email, or both
  static async update(id: string, name?: string, email?: string): Promise<User | null> {
    if (!name && !email) {
      throw new Error("At least one field (name or email) must be provided for update.");
    }

    // fields to SET
    const fields: string[] = [];
    // values inserted into the query
    const values: unknown[] = [];

    if (name) {
      values.push(name); 
      fields.push(`name = $${values.length}`);
    }
    if (email) {
      values.push(email)
      fields.push(`email = $${values.length}`);
    }

    // Always update `updated_at`
    fields.push(`updated_at = NOW()`);

    // Add `id` as the last parameter
    values.push(id);

    // Construct the final query
    const query = `UPDATE users SET ${fields.join(", ")} WHERE id = $${values.length} RETURNING *`;

    // Execute the query
    const result = await pool.query(query, values);
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