import Firebase from '../../config/firebase'
import firebase from 'firebase'




const facebook_login = (history) => {

   return (disptach) => {
      // Sign in using a popup.
      var provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function (result) {
         // This gives you a Facebook Access Token.
         var token = result.credential.accessToken;
         // The signed-in user info.
         var user = result.user;

         let user_create = {
            name: user.displayName,
            email: user.email,
            profile: user.photoURL,
            uid:user.uid,
         }

         firebase.database().ref('/').child(`users/${user.uid}`).set(user_create)
         .then(() => {

            disptach({type:'SETUSER',payload:user_create})
            alert("user login succesfull");
            history.push('./Chat');
         })
      })
         .catch((error) => {

            var errorCode = error.code;
            var errorMessage = error.message;
            console.log('error', errorMessage);

         });
   }
}

const get_user = () => {
   
   return (disptach) => {
      let users =[];
      firebase.database().ref('/').child('users').on('child_added',(data)=>{
         users.push(data.val())
      
      })   
      disptach({type:'GETFIREBASEUSER',payload: users})
   
   }
}

export {
   facebook_login,
   get_user
}
