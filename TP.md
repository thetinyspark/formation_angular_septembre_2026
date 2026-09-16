# TP n°11


## Créez un composant LoadingScreen
- Ce composant LoadingScreen doit être toujours présent sur l'application
- Il n'est visible que si une opération de chargement est en cours
- Pour savoir si une opération de chargement est en cours, le composant
lit une valeur dans un signal


## Créez un service LoadingScreenService
- Ce service n'a besoin que de deux fonctionnalités
- Une fonctionnalité setLoading(boolean)
- Une fonctionnalité isLoading: Signal<boolean>

C'est ce dernier signal que le composant utilise


## Au sein du CatalogResolver
- Lorsque vous lancez l'obtention des données avec refresh()
- utilisez le LoadingScreenService afin de le passer en mode loading
- une fois les données obtenues faites-en sorte que le service ne soit plus
en mode loading
