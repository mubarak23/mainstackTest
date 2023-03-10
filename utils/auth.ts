
import crypto from 'crypto';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
dotenv.config({path: "../.env"});


export const validPassword = (password: string, hash: string, salt: string) => {
    
    const verify = crypto
        .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
        .toString('hex')
    return hash === verify
}


export const issueToken = async (user: any) => {
    const { _id } = user
    const expiresIn = '1d'

    const jwtSecret = process.env.JWT_KEY_SECRET as string

    const generatedToken = jwt.sign({_id}, jwtSecret, {
        expiresIn
      })

    return {
        token: `${generatedToken}`,
        expiresIn: expiresIn,
    }
}

export const generatePasswordHash = async (password: string): Promise<string> => {
    const saltRounds = 10;
    const passwordSalt = await bcrypt.genSalt(saltRounds);
    
    return bcrypt.hash(password, passwordSalt);
  }