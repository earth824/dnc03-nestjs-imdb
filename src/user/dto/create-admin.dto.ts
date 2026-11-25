import z from 'zod';

export const createAdminSchema = z.object({
  email: z.string().trim().min(1).pipe(z.email()),
  password: z.string().regex(/^[0-9a-zA-Z]{6,32}$/),
});

export type CreateAdminDto = z.infer<typeof createAdminSchema>;
