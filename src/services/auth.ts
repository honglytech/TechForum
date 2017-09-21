import firebase from 'firebase';

export class AuthService {
	signup(email: string, password: string) {
		// createUserWithEmailAndPassword method creates a new user account associated with 
		// the specified email address and password. On successful creation of the user 
		// account, the user will also be signed in to the application. User account creation 
		// can fail if the account already exists or the password is invalid.
		// HTTP send, post request and error handling are included in this method. 
		return firebase.auth().createUserWithEmailAndPassword(email, password);
	}

	// Sign user in method 
	signin(email: string, password: string) {
		return firebase.auth().signInWithEmailAndPassword(email, password);
	}

	// Sign out and deletes current user's token
	logout() {
    	firebase.auth().signOut();	
  	}

	// Return the current authenticated user
  	getActiveUser() {
    	return firebase.auth().currentUser;		
  }
}