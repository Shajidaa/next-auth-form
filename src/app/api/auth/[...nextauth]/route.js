import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/action/server/auth";
import GoogleProvider from "next-auth/providers/google";
import { collections, connect } from "@/lib/dbConntect";
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // const { email, password } = credentials;

        // try {
        //   const user = await loginUser(email);

        //   if (!user) return null;

        //   const isPasswordValid = await bcrypt.compare(password, user.password);

        //   if (!isPasswordValid) return null;

        //   return user;
        // } catch (err) {
        //   console.log(err);
        //   return null;
        // }
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await loginUser(credentials);
        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      //   try {
      //     if (user) {
      //       return true;
      //     }
      //   } catch (error) {
      //     return false;

      //   }
      const isExist = await connect(collections.USERS).findOne({
        email: user.email,
        // provider: account?.provider,
      });
      if (isExist) {
        return true;
      }

      const newUser = {
        provider: account?.provider,
        email: user.email,
        name: user.name,
        image: user.image,
        role: "user",
      };
      const result = await connect(collections.USERS).insertOne(newUser);

      return result.acknowledged;
    },
    // async redirect({ url, baseUrl }) {
    //   return baseUrl;
    // },
    async session({ session, user, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.email = user.email;
      }
      return token;
    },
  },
  // pages: {
  //   signIn: "/login", // Custom sign-in page
  // },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

// 🔴 THIS PART IS CRITICAL
export { handler as GET, handler as POST };
