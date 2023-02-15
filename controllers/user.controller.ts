import { Request, Response } from 'express';
import {generatePasswordHash } from '../utils/auth'

import { User, UserInput } from '../models/user.model';


const createUser = async (req: Request, res: Response) => {
  const { email, fullName, password } = req.body;

  if (!email || !fullName || !password ) {
    return res.status(422).json({ message: 'The fields email, fullName and password are required' });
  }

  const userInput: UserInput = {
    fullName,
    email,
    password: await generatePasswordHash(password),
   
  };

  const userCreated = await User.create(userInput);

  return res.status(201).json({ data: userCreated });
};

const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find().sort('-createdAt').select("-password").exec();
    console.log(req.user)
  return res.status(200).json({ data: users });
};

const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await User.findOne({ _id: id }).exec();

  if (!user) {
    return res.status(404).json({ message: `User with id "${id}" not found.` });
  }

  return res.status(200).json({ data: user });
};

const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, fullName } = req.body;

  const user = await User.findOne({ _id: id });

  if (!user) {
    return res.status(404).json({ message: `User with id "${id}" not found.` });
  }

  if (!fullName || !email ) {
    return res.status(422).json({ message: 'The fields fullName and email are required' });
  }

  await User.updateOne({ _id: id }, {  email, fullName });

  const userUpdated = await User.findById(id);

  return res.status(200).json({ data: userUpdated });
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  await User.findByIdAndDelete(id);

  return res.status(200).json({ message: 'User deleted successfully.' });
};

export { createUser, deleteUser, getAllUsers, getUser, updateUser };