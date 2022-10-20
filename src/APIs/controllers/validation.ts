import GlobalQueries from '../../Repository/globalQueries';

const globalQuery = new GlobalQueries();

export const validateEmail = async (
    email: string
): Promise<string | undefined> => {
    const user = await globalQuery.findOne('users', 'email', email);
    if (user.length > 0) {
        return user[0].email;
    }
    return undefined;
};

export const validatePhoneNumber = async (
    phoneNumber: number
): Promise<number | undefined> => {
    const userphoneNumber = await globalQuery.findOne(
        'users',
        'phone_number',
        phoneNumber
    );
    if (userphoneNumber.length > 0) {
        return userphoneNumber[0].phone_number;
    }
    return undefined;
};

// export const isActive = async (email: string): Promise<boolean | undefined> => {
//     const user = await globalQuery.findOne('users', 'email', email);
//     if (user[0].is_verified.toString() === 'f') {
//         return false;
//     }
//     return true;
// };
