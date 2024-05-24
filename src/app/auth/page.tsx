import {authorizeGithub, authorizeGoogle} from "@/app/actions/auth";
import {Button} from "@/app/_components/ui/button";
import {ChromeIcon, GithubIcon} from "lucide-react";

const AuthPage = () => {
  return (
    <div className="bg-gray-900 flex flex-col items-center justify-start min-h-screen">
      <div className="bg-gray-900 flex flex-col items-center justify-start h-full">
        <div className="mx-auto w-full max-w-[400px] space-y-6 mt-12">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-gray-50">Welcome</h1>
            <p className="text-gray-400">Sign in with your preferred method</p>
          </div>
          <div className="space-y-4">
            <form action={authorizeGoogle}>
              <Button
                className="w-full bg-gray-800 text-gray-50 hover:bg-gray-700 focus:bg-gray-700 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-300 dark:focus:bg-gray-300"
                type="submit"
              >
                <ChromeIcon className="h-5 w-5 mr-2"/>
                Sign in with Google
              </Button>
            </form>
            <form action={authorizeGithub}>
              <Button
                className="w-full bg-gray-800 text-gray-50 hover:bg-gray-700 focus:bg-gray-700 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-300 dark:focus:bg-gray-300"
                type="submit"
              >
                <GithubIcon className="h-5 w-5 mr-2"/>
                Sign in with GitHub
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage;
