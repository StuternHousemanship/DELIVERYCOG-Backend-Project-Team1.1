import authRouteDoc from './auth.docs';
const swaggerDocumentation = {
    openapi: '3.0.3',
    info: {
        title: 'DeliveryCog Documentation',
        version: '0.0.2',
        description: 'Documentations for DeliveryCog APIs',
    },
    servers: [
        {
            url: 'http://localhost:8000',
            description: 'Local dev',
        },
        {
            url: 'http://production',
            description: 'Production dev',
        },
    ],
    tags: [
        {
            name: 'Authentication',
            description: 'Authentication Routes',
        },
    ],
    paths: {
        ...authRouteDoc,
    },
};
export default swaggerDocumentation;
