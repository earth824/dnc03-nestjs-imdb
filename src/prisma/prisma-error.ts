import { PrismaClientKnownRequestError } from './generated/prisma/internal/prismaNamespace.js';

export function isUniqueConstraintViolation(error: unknown): boolean {
  return (
    error instanceof PrismaClientKnownRequestError && error.code === 'P2002'
  );

  // if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002')
  //   return true;
  // return false;
}
