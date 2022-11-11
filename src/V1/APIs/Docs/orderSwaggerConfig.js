const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Delivery Order Manager API',
            description: 'For Order Management',
            contact: {
                name: 'DYC'
            },
            servers: ['http://localhost:3000']
        }
    },
    apis: ["../Routes/order/orderRoute/*.ts"]
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default swaggerOptions