import { Request, Response } from "express";
import { userRepository } from '../repositories/userRepository';


export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userRepository.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.id);
    const user = await userRepository.findOneBy({id:userId});
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, firstname, lastname, birthdate, timezone } = req.body;
    const newUser = userRepository.create({ email, firstname, lastname, birthdate, timezone, status: 0 });
    await userRepository.save(newUser);
    res.status(201).json({ message: "User created", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error});
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await userRepository.delete(Number(req.params.id));
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
