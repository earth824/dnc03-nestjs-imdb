export type Role = 'ADMIN' | 'SUPER_ADMIN' | 'USER';
export type Gender = 'MALE' | 'FEMALE';

export type User = {
  id: number;
  email: string;
  password: string;
  role: Role;
  firstName: string | null;
  lastName: string | null;
  dob: Date | null;
  gender: Gender | null;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
};
