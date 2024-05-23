import Auth from "@/app/_components/pages/auth";

const AuthPage = ({ searchParams }: { searchParams: { tab: string } }) => {
  return (
    <div className="bg-gray-900 flex flex-col items-center justify-start min-h-screen">
      <Auth tab={searchParams.tab} />
    </div>
  )
}

export default AuthPage;
