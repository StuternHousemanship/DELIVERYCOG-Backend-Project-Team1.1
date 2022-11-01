const user = [
    {
        data: [
            {
                _id: '634b302e731b34b7aa5e0cb8',
                first_name: 'mark tyson',
                last_name: 'omolaja',
                email: 'by3n7k32hg@paperpapyrus.com',
                phone_number: '08161228946',
                password: 'bluyq8jxLtZcb9M0cDKIOkrM90o04CkM4U+aXf6wn4Q=',
                verification_code: 846544,
                is_Verified: false,
                created_at: '2022-10-15T22:11:58.629Z',
            },
        ],
    },
    {
        success: true,
        message:
            'Account successfully created, Check your mail for activation code',
    },
    {
        success: false,
        error: 'Email is already taken',
        message: 'Registration failed',
    },
    {
        data: {
            email: 'tyson@kaimdr.com',
            name: 'mark tyson',
        },
        expiresIn: 1800,
        message: 'Login successful',
        success: true,
    },
    {
        error: 'please enter a valid email',
        message: 'Action unsuccessful',
        success: false,
    },
    {
        password: 'Password must be between 6 and 16 characters',
        message: 'Action unsuccessful',
        success: false,
    },
    {
        message: 'Login attempt Failed',
        email: 'Incorrect password',
        success: false,
    },
    {
        message: 'Email already verified',
        success: false,
    },
    {
        message: 'Email verification successful',
        success: true,
    },
    {
        message: 'Invalid code',
        success: false,
    },
];

const createUser = {
    tags: ['Authentication'],
    description: 'Create a user Account',
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        email: {
                            type: 'string',
                            description: 'valid email of the user',
                            example: 'namacab@gmail.com',
                        },
                        firstName: {
                            type: 'string',
                            description:
                                'first name of the user, minimum lenght: 1, max. lenght: 20',
                            example: 'Samuel',
                        },
                        lastName: {
                            type: 'string',
                            description:
                                'Last name or surname of the user,minimum lenght: 1, max. lenght: 20',
                            example: 'Omolaja',
                        },
                        phoneNumber: {
                            type: 'string',
                            description:
                                'mobile phone number of the user, must be 11 digit ',
                            example: '08161228946',
                        },
                        password: {
                            type: 'string',
                            description:
                                'A unique password of the user with a combination of capital letter, small letter, numbers and signs, minimum lenght: 6, max. lenght: 16',
                            example: 'Gxo@k.123ftz-f',
                        },
                    },
                },
            },
        },
    },
    responses: {
        200: {
            description: 'Ok',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        example: user[1],
                    },
                },
            },
        },

        400: {
            description: 'Bad request',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        example: user[2],
                    },
                },
            },
        },
    },
};
const verifyAccount = {
    tags: ['Authentication'],
    description: 'verfiy user account',
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        code: {
                            type: 'string',
                            description:
                                '6 digit code sent to mail after registration',
                            example: '566192',
                        },
                    },
                },
            },
        },
    },
    responses: {
        201: {
            description: 'Created',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        example: user[8],
                    },
                },
            },
        },
        409: {
            description: 'Conflict',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        example: user[7],
                    },
                },
            },
        },
        401: {
            description: 'Unauthorized',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        example: user[9],
                    },
                },
            },
        },
    },
};
const signInUser = {
    tags: ['Authentication'],
    description:
        'sign in a user, on successful signin you will get a token in your browser cookies',
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        email: {
                            type: 'string',
                            description: 'valid Email of the user',
                            example: 'mark@gmail.com',
                        },
                        password: {
                            type: 'string',
                            description:
                                'A unique password of the user with a combination of capital letter, small letter, numbers and signs',
                            example: 'Password123@.',
                        },
                    },
                },
            },
        },
    },
    responses: {
        200: {
            description: 'Ok',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        example: user[3],
                    },
                },
            },
        },
        422: {
            description: 'Unprocessable Entity',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        example: user[5],
                    },
                },
            },
        },
        403: {
            description: 'Forbidden',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        example: user[6],
                    },
                },
            },
        },
    },
};

const authRouteDoc = {
    '/api/v1/auth/register': {
        post: {
            ...createUser,
        },
    },
    '/api/v1/auth/account-activation': {
        post: {
            ...verifyAccount,
        },
    },
    '/api/v1/auth/login': {
        post: {
            ...signInUser,
        },
    },
};

export default authRouteDoc;
