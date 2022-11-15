import 'dotenv/config';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { UserType } from '../Models/user.model.ts';

export class Encryption {
    private pepper = String(process.env.BCRYPT_PASSWORD);
    private saltRound = Number(process.env.SALT_ROUNDS);
    private secret = String(process.env.SECRET);

    public bcrypt = async (str: string): Promise<string> => {
        return await bcrypt.hash(str + this.pepper, this.saltRound);
    };
    public generateAccessToken = async (user: UserType[]): Promise<string> => {
        const data = {
            user_id: user[0].id,
            email: user[0].email,
        };
        return sign(data, this.secret, { expiresIn: '7d' });
    };
    public compare = async (
        compare: string,
        against: string
    ): Promise<boolean> => {
        return await bcrypt.compare(compare + this.pepper, against);
    };
}
export default new Encryption();
