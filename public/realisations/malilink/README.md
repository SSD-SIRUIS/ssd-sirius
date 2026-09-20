# Captures MaliLink

Prises sur la version en ligne
(`https://malilink-web-779884436442.europe-west1.run.app/`), en Chrome headless,
viewport 1440 × 900 en DPR 2, puis recadrées en fenêtres 16/10 et exportées en
JPEG progressif (qualité 82, largeur 1600).

| Fichier | Contenu |
| --- | --- |
| `01-accueil.jpg` | Accueil et accroche |
| `02-candidature.jpg` | Parcours de candidature en trois étapes |
| `03-fonctionnalites.jpg` | Coffre-fort de documents, diaspora, employeurs vérifiés |
| `04-mobile.jpg` | Affichage mobile (414 × 896, DPR 3) |

## Ce qui n'a volontairement pas été capturé

La page en ligne affiche aussi une bande de logos d'institutions (ministères,
banques, grandes entreprises) sous le titre « Ils nous font confiance », des
compteurs (offres publiées, candidats inscrits, entreprises partenaires) et des
témoignages nominatifs.

Ces éléments ne sont pas repris sur le site vitrine tant que l'équipe ne les a
pas confirmés : republier des logos d'institutions comme références, ou des
chiffres d'audience, engage SSD Sirius. Si ces données sont réelles, ajouter les
captures correspondantes et les métriques dans `src/data/projects.js`.

## Refaire les captures

Les captures se refont avec Chrome headless piloté en CDP : navigation sur
l'URL, neutralisation des animations d'apparition, capture pleine page
(`Page.captureScreenshot` avec `captureBeyondViewport`), puis découpe en
fenêtres de 900 px CSS de haut aux offsets des sections.
