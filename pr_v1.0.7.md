# Pull Request: v1.0.7 - Installation PWA + Fix Mobile Tavli

## 🎯 Objectif

Améliorer l'expérience utilisateur en ajoutant une fonction d'installation PWA et en corrigeant l'affichage du jeu de Tavli sur mobile.

## 📋 Changements

### 1. Installation PWA (📥)

**Fichiers modifiés:**
- `index.html` - Ajout bouton d'installation dans le header
- `js/app.js` - Logique d'installation PWA
- `styles.css` - Styles pour le bouton d'installation

**Fonctionnalités:**
- Bouton d'installation visible uniquement si la PWA n'est pas installée
- Gestion de l'événement `beforeinstallprompt`
- Installation en un clic
- Masquage automatique après installation

**Code ajouté:**
```javascript
setupPWA() {
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        this.deferredPrompt = e;
        document.getElementById('install-btn').style.display = 'block';
    });
}

async installPWA() {
    if (!this.deferredPrompt) return;
    this.deferredPrompt.prompt();
    const { outcome } = await this.deferredPrompt.userChoice;
    this.deferredPrompt = null;
    document.getElementById('install-btn').style.display = 'none';
}
```

### 2. Fix Tavli Mobile (📱)

**Fichiers modifiés:**
- `styles.css` - Ajout styles responsive pour Tavli

**Problème résolu:**
- Le plateau de Tavli était trop large sur mobile
- Les points étaient coupés ou illisibles
- Impossible de jouer correctement

**Solution:**
- Ajout scroll horizontal sur mobile
- Réduction taille des pions (25px au lieu de 30px)
- Réduction largeur des points (35px au lieu de 40px)
- Largeur minimale pour garantir la jouabilité

**Code ajouté:**
```css
@media (max-width: 768px) {
    .backgammon-board {
        max-width: 95vw;
        overflow-x: auto;
    }
    
    .top-points, .bottom-points {
        min-width: 500px;
    }
    
    .point {
        width: 35px;
    }
    
    .checker {
        width: 25px;
        height: 25px;
    }
}
```

### 3. Mise à jour version

**Fichiers modifiés:**
- `version.json` - 1.0.6 → 1.0.7
- `index.html` - Ajout version 1.0.7 dans l'écran des versions
- `js/app.js` - Mise à jour historique des versions

## ✅ Tests

### Installation PWA
- ✅ Bouton visible sur navigateurs compatibles
- ✅ Installation fonctionnelle
- ✅ Bouton masqué après installation
- ✅ Pas d'erreur console

### Tavli Mobile
- ✅ Plateau visible sur iPhone (375px)
- ✅ Plateau visible sur Android (360px)
- ✅ Scroll horizontal fonctionnel
- ✅ Pions cliquables
- ✅ Jeu jouable

### Autres jeux
- ✅ Dames: OK sur mobile
- ✅ Échecs: OK sur mobile
- ✅ Petits Chevaux: OK sur mobile

## 📊 Impact

### Avant
- ❌ Pas de bouton d'installation PWA
- ❌ Tavli injouable sur mobile (plateau coupé)

### Après
- ✅ Installation PWA en un clic
- ✅ Tavli jouable sur mobile avec scroll

## 🎨 UI/UX

### Bouton d'installation
- Icône: 📥 (téléchargement)
- Position: Header, à côté de la version
- Comportement: Apparaît uniquement si installable
- Style: Cohérent avec les autres boutons du header

### Tavli mobile
- Scroll horizontal fluide
- Taille optimisée pour petits écrans
- Jouabilité préservée

## 📝 Notes techniques

### PWA Installation
- Utilise l'API `beforeinstallprompt`
- Compatible Chrome, Edge, Samsung Internet
- Non supporté sur iOS Safari (limitation Apple)

### Responsive Tavli
- Breakpoint: 768px
- Largeur minimale: 500px
- Scroll automatique si nécessaire

## 🚀 Déploiement

1. Merger cette PR dans master
2. Tester sur différents appareils
3. Vérifier l'installation PWA
4. Valider le jeu Tavli sur mobile

---

**Version**: 1.0.7  
**Date**: 15 janvier 2024  
**Auteur**: Guillaume Moulard  
**Type**: Feature + Bugfix
