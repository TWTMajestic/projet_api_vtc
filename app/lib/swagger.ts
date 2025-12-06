export const swaggerSpec = {
  openapi: "3.0.3",
  info: {
    title: "API VTC - Documentation",
    description: `
# API de gestion de véhicules VTC

Cette API permet de gérer les véhicules, modèles, vendeurs et utilisateurs pour une plateforme VTC.

## Versions disponibles

- **v1**: API de base avec authentification par session
- **v2**: API améliorée avec authentification JWT (access + refresh tokens)

## Authentification

### API v1
Utilise des cookies de session simples.

### API v2
Utilise JWT avec:
- **Access Token**: Expire en 30 secondes (pour les tests)
- **Refresh Token**: Expire en 7 jours

Pour les endpoints protégés, incluez le header:
\`\`\`
Authorization: Bearer <votre_access_token>
\`\`\`
    `,
    version: "1.0.0",
    contact: {
      name: "Support API",
    },
  },
  servers: [
    {
      url: "/api",
      description: "Serveur local",
    },
  ],
  tags: [
    { name: "Root", description: "Endpoints racine" },
    { name: "Auth v1", description: "Authentification v1 (session)" },
    { name: "Auth v2", description: "Authentification v2 (JWT)" },
    { name: "Models v1", description: "Gestion des modèles v1" },
    { name: "Models v2", description: "Gestion des modèles v2" },
    { name: "Vehicles v1", description: "Gestion des véhicules v1" },
    { name: "Vehicles v2", description: "Gestion des véhicules v2" },
    { name: "Sellers v1", description: "Gestion des vendeurs v1" },
    { name: "Sellers v2", description: "Gestion des vendeurs v2" },
    { name: "Admin", description: "Administration des utilisateurs (v2)" },
    { name: "AI", description: "Intégration IA (Groq)" },
    { name: "Status", description: "Santé de l'API" },
  ],
  paths: {
    // ==================== ROOT ====================
    "/": {
      get: {
        tags: ["Root"],
        summary: "Racine de l'API",
        description: "Retourne les namespaces disponibles",
        responses: {
          "200": {
            description: "Succès",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "API root. Available namespaces: v1." },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/v1": {
      get: {
        tags: ["Root"],
        summary: "Racine API v1",
        responses: {
          "200": {
            description: "Succès",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "API v1 root" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/v2": {
      get: {
        tags: ["Root"],
        summary: "Racine API v2",
        description: "Retourne les informations sur l'API v2 et la documentation des endpoints",
        responses: {
          "200": {
            description: "Succès",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    version: { type: "string", example: "2.0" },
                    message: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    },

    // ==================== AUTH V1 ====================
    "/v1/auth/register": {
      post: {
        tags: ["Auth v1"],
        summary: "Inscription d'un utilisateur",
        description: "Crée un nouveau compte utilisateur",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/RegisterRequest" },
              example: {
                email: "user@example.com",
                password: "password123",
                name: "John Doe",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Utilisateur créé",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: { $ref: "#/components/schemas/User" },
                  },
                },
              },
            },
          },
          "400": {
            description: "Données invalides",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
          "409": {
            description: "Email déjà utilisé",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
    },
    "/v1/auth/login": {
      post: {
        tags: ["Auth v1"],
        summary: "Connexion utilisateur",
        description: "Authentifie un utilisateur et retourne un token de session",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginRequest" },
              example: {
                email: "user@example.com",
                password: "password123",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Connexion réussie",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "object",
                      properties: {
                        token: { type: "string" },
                        user: { $ref: "#/components/schemas/User" },
                      },
                    },
                  },
                },
              },
            },
          },
          "400": {
            description: "Données invalides",
          },
          "401": {
            description: "Identifiants incorrects",
          },
        },
      },
    },

    // ==================== AUTH V2 ====================
    "/v2/auth/login": {
      post: {
        tags: ["Auth v2"],
        summary: "Connexion JWT",
        description: "Authentifie et retourne access + refresh tokens",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginRequest" },
              example: {
                email: "admin@example.com",
                password: "password123",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Connexion réussie",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "object",
                      properties: {
                        accessToken: { type: "string", description: "Token d'accès (30s)" },
                        refreshToken: { type: "string", description: "Token de rafraîchissement (7j)" },
                        user: { $ref: "#/components/schemas/UserWithRole" },
                      },
                    },
                  },
                },
              },
            },
          },
          "401": {
            description: "Identifiants incorrects",
          },
        },
      },
    },
    "/v2/auth/logout": {
      post: {
        tags: ["Auth v2"],
        summary: "Déconnexion",
        description: "Révoque le refresh token et efface les cookies",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "Déconnexion réussie",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string", example: "Déconnexion réussie" },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/v2/auth/refresh": {
      post: {
        tags: ["Auth v2"],
        summary: "Rafraîchir le token",
        description: "Génère un nouveau access token à partir du refresh token",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  refreshToken: { type: "string", description: "Optionnel si cookie présent" },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Token rafraîchi",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "object",
                      properties: {
                        accessToken: { type: "string" },
                        user: { $ref: "#/components/schemas/UserWithRole" },
                      },
                    },
                  },
                },
              },
            },
          },
          "401": {
            description: "Refresh token invalide ou expiré",
          },
        },
      },
    },

    // ==================== MODELS V1 ====================
    "/v1/models": {
      get: {
        tags: ["Models v1"],
        summary: "Lister tous les modèles",
        description: "Retourne la liste de tous les modèles triés par marque et nom",
        responses: {
          "200": {
            description: "Liste des modèles",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Model" },
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Models v1"],
        summary: "Créer un modèle",
        description: "Crée un nouveau modèle de véhicule",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ModelCreate" },
              example: {
                name: "Model S",
                brand: "Tesla",
                yearStart: 2012,
                yearEnd: null,
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Modèle créé",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: { $ref: "#/components/schemas/Model" },
                  },
                },
              },
            },
          },
          "400": {
            description: "Données invalides",
          },
        },
      },
    },
    "/v1/models/{id}": {
      get: {
        tags: ["Models v1"],
        summary: "Obtenir un modèle",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
            description: "ID du modèle",
          },
        ],
        responses: {
          "200": {
            description: "Modèle trouvé",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: { $ref: "#/components/schemas/Model" },
                  },
                },
              },
            },
          },
          "404": {
            description: "Modèle introuvable",
          },
        },
      },
      patch: {
        tags: ["Models v1"],
        summary: "Modifier un modèle",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ModelUpdate" },
            },
          },
        },
        responses: {
          "200": {
            description: "Modèle modifié",
          },
          "404": {
            description: "Modèle introuvable",
          },
        },
      },
      delete: {
        tags: ["Models v1"],
        summary: "Supprimer un modèle",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "204": {
            description: "Modèle supprimé",
          },
          "400": {
            description: "Impossible de supprimer (véhicules associés)",
          },
          "404": {
            description: "Modèle introuvable",
          },
        },
      },
    },

    // ==================== MODELS V2 ====================
    "/v2/models": {
      get: {
        tags: ["Models v2"],
        summary: "Lister tous les modèles",
        description: "Endpoint public - pas d'authentification requise",
        responses: {
          "200": {
            description: "Liste des modèles",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Model" },
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Models v2"],
        summary: "Créer un modèle",
        description: "Requiert une authentification JWT",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ModelCreate" },
            },
          },
        },
        responses: {
          "201": {
            description: "Modèle créé",
          },
          "401": {
            description: "Non authentifié",
          },
        },
      },
    },
    "/v2/models/{id}": {
      get: {
        tags: ["Models v2"],
        summary: "Obtenir un modèle avec ses véhicules",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Modèle avec véhicules associés",
          },
          "404": {
            description: "Modèle introuvable",
          },
        },
      },
      patch: {
        tags: ["Models v2"],
        summary: "Modifier un modèle",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ModelUpdate" },
            },
          },
        },
        responses: {
          "200": {
            description: "Modèle modifié",
          },
          "401": {
            description: "Non authentifié",
          },
        },
      },
      delete: {
        tags: ["Models v2"],
        summary: "Supprimer un modèle",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "204": {
            description: "Modèle supprimé",
          },
          "401": {
            description: "Non authentifié",
          },
        },
      },
    },

    // ==================== VEHICLES V1 ====================
    "/v1/vehicles": {
      get: {
        tags: ["Vehicles v1"],
        summary: "Lister les véhicules",
        parameters: [
          {
            name: "modelId",
            in: "query",
            schema: { type: "string" },
            description: "Filtrer par modèle",
          },
          {
            name: "sellerId",
            in: "query",
            schema: { type: "string" },
            description: "Filtrer par vendeur",
          },
        ],
        responses: {
          "200": {
            description: "Liste des véhicules",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Vehicle" },
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Vehicles v1"],
        summary: "Créer un véhicule",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/VehicleCreate" },
              example: {
                modelId: "clxxxxx",
                sellerId: null,
                mileageKm: 50000,
                priceEUR: "35000",
                color: "Noir",
                notes: "Très bon état",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Véhicule créé",
          },
          "400": {
            description: "Données invalides ou modelId inexistant",
          },
        },
      },
    },
    "/v1/vehicles/{id}": {
      get: {
        tags: ["Vehicles v1"],
        summary: "Obtenir un véhicule",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Véhicule trouvé",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: { $ref: "#/components/schemas/Vehicle" },
                  },
                },
              },
            },
          },
          "404": {
            description: "Véhicule introuvable",
          },
        },
      },
      patch: {
        tags: ["Vehicles v1"],
        summary: "Modifier un véhicule",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/VehicleUpdate" },
            },
          },
        },
        responses: {
          "200": {
            description: "Véhicule modifié",
          },
          "404": {
            description: "Véhicule introuvable",
          },
        },
      },
      delete: {
        tags: ["Vehicles v1"],
        summary: "Supprimer un véhicule",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "204": {
            description: "Véhicule supprimé",
          },
          "404": {
            description: "Véhicule introuvable",
          },
        },
      },
    },

    // ==================== VEHICLES V2 ====================
    "/v2/vehicles": {
      get: {
        tags: ["Vehicles v2"],
        summary: "Lister les véhicules",
        description: "Endpoint public",
        parameters: [
          {
            name: "modelId",
            in: "query",
            schema: { type: "string" },
          },
          {
            name: "sellerId",
            in: "query",
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Liste des véhicules",
          },
        },
      },
      post: {
        tags: ["Vehicles v2"],
        summary: "Créer un véhicule",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/VehicleCreate" },
            },
          },
        },
        responses: {
          "201": {
            description: "Véhicule créé",
          },
          "401": {
            description: "Non authentifié",
          },
        },
      },
    },
    "/v2/vehicles/{id}": {
      get: {
        tags: ["Vehicles v2"],
        summary: "Obtenir un véhicule",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Véhicule trouvé",
          },
          "404": {
            description: "Véhicule introuvable",
          },
        },
      },
      patch: {
        tags: ["Vehicles v2"],
        summary: "Modifier un véhicule",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/VehicleUpdate" },
            },
          },
        },
        responses: {
          "200": {
            description: "Véhicule modifié",
          },
          "401": {
            description: "Non authentifié",
          },
        },
      },
      delete: {
        tags: ["Vehicles v2"],
        summary: "Supprimer un véhicule",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "204": {
            description: "Véhicule supprimé",
          },
          "401": {
            description: "Non authentifié",
          },
        },
      },
    },

    // ==================== SELLERS V1 ====================
    "/v1/sellers": {
      get: {
        tags: ["Sellers v1"],
        summary: "Lister les vendeurs",
        responses: {
          "200": {
            description: "Liste des vendeurs",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Seller" },
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Sellers v1"],
        summary: "Créer un vendeur",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SellerCreate" },
              example: {
                name: "AutoPlus Paris",
                email: "contact@autoplus.fr",
                phone: "+33 1 23 45 67 89",
                website: "https://autoplus.fr",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Vendeur créé",
          },
          "400": {
            description: "Données invalides",
          },
        },
      },
    },
    "/v1/sellers/{id}": {
      get: {
        tags: ["Sellers v1"],
        summary: "Obtenir un vendeur avec ses véhicules",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Vendeur avec véhicules",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: { $ref: "#/components/schemas/SellerWithVehicles" },
                  },
                },
              },
            },
          },
          "404": {
            description: "Vendeur introuvable",
          },
        },
      },
      patch: {
        tags: ["Sellers v1"],
        summary: "Modifier un vendeur",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SellerUpdate" },
            },
          },
        },
        responses: {
          "200": {
            description: "Vendeur modifié",
          },
          "404": {
            description: "Vendeur introuvable",
          },
        },
      },
      delete: {
        tags: ["Sellers v1"],
        summary: "Supprimer un vendeur",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "204": {
            description: "Vendeur supprimé",
          },
          "400": {
            description: "Impossible de supprimer (véhicules associés)",
          },
        },
      },
    },

    // ==================== SELLERS V2 ====================
    "/v2/sellers": {
      get: {
        tags: ["Sellers v2"],
        summary: "Lister les vendeurs",
        description: "Endpoint public",
        responses: {
          "200": {
            description: "Liste des vendeurs",
          },
        },
      },
      post: {
        tags: ["Sellers v2"],
        summary: "Créer un vendeur",
        description: "Requiert authentification + rôle ADMIN",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SellerCreate" },
            },
          },
        },
        responses: {
          "201": {
            description: "Vendeur créé",
          },
          "401": {
            description: "Non authentifié",
          },
          "403": {
            description: "Accès refusé (admin requis)",
          },
        },
      },
    },
    "/v2/sellers/{id}": {
      get: {
        tags: ["Sellers v2"],
        summary: "Obtenir un vendeur",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Vendeur trouvé",
          },
          "404": {
            description: "Vendeur introuvable",
          },
        },
      },
      patch: {
        tags: ["Sellers v2"],
        summary: "Modifier un vendeur",
        description: "Requiert rôle ADMIN",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/SellerUpdate" },
            },
          },
        },
        responses: {
          "200": {
            description: "Vendeur modifié",
          },
          "403": {
            description: "Accès refusé (admin requis)",
          },
        },
      },
      delete: {
        tags: ["Sellers v2"],
        summary: "Supprimer un vendeur",
        description: "Requiert rôle ADMIN",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "204": {
            description: "Vendeur supprimé",
          },
          "403": {
            description: "Accès refusé (admin requis)",
          },
        },
      },
    },

    // ==================== ADMIN ====================
    "/v2/admin/users": {
      get: {
        tags: ["Admin"],
        summary: "Lister tous les utilisateurs",
        description: "Requiert rôle ADMIN",
        security: [{ bearerAuth: [] }],
        responses: {
          "200": {
            description: "Liste des utilisateurs",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/UserWithRole" },
                    },
                  },
                },
              },
            },
          },
          "401": {
            description: "Non authentifié",
          },
          "403": {
            description: "Accès refusé (admin requis)",
          },
        },
      },
      post: {
        tags: ["Admin"],
        summary: "Créer un utilisateur",
        description: "Requiert rôle ADMIN. Permet de créer des admins.",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AdminUserCreate" },
              example: {
                email: "newadmin@example.com",
                password: "securepassword",
                name: "New Admin",
                role: "ADMIN",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Utilisateur créé",
          },
          "403": {
            description: "Accès refusé",
          },
          "409": {
            description: "Email déjà utilisé",
          },
        },
      },
    },
    "/v2/admin/users/{id}": {
      patch: {
        tags: ["Admin"],
        summary: "Modifier le rôle d'un utilisateur",
        description: "Requiert rôle ADMIN. Impossible de modifier son propre rôle.",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  role: {
                    type: "string",
                    enum: ["USER", "ADMIN"],
                  },
                },
                required: ["role"],
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Rôle modifié",
          },
          "400": {
            description: "Impossible de modifier son propre rôle",
          },
          "403": {
            description: "Accès refusé",
          },
        },
      },
      delete: {
        tags: ["Admin"],
        summary: "Supprimer un utilisateur",
        description: "Requiert rôle ADMIN. Impossible de se supprimer soi-même.",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Utilisateur supprimé",
          },
          "400": {
            description: "Impossible de supprimer son propre compte",
          },
          "403": {
            description: "Accès refusé",
          },
        },
      },
    },

    // ==================== AI ====================
    "/v1/ai": {
      get: {
        tags: ["AI"],
        summary: "Documentation de l'API IA",
        description: "Retourne les actions disponibles pour l'IA",
        responses: {
          "200": {
            description: "Documentation",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                    availableActions: {
                      type: "array",
                      items: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["AI"],
        summary: "Interagir avec l'IA",
        description: "Utilise Groq AI (via OpenRouter) pour différentes actions",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                oneOf: [
                  { $ref: "#/components/schemas/AIChatRequest" },
                  { $ref: "#/components/schemas/AIDescriptionRequest" },
                  { $ref: "#/components/schemas/AIEstimateRequest" },
                  { $ref: "#/components/schemas/AIAssistantRequest" },
                ],
              },
              examples: {
                chat: {
                  summary: "Chat libre",
                  value: {
                    action: "chat",
                    messages: [{ role: "user", content: "Bonjour!" }],
                  },
                },
                description: {
                  summary: "Générer description véhicule",
                  value: {
                    action: "description",
                    vehicle: {
                      brand: "Tesla",
                      model: "Model 3",
                      year: 2022,
                      mileage: 25000,
                      color: "Blanc",
                    },
                  },
                },
                estimate: {
                  summary: "Estimer prix véhicule",
                  value: {
                    action: "estimate",
                    vehicle: {
                      brand: "BMW",
                      model: "Série 3",
                      year: 2020,
                      mileage: 45000,
                    },
                  },
                },
                assistant: {
                  summary: "Question à l'assistant",
                  value: {
                    action: "assistant",
                    question: "Quels sont les critères pour choisir un bon VTC?",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Réponse de l'IA",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    response: { type: "string" },
                  },
                },
              },
            },
          },
          "400": {
            description: "Action invalide ou paramètres manquants",
          },
          "500": {
            description: "Erreur du service IA",
          },
        },
      },
    },

    // ==================== STATUS ====================
    "/v1/status": {
      get: {
        tags: ["Status"],
        summary: "Vérifier l'état de l'API",
        description: "Vérifie que l'API fonctionne et que la base de données est connectée",
        responses: {
          "200": {
            description: "API opérationnelle",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "ok" },
                    message: { type: "string", example: "API is running and database is connected" },
                    timestamp: { type: "string", format: "date-time" },
                  },
                },
              },
            },
          },
          "503": {
            description: "Base de données non connectée",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: { type: "string", example: "error" },
                    message: { type: "string" },
                    timestamp: { type: "string", format: "date-time" },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Token JWT obtenu via /v2/auth/login",
      },
    },
    schemas: {
      // Auth schemas
      RegisterRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string", minLength: 6 },
          name: { type: "string" },
        },
      },
      LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string" },
        },
      },

      // User schemas
      User: {
        type: "object",
        properties: {
          id: { type: "string" },
          email: { type: "string" },
          name: { type: "string", nullable: true },
        },
      },
      UserWithRole: {
        type: "object",
        properties: {
          id: { type: "string" },
          email: { type: "string" },
          name: { type: "string", nullable: true },
          role: { type: "string", enum: ["USER", "ADMIN"] },
          createdAt: { type: "string", format: "date-time" },
        },
      },
      AdminUserCreate: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", format: "email" },
          password: { type: "string", minLength: 6 },
          name: { type: "string" },
          role: { type: "string", enum: ["USER", "ADMIN"], default: "USER" },
        },
      },

      // Model schemas
      Model: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          brand: { type: "string" },
          yearStart: { type: "integer", nullable: true },
          yearEnd: { type: "integer", nullable: true },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      ModelCreate: {
        type: "object",
        required: ["name", "brand"],
        properties: {
          name: { type: "string" },
          brand: { type: "string" },
          yearStart: { type: "integer", nullable: true },
          yearEnd: { type: "integer", nullable: true },
        },
      },
      ModelUpdate: {
        type: "object",
        properties: {
          name: { type: "string" },
          brand: { type: "string" },
          yearStart: { type: "integer", nullable: true },
          yearEnd: { type: "integer", nullable: true },
        },
      },

      // Vehicle schemas
      Vehicle: {
        type: "object",
        properties: {
          id: { type: "string" },
          modelId: { type: "string" },
          sellerId: { type: "string", nullable: true },
          mileageKm: { type: "integer", nullable: true },
          priceEUR: { type: "string", nullable: true, description: "Prix en EUR (Decimal)" },
          color: { type: "string", nullable: true },
          notes: { type: "string", nullable: true },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
          model: { $ref: "#/components/schemas/Model" },
          seller: { $ref: "#/components/schemas/Seller" },
        },
      },
      VehicleCreate: {
        type: "object",
        required: ["modelId"],
        properties: {
          modelId: { type: "string" },
          sellerId: { type: "string", nullable: true },
          mileageKm: { type: "integer", nullable: true },
          priceEUR: { type: "string", nullable: true },
          color: { type: "string", nullable: true },
          notes: { type: "string", nullable: true },
        },
      },
      VehicleUpdate: {
        type: "object",
        properties: {
          modelId: { type: "string" },
          sellerId: { type: "string", nullable: true },
          mileageKm: { type: "integer", nullable: true },
          priceEUR: { type: "string", nullable: true },
          color: { type: "string", nullable: true },
          notes: { type: "string", nullable: true },
        },
      },

      // Seller schemas
      Seller: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          email: { type: "string", nullable: true },
          phone: { type: "string", nullable: true },
          website: { type: "string", nullable: true },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
        },
      },
      SellerWithVehicles: {
        allOf: [
          { $ref: "#/components/schemas/Seller" },
          {
            type: "object",
            properties: {
              vehicles: {
                type: "array",
                items: { $ref: "#/components/schemas/Vehicle" },
              },
            },
          },
        ],
      },
      SellerCreate: {
        type: "object",
        required: ["name"],
        properties: {
          name: { type: "string" },
          email: { type: "string", format: "email", nullable: true },
          phone: { type: "string", nullable: true },
          website: { type: "string", format: "uri", nullable: true },
        },
      },
      SellerUpdate: {
        type: "object",
        properties: {
          name: { type: "string" },
          email: { type: "string", format: "email", nullable: true },
          phone: { type: "string", nullable: true },
          website: { type: "string", format: "uri", nullable: true },
        },
      },

      // AI schemas
      AIChatRequest: {
        type: "object",
        required: ["action", "messages"],
        properties: {
          action: { type: "string", enum: ["chat"] },
          messages: {
            type: "array",
            items: {
              type: "object",
              properties: {
                role: { type: "string", enum: ["user", "assistant", "system"] },
                content: { type: "string" },
              },
            },
          },
          systemPrompt: { type: "string" },
        },
      },
      AIDescriptionRequest: {
        type: "object",
        required: ["action", "vehicle"],
        properties: {
          action: { type: "string", enum: ["description"] },
          vehicle: {
            type: "object",
            properties: {
              brand: { type: "string" },
              model: { type: "string" },
              year: { type: "integer" },
              mileage: { type: "integer" },
              color: { type: "string" },
            },
          },
        },
      },
      AIEstimateRequest: {
        type: "object",
        required: ["action", "vehicle"],
        properties: {
          action: { type: "string", enum: ["estimate"] },
          vehicle: {
            type: "object",
            properties: {
              brand: { type: "string" },
              model: { type: "string" },
              year: { type: "integer" },
              mileage: { type: "integer" },
            },
          },
        },
      },
      AIAssistantRequest: {
        type: "object",
        required: ["action", "question"],
        properties: {
          action: { type: "string", enum: ["assistant"] },
          question: { type: "string" },
        },
      },

      // Error schema
      Error: {
        type: "object",
        properties: {
          error: { type: "string" },
        },
      },
    },
  },
};