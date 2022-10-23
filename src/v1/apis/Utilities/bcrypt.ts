import 'dotenv/config';
import bcrypt from 'bcrypt';

export class Encryption {
    private pepper = String(process.env.BCRYPT_PASSWORD);
    private saltRound = Number(process.env.SALT_ROUNDS);
    // private secret = String(process.env.SECRET);

    public async bcrypt(str: string): Promise<string> {
        return await bcrypt.hash(str + this.pepper, this.saltRound);
    }
}
export default new Encryption();
