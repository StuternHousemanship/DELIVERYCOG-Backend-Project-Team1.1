import { User, UserType } from '../../Models/user.model';


export default class UserRepository {
    

async getAllRiders(user_type: string): Promise<UserType[]> {
        const user: UserType[] = (await User.query().where('user_type', user_type).page(1, 3).then(rows => rows)) as UserType[];

        return user;
    }
}
