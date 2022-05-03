import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'email@example.com',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '********',
        },
      },
      async authorize(credentials) {
        if (credentials && credentials.email && credentials.password) {
          if (
            credentials.email === 'test@test.com' &&
            credentials.password === 'test'
          ) {
            return {
              email: credentials.email,
              image: 'https://i.pravatar.cc/500',
              name: 'Test User',
            };
          }
        }
        return null;
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    jwt: async ({ token }) => {
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }
      return session;
    },
  },
  secret: 'my-secret',
  jwt: {
    secret: 'my-secret',
    maxAge: 60 * 60 * 24 * 30,
  },
});
