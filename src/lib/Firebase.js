import Firebase from "firebase";


let f = new Firebase("https://shining-torch-5104.firebaseio.com/");
let authData = f.getAuth();
console.log("!!!!!!!!!!!!!!");
console.log(authData);
export default f;
