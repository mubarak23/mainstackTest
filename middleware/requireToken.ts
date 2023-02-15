
import { NextFunction, Request, Response } from 'express';
import * as jwt from "async-jsonwebtoken";
import { User } from '../models/user.model'

export const requiredToken = async (req: Request, res: Response, next: NextFunction) => {

    let access_token;
    access_token = req.headers['x-access-token'] as string;
   console.log(access_token)

   if (!access_token) {
    throw new Error('You are not logged in')
   //  return res.status(422).json({ message: "You are not logged in" });
   }
   const [decoded, err] = await jwt.verify(access_token,  process.env.JWT_KEY_SECRET || 'erbdnrh458fnr',)
   console.log('decoded', decoded)

   if (err) {
     if(err.name && err.name === 'TokenExpiredError') {
        throw new Error('Access token expired')
        // return res.status(401).json({ message: "Access token expired" });
     }
   }

   const userId = (decoded as any)._id as string;
   console.log(userId)
   // Check if user still exist
   const user = await User.findById(userId).select("-password");
     console.log(user)
   if (!user) {
    throw new Error('User with that token no longer exist')
     
   }

  
   req.user = user;

   next();

}