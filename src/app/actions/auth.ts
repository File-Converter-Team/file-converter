import {signIn} from "@/auth";

export const authorizeGoogle = async () => {
  'use server';
  await signIn('google', { redirectTo: '/' });
};

export const authorizeGithub = async () => {
  'use server';
  await signIn('github', { redirectTo: '/' });
};
