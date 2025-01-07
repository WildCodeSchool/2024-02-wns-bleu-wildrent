import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const secretKey = process.env.JWT_SECRET_KEY

export const mockAuthContext = {
  user: { id: 1, email: 'test@user.com', role: 'User' },
}

export const generateToken = (user: any) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    secretKey as string,  
    { expiresIn: '1h' } 
  )
}

export const mockAuthToken = generateToken(mockAuthContext.user)
