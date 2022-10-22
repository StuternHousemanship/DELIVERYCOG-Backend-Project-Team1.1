import 'dotenv/config';

export const pepper = process.env.BCRYPT_PASSWORD as string;
export const saltRound = parseInt(process.env.SALT_ROUNDS as string, 10);
export const secret = process.env.SECRET as string;
