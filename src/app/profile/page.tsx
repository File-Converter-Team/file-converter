import {Avatar, AvatarFallback, AvatarImage} from "@/app/_components/ui/avatar";
import {auth} from "@/auth";
import {Session} from "next-auth";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/app/_components/ui/tabs";
import SavedFiles from "@/app/_components/profile/saved-files";
import FilesHistory from "@/app/_components/profile/files-history";

const Profile = async () => {
  const session = await auth() as Session;
  return (
    <div className="w-full py-6 px-4 md:px-6">
      <div className="flex items-center gap-6 p-6 md:p-8 lg:p-10">
        <Avatar className="h-16 w-16 md:h-20 md:w-20 lg:h-24 lg:w-24">
          <AvatarImage alt="@shadcn" src={session?.user?.image || undefined}/>
          <AvatarFallback>{(session?.user?.name as string)[0]}</AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">{session?.user?.name}</h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl lg:text-2xl">{session?.user?.email}</p>
        </div>
      </div>
      <div className="rounded-lg bg-white shadow-md dark:bg-gray-900 m-6 md:m-8 lg:m-10 ">
        <Tabs defaultValue="saved-files">
          <TabsList className="border-b border-gray-200 dark:border-gray-800">
            <TabsTrigger className="text-gray-900 dark:text-gray-50 font-medium" value="saved-files">
              Saved Files
            </TabsTrigger>
            <TabsTrigger className="text-gray-900 dark:text-gray-50 font-medium" value="convertation-history">
              Conversion History
            </TabsTrigger>
          </TabsList>
          <TabsContent className="p-6" value="saved-files">
            <SavedFiles />
          </TabsContent>
          <TabsContent className="p-6" value="convertation-history">
            <FilesHistory />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default Profile;
