import { Request, Response } from "express";
import UserService from "../services/user.service.js";
// import UserService from "../__mocks__/services/user.mock.service.js";
import { CustomMessage, UserShape, HttpStatusCode } from "api-types";

// TO DO -- when implementing front end, decide if it's worth moving the Response shapes into the shared API library
export const getUsers = async (req: Request, res: Response<UserShape[] | CustomMessage>): Promise<void> => {
  try {
    const users = await UserService.getAll();
    res.json(users.map(user => user.toAPIShape()));
  } catch (error) {
    res.status(HttpStatusCode.InternalServerError).json({ message: "Error fetching users" });
  }
};

export const getUserById = async (req: Request, res: Response<UserShape | CustomMessage>): Promise<void> => {
  try {
    const user = await UserService.getById(req.params.id);
    if (!user) {
      res.status(HttpStatusCode.NotFound).json({ message: "User not found" }); 
      return;
    };
    res.json(user.toAPIShape());
  } catch (error) {
    res.status(HttpStatusCode.InternalServerError).json({ message: "Error fetching user" });
  }
};

export const createUser = async (req: Request, res: Response<UserShape | CustomMessage>): Promise<void> => {
  try {
    const { name, email } = req.body;
    const newUser = await UserService.create(name, email);
    res.status(HttpStatusCode.Created).json(newUser.toAPIShape());
  } catch (error) {
    res.status(HttpStatusCode.InternalServerError).json({ message: "Error creating user" });
  }
};

// check if setting Response<> and error<> sets the type
export const updateUser = async (req: Request, res: Response<UserShape | CustomMessage>): Promise<void> => {
  try {
    const { name, email } = req.body;
    const updatedUser = await UserService.update(req.params.id, name, email);
    if (!updatedUser) {
      res.status(HttpStatusCode.NotFound).json({ message: "User not found" });
      return;
    }
    res.json(updatedUser.toAPIShape());
  } catch (error) {
    res.status(HttpStatusCode.InternalServerError).json({ message: "Error updating user" });
  }
};

export const deleteUser = async (req: Request, res: Response<CustomMessage>): Promise<void> => {
  try {
    const success = await UserService.delete(req.params.id);
    if (!success) {
      res.status(HttpStatusCode.NotFound).json({ message: "User not found" });
      return;
    }
    // TO DO -- revist if this should return the boolean to the client
    res.status(HttpStatusCode.NoContent).send();
  } catch (error) {
    res.status(HttpStatusCode.InternalServerError).json({ message: "Error deleting user" });
  }
};