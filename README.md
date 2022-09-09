<img alt="Videoclub" src="https://raw.githubusercontent.com/agustinl/videoclub/master/public/static/logo-videoclub.png">


Keep an updated list with information about the series you have been finishing.  
Personal project to use the stack below.  

*It is not an application for mass use in production.*

### How to use

1. To use this project, clone the repository into your local.
2. Edit the **config.js** file into **firebase** folder with the keys of your firebase project:

```javascript
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

export default firebaseConfig;
```

3. Add a **.env** file into root folder with the **OMDB_API_KEY** of your [OMDb API](http://www.omdbapi.com/apikey.aspx).

### Stack

- React Framework: [Next.js](https://nextjs.org/)
- Authentication and database: [Firebase](https://firebase.google.com/)
- UI Framework: [Tailwindcss](https://tailwindcss.com/)
- Deploy: [Vercel](https://vercel.com/)
- REST API: [OMDb](http://www.omdbapi.com/)

2022