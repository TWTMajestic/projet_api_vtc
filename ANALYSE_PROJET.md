# 📊 Analyse des Manquements du Projet API VTC

Ce document recense **uniquement ce qui manque** au projet actuel pour respecter le cahier des charges "Maîtrise d'une API REST".

---

## 🚨 Priorité Haute (Critique)

### 1. Documentation Swagger / OpenAPI

**État :** ❌ Non implémenté
**Manquant :**

- Documentation accessible via une route (ex: `/api-docs`).
- Exemples de requêtes et réponses pour chaque endpoint.
- Codes HTTP possibles (200, 201, 400, 404, 500).
- Section pour tester l'authentification (Bearer Token).

### 2. Routes Publiques vs Privées

**État :** ⚠️ Partiel
**Manquant :**

- Documentation claire des endpoints publics et privés.
- (Bonus) API publique distincte avec clé d'accès dynamique.

---

## 🟠 Priorité Moyenne (Fonctionnalités)

### 1. Authentification Avancée

**État :** ⚠️ Partiel
**Manquant :**

- **Route `/api/v1/profil`** : Accès aux infos de l'utilisateur connecté.
- **Google OAuth2** (Bonus) : Connexion via Google.

### 2. Intégration API Externe (IA)

**État :** ❌ Non implémenté
**Manquant :**

- Intégration de **Groq Cloud** (ou autre IA).
- Idées d'implémentation :
  - Génération de description de véhicule.
  - Estimation de prix basée sur le kilométrage et l'année.
  - Chatbot assistant pour les vendeurs.

---

## 🛠️ DevOps & Qualité

### 1. Déploiement & Conteneurisation

**État :** ❌ Non implémenté
**Manquant :**

- **Docker** : Fichier `Dockerfile` et `docker-compose.yml` (DB + App).
- **Déploiement** : Mise en ligne sur Vercel, Render ou Railway.
- **HTTPS** : Validation du fonctionnement en HTTPS.

### 2. Tests Automatisés

**État :** ❌ Non implémenté
**Manquant :**

- Tests unitaires ou d'intégration sur au moins un endpoint (ex: Jest, Vitest).

### 3. README & Documentation Projet

**État :** ⚠️ Incomplet
**Manquant :**

- Schéma global de l'architecture.
- Instructions détaillées d'installation et d'utilisation.
- Liste des clés de configuration nécessaires.

---

## � Résumé des Tâches à Réaliser

1.  [ ] Installer et configurer **Swagger** (`next-swagger-doc` + `swagger-ui-react`).

2.  [ ] Implémenter la route **Profil** (`/api/v1/profil`).
3.  [ ] Créer un service pour **Groq Cloud** (IA).
4.  [ ] Ajouter **Docker** et préparer le déploiement.
5.  [ ] Écrire des **Tests** pour un endpoint critique (ex: Auth ou Vehicles).
6.  [ ] Compléter le **README.md**.
