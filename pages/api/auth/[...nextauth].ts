import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebaseConfig";
import { signIn } from "next-auth/react";

export const authOptions = {
    pages: {
        signIn: '/login'
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {},
            async authorize(credentials): Promise<any> {
                return await signInWithEmailAndPassword(auth, (credentials as any).email || '', (credentials as any). password || '')
                .then(userCredential => {
                    if(userCredential.user) {
                        return userCredential.user;
                    }
                    return null;
                })
                .catch(error => (console.log(error)))
            }
        })
    ]
}
export default NextAuth(authOptions)

