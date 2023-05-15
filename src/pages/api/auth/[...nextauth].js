import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth';

import prisma from '../../../lib/prisma';

const authHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
  providers: [],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
};
