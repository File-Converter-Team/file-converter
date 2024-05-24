const LoadPage = () => {
  return (
    <div className="bg-gray-900 flex flex-col items-center justify-start min-h-screen">
      <div className="bg-gray-900 flex flex-col items-center justify-start h-full">
        <div className="mx-auto w-full max-w-[400px] space-y-6 mt-12">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-gray-50">Loading...</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadPage;
