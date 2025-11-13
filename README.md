This project is built with [Next.js](https://nextjs.org) and uses [Prisma](https://www.prisma.io/) as the ORM to manage a VTC (véhicule de transport avec chauffeur) domain.

## Prérequis

- Node.js >= 18.18.0
- Une base PostgreSQL accessible via la variable d’environnement `DATABASE_URL` (voir `.env`)

## Scripts principaux

```bash
npm run dev             # Lancer Next.js en mode développement
npm run build           # Compiler l’application pour la production
npm run start           # Démarrer le serveur en production
npm run lint            # Vérifier le linting
npm run prisma:generate # Générer le client Prisma
npm run prisma:migrate  # Appliquer les migrations en développement
npm run prisma:studio   # Ouvrir Prisma Studio
```

## Configuration Prisma

- Le schéma se trouve dans `prisma/schema.prisma`.
- Le client généré est émis dans `app/generated/prisma`.
- `app/lib/prisma.ts` expose une instance unique de `PrismaClient` avec l’extension [Prisma Accelerate](https://www.prisma.io/accelerate).
- Assurez-vous que `DATABASE_URL` est défini dans `.env` (exemple : `postgresql://user:password@localhost:5432/projet_api_vtc?schema=public`).

### Créer / mettre à jour la base

1. Modifiez ou ajoutez vos modèles dans `prisma/schema.prisma`.
2. Générez le client :

   ```bash
   npm run prisma:generate
   ```

3. Créez une migration et appliquez-la :

   ```bash
   npm run prisma:migrate --name <nom-de-migration>
   ```

4. Facultatif : lancez Prisma Studio pour inspecter les données :

   ```bash
   npm run prisma:studio
   ```

### Utilisation dans le code

```ts
// app/lib/prisma.ts expose déjà une instance partagée
import prisma from "@/app/lib/prisma";

export async function listDrivers() {
  return prisma.driver.findMany({
    where: { status: "APPROVED" },
    include: { vehicles: true },
  });
}
```

## Domaines modélisés

- `User` : représente les passagers, les chauffeurs et les administrateurs.
- `Driver` : profil conducteur avec état de validation, note et véhicules.
- `Vehicle` : informations véhicule, plaque et capacité.
- `Ride` : courses avec géolocalisation, statut et tarification.
- Enums `UserRole`, `DriverStatus`, `RideStatus` pour les états clés.

## Aller plus loin

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Prisma](https://www.prisma.io/docs)
- [Prisma Accelerate](https://www.prisma.io/accelerate)
