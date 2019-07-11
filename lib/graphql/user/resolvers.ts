import * as bcrypt from "bcryptjs";
import { AuthenticationError } from 'apollo-server';
import { generateToken } from "../../utils/auth";


const userResolver = {
  Query: {
    users: async (root, args, { models: { User }, authScope }) => {
      if (!authScope.user) throw new AuthenticationError( 'You are not authorized to access this route! Please provide a token' );
      return await User.findAll()
    }
  },
  Mutation: {
    register: async (
      root,
      { username, email, password },
      { models: { User } }
    ) => {
      let newUser = await new User({ username, email, password });

      const user = await newUser.save();
      return { token: generateToken(user) };
    },
    login: async (root, { email, password }, { models: { User } }) => {
      const user = await User.findOne({ where: { email: email } });
      const message = "Email or Password do not match";
      if (!user) throw new AuthenticationError( message );
      const isValid = await bcrypt.compareSync(
        password.toString(),
        user.password
      );
      if (!isValid) throw new AuthenticationError( message );
      return { token: generateToken(user) };
    }
  }
};

export default userResolver;
