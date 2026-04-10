# ⚡ TechnoCollège

Plateforme pédagogique pour la Technologie au collège (cycle 4).
21 séquences clé en main, 256 documents HTML, assistant IA, quiz interactifs.

## 🚀 Déploiement gratuit

### Option 1 : Vercel (recommandé, le plus simple)

1. Va sur [vercel.com](https://vercel.com) et crée un compte gratuit (avec GitHub ou email)
2. Clique sur **"Add New" → "Project"**
3. Clique sur **"Upload"** (en bas) et glisse le dossier `technocollege/`
4. Vercel détecte automatiquement Vite/React
5. Clique **"Deploy"**
6. Ton site est en ligne en ~1 min sur `technocollege-xxx.vercel.app`

**Domaine personnalisé** : dans les settings du projet, ajoute ton domaine (ex: technocollege.dlc37.fr)

### Option 2 : Netlify

1. Va sur [netlify.com](https://netlify.com) et crée un compte
2. Clique **"Add new site" → "Deploy manually"**
3. Glisse le dossier `technocollege/` entier
4. C'est en ligne sur `xxx.netlify.app`

### Option 3 : GitHub Pages (via GitHub Actions)

1. Crée un repo GitHub
2. Push le code
3. Dans Settings → Pages, choisis "GitHub Actions"
4. Ajoute un workflow Vite (Vercel est plus simple)

### Option 4 : Sur ton serveur Digital Ocean (dlc37.fr)

```bash
# Sur ta machine locale
cd technocollege
npm install
npm run build

# Upload le dossier dist/ sur ton serveur via FileZilla
# Place les fichiers dans /var/www/technocollege/
# Configure Nginx :
```

```nginx
server {
    listen 80;
    server_name technocollege.dlc37.fr;
    root /var/www/technocollege;
    index index.html;
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 💻 Développement local

```bash
npm install
npm run dev
# → http://localhost:5173
```

## 📦 Build production

```bash
npm run build
# → fichiers statiques dans dist/
```

## 📋 Contenu

- **5ème** : 7 séquences (Découverte, Besoins, Éclairage auto, Réparabilité, Robot, Scratch, Web HTML)
- **4ème** : 7 séquences (Analyse OST, Contraintes, Données, Python IoT, Réseau, Python projets, HTML/CSS)
- **3ème** : 7 séquences (Innovations, Analyse systémique, IA, Cybersécurité, Éco-conception, Python avancé, Cyber pratique)

Chaque séquence contient : fiches enseignant, fiches élève, diaporamas, évaluations, corrigés, fiches de synthèse.

## ⚙️ Fonctionnalités

- 📄 256 documents HTML téléchargeables
- 🤖 Assistant IA intégré (API Claude)
- 🧩 Quiz interactifs
- 👤 Comptes utilisateurs
- ❤️ Likes et 💬 commentaires
- 📦 Publication de séquences (ZIP + IA)
- 📥 Export ZIP de tous les documents
