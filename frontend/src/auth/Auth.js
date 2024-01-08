import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const Auth = {
  async login(email, password) {
    const auth = getAuth();
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user;
  },

  async register(email, password) {
    const auth = getAuth();
    const user = await createUserWithEmailAndPassword(auth, email, password);
    return user;
  },
};

export default Auth;
