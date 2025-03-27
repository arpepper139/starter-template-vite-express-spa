import { Request, Response } from "express";
import UserService from "../services/user.service.js";
// import UserService from "../services/user.mock.service.js";
import User from "../models/user.model.js";

// TO DO -- move this into shared API types
type ErrorMessage = {
  message: string
}

// TO DO -- integrate shared API types here instead of using the user model

export const getUsers = async (req: Request, res: Response<User[] | ErrorMessage>): Promise<void> => {
  try {
    const users = await UserService.getAll();
    res.json(users);
  } catch (error) {
    // TO DO -- create shared API enum for status codes
    res.status(500).json({ message: "Error fetching users" });
  }
};

export const getUserById = async (req: Request, res: Response<User | ErrorMessage>): Promise<void> => {
  try {
    const user = await UserService.getById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" }); 
      return;
    };
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user" });
  }
};

export const createUser = async (req: Request, res: Response<User | ErrorMessage>): Promise<void> => {
  try {
    const { name, email } = req.body;
    const newUser = await UserService.create(name, email);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
};

// check if setting Response<> and error<> sets the type
export const updateUser = async (req: Request, res: Response<User | ErrorMessage>): Promise<void> => {
  try {
    const { name, email } = req.body;
    const updatedUser = await UserService.update(req.params.id, name, email);
    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
};

export const deleteUser = async (req: Request, res: Response<ErrorMessage>): Promise<void> => {
  try {
    const success = await UserService.delete(req.params.id);
    if (!success) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
};