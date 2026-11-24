import z from 'zod';

export const registerSchema = z.object({
  email: z.string().trim().min(1).pipe(z.email()),
  password: z.string().regex(/^[0-9a-zA-Z]{6,32}$/),
  firstName: z.string().trim().min(1).optional(),
  lastName: z.string().trim().min(1).optional(),
  dob: z.coerce.date().optional(),
  gender: z.enum(['MALE', 'FEMALE']).optional(),
});

export type RegisterDto = z.infer<typeof registerSchema>;
