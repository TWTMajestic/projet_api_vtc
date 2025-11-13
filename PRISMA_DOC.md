# Guide Prisma

## Génération du client

- Exécuter `npm run prisma:generate` après toute modification de `prisma/schema.prisma`.
- Le client est généré dans `app/generated/prisma` et exposé via `app/lib/prisma.ts`.
- Importer l’instance partagée avec `import prisma from "@/app/lib/prisma";`.

## Migrations

1. Modifier les modèles dans `prisma/schema.prisma`.
2. Créer et appliquer une migration :
   ```bash
   npm run prisma:migrate -- --name nom-de-migration
   ```
3. La commande met à jour la base, garde un historique dans `prisma/migrations` et régénère le client.

## Usage dans Next.js

```ts
import prisma from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";

export async function listVehicles() {
  return prisma.vehicle.findMany({
    include: { model: true, seller: true },
  });
}

export async function createVehicle(input: {
  modelId: string;
  sellerId?: string;
  priceEUR?: string;
}) {
  return prisma.vehicle.create({
    data: {
      modelId: input.modelId,
      sellerId: input.sellerId,
      priceEUR: input.priceEUR ? new Prisma.Decimal(input.priceEUR) : undefined,
    },
  });
}
```

## Inspection des données

- Lancer `npm run prisma:studio` pour ouvrir l’interface Prisma Studio.
- Permet de visualiser, créer ou modifier des enregistrements dans la base.

## Variables d’environnement

- La connexion est définie via `DATABASE_URL` dans `.env`.
- Exemple : `postgresql://user:password@localhost:5432/projet_api_vtc?schema=public`.
- `prisma.config.ts` charge automatiquement les variables grâce à `import "dotenv/config";`.

## Prisma Accelerate

- Le schéma active l’extension `accelerate()` dans `generator client`.
- `app/lib/prisma.ts` étend `PrismaClient` avec `withAccelerate()`.
- Pour l’utiliser en production, renseigner les variables requises par Prisma Accelerate (URL, token).
  Si non utilisé : retirer l’extension dans le schéma et l’extension côté client.

## Bonnes pratiques

- Versionner les migrations et exécuter `npm run prisma:migrate` sur chaque environnement.
- Régénérer le client après chaque migration (`npm run prisma:generate`).
- Éviter d’instancier plusieurs `PrismaClient` : utiliser l’instance partagée fournie.
- Protéger le fichier `.env` (`.gitignore` doit inclure `.env`).

## Domaine modélisé

- `Model` : fiche modèle avec marque et période de production.
- `Seller` : vendeur (professionnel ou particulier) pouvant proposer plusieurs véhicules.
- `Vehicle` : véhicule concret rattaché à un modèle et optionnellement à un vendeur (VIN, immatriculation, kilométrage, prix, remarque).

## Ressources

- Prisma : https://www.prisma.io/docs
- Prisma Client API : https://www.prisma.io/docs/reference/api-reference/prisma-client-reference
- Prisma Accelerate : https://www.prisma.io/accelerate
