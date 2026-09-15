# TP n°5


## nouveau service
- Créez un service nommé UserService
- Ce service doit comporter une fonction login() qui permet d'être connecté
- Ce service doit comporter une fonction logout() qui permet de se déconnecter

## Dans le login component 

- Ajoutez un bouton qui permet de se connecter à l'aide de la fonction login() du nouveau service
- Même chose pour le logout


## Guard
- Créez une Guard nommée IsConnectedGuard et qui vérifie si on est logged in
avant de se rendre sur la page du Cart