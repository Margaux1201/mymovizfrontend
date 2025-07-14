# MyMoviz

MyMoviz est une application web permettant de découvrir les derniers films sortis, de les ajouter à vos favoris, de noter et de suivre vos visionnages.

## Structure du projet

```
mymovizbackend/    # Backend Node.js/Express
mymovizfrontend/   # Frontend Next.js/React
```

---

## 1. Backend ([mymovizbackend](mymovizbackend/app.js))

### Description

Le backend est une API REST construite avec Express.js. Il expose des routes pour récupérer la liste des films et gérer les favoris.

### Structure

- `app.js` : Point d'entrée principal de l'application Express.
- `bin/www` : Script de lancement du serveur HTTP.
- `routes/` : Contient les routes Express (`index.js`, `movies.js`).
- `public/` : Fichiers statiques (HTML, CSS).

### Installation

```sh
cd mymovizbackend
npm install
```

### Lancement

```sh
npm start
# ou
node ./bin/www
```

Le serveur écoute par défaut sur le port `3000` (modifiable via `.env`).

### Endpoints principaux

- `GET /movies` : Récupère la liste des derniers films (source : The Movie Database API ou base de données locale).

---

## 2. Frontend ([mymovizfrontend](mymovizfrontend/pages/index.js))

### Description

Le frontend est une application React (Next.js) qui affiche les films, permet de les liker, de les noter et de suivre les visionnages.

### Structure

- `components/`
  - `Home.js` : Page principale, affiche les films et les favoris.
  - `Movie.js` : Composant d'affichage d'un film (note, favoris, visionnages).
- `pages/`
  - `_app.js` : Configuration globale Next.js.
  - `index.js` : Page d'accueil.
- `public/` : Images et favicon.
- `styles/` : Fichiers CSS/SCSS.

### Installation

```sh
cd mymovizfrontend
npm install
```

### Lancement

```sh
npm run dev
```

L'application sera disponible sur [http://localhost:3001](http://localhost:3001) (ou un autre port selon la config).

### Fonctionnalités principales

- **Affichage des derniers films** (récupérés via le backend)
- **Ajout/Suppression de favoris** (♥)
- **Notation personnelle** (étoiles bleues)
- **Suivi du nombre de visionnages** (icône caméra)
- **Popover** listant les films favoris

---

## 3. Configuration

- `.env` (backend) : Pour définir la variable d'environnement `OWM_API_KEY` qui correspond à la clé API TMDB.
- `vercel.json` : Configuration pour le déploiement sur Vercel (backend).

---

## 4. Lancement global

1. Démarrer le backend :
   ```sh
   cd mymovizbackend
   npm start
   ```
2. Démarrer le frontend :
   ```sh
   cd mymovizfrontend
   npm run dev
   ```

---

## 5. Dépendances principales

### Backend

- express
- cors
- dotenv
- morgan
- cookie-parser

### Frontend

- react / next
- @fortawesome/react-fontawesome
- antd (Popover, Button)
- fetch API

---

## 6. Améliorations possibles

- Persistance des favoris côté backend (BDD)
- Authentification utilisateur
- Recherche de films
- Responsive design

---

## 7. Auteur

Projet réalisé par Margaux Courageux.

---

## 8. Licence

MIT
