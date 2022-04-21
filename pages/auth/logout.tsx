const Logout = () => {
  return (
    <section className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md"></div>
      <main className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mx-2 rounded-sm border border-neutral-700 text-white px-4 py-8 sm:px-10 backgroundSlateCustom">
          <div className="mb-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
                className="h-6 w-6 text-green-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <h3 className="text-lg font-medium leading-6 text-white" id="modal-title">
                You{"'"}ve been logged out
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">We hope to see you again soon!</p>
              </div>
            </div>
          </div>
          <button className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-sm relative border border-transparent bg-neutral-900 hover:bg-opacity-90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-neutral-900 w-full justify-center">
            {" "}
            Go back to the login page
          </button>
        </div>
        <div className="mt-4 text-center text-sm text-neutral-600"></div>
      </main>
    </section>
  );
};
export default Logout;
