import 'dotenv/config';

export const pepper = process.env.BCRYPT_PASSWORD;
export const saltRound = parseInt(process.env.SALT_ROUNDS as string, 10);
