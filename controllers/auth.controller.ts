import { Request, Response } from 'express';
import bcrypt from 'bcryptjs'
import { issueToken } from '../utils/auth'
import { User } from '../models/user.model';

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    if (!email  || !password ) {
      return res.status(422).json({ message: 'The fields email, fullName and password are required' });
    }
    
    const user = await User.findOne({ email })
    if(!user){
        return res.status(422).json({ message: 'User with provided details does not exist' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
       return res.status(422).json({ message: "User credentials are wrong." });
      }

      const authtoken = await issueToken(user)
  
     return res.status(201).json({ data: authtoken });
  };
  

  export { login }

  