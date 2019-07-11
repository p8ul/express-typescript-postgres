import * as jwt from 'jsonwebtoken';
import * as db from '../models';

export const generateToken = user => `JWT ${jwt.sign({
    id: user.id ? user.id : null, email: user.email,
    iat: Math.floor(Date.now() / 1000) - 30,
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
}, 'secret_key')}`;


export const getUser = async (token) => {
   if (!token) {
      return {
        user: null,
      };
    }
  
    try {
      const decodedToken = jwt.verify(token.substring(4), 'secret_key');
      const user = await db.User.findOne({where: { id: decodedToken.id }, attributes:['email', 'id'],  });
      return {
        user,
      };
    } catch (err) {
      console.warn(err)
      return {
        user: null,
      };
    }
  };