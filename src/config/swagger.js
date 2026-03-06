const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    openapi: '3.0.0', // Standard actuel
    info: {
        title: '🛡️ API Sécurisée - Exo 3 puis 4 puis 5 🛡️',
        version: '1.0.0',
        description: "Documentation interactive de l'API faite pour appliquer la formation de Aherbeth.",
        contact: {
            name: 'Support Sécurité',
            email: 'contact@security.fr',
        },
    },
    servers: [
        {
            url: `http://localhost:3000/`,
            description: 'Serveur de Développement',
        },
    ],
    // 🚨 TRÈS IMPORTANT : On déclare ici à Swagger comment on s'authentifie
    components: {

    },
    // Applique la sécurité globale (ou peut être fait route par route)
    security: [
        { bearerAuth: [] }
    ],
};

const options = {
    swaggerDefinition,
    // Où Swagger doit-il aller lire nos commentaires pour générer la doc ?
    apis: ['./src/modules/**/*.routes.js', './src/modules/**/*.schema.js', './app.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;