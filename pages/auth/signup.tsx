import axios from "axios";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { routes } from "../../helpers/config/constants";

export default function Signup(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function redirectOnLogin() {
      const session = await getSession();
      if (session) window.location.replace("/");
    }
    redirectOnLogin();
  }, []);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    return axios
      .post("/api/auth/signup", {
        name,
        email,
        password,
      })
      .then(() => {
        alert("success");
        window.location.replace("/");
      })
      .catch((e) => {
        setIsSubmitting(false);
        const errorMessage = e.response?.data?.message;
        alert(errorMessage || e.message);
      });
  }

  return (
    // <form onSubmit={handleSubmit}>
    //   <input
    //     id="name"
    //     name="name"
    //     type="text"
    //     placeholder="name"
    //     required
    //     value={name}
    //     onInput={(e) => setName(e.currentTarget.value)}
    //     className="block border border-neutral-300 focus:ring-neutral-900"
    //   />
    //   <input
    //     id="email"
    //     name="email"
    //     type="email"
    //     placeholder="email"
    //     required
    //     value={email}
    //     onInput={(e) => setEmail(e.currentTarget.value)}
    //     className="block border border-neutral-300 focus:ring-neutral-900"
    //   />
    //   <input
    //     id="password"
    //     name="password"
    //     type="password"
    //     placeholder="password"
    //     autoComplete="current-password"
    //     required
    //     value={password}
    //     onInput={(e) => setPassword(e.currentTarget.value)}
    //     className="block border border-neutral-300 focus:ring-neutral-900"
    //   />

    //   <button type="submit" disabled={isSubmitting} className="p-1 text-white bg-blue-800">
    //     SIGN UP
    //   </button>
    // </form>

    <div className="flex min-h-screen items-center pb-16">
      <div className="mx-auto block max-w-7xl px-7 lg:flex">
        <div className="w-full self-center lg:w-1/2">
          <div className="mt-8 mb-8 text-4xl font-semibold text-neutral-200 md:text-6xl">
            <h2 className=" mt-6 text-3xl text-neutral-200">Cal.com(Clone)</h2>

            <h2 className=" mt-8 hidden max-w-[450px] lg:block">
              You{"'"}re one step away from simpler scheduling.
            </h2>
          </div>
          <blockquote className="hidden max-w-md lg:block">
            <div>
              <p className="text-base text-gray-500">
                “I love being able to use a tool that just works, and that is open source. As a developer, I
                love being empowered to contribute to a tool that I use regularly.”
              </p>
            </div>
            <footer className="mt-3">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://cal.com/stakeholder/cassidy.jpg"
                    alt="Cassidy Williams"
                  />
                </div>
                <div className="text-base font-medium text-gray-400">
                  Cassidy Williams <span className="text-blue-400">@cassidoo</span>
                  <p className="text-sm font-normal text-gray-400">
                    Head of Developer Experience at Remote.com
                  </p>
                </div>
              </div>
            </footer>
          </blockquote>
        </div>
        <div className="mt-8 w-full lg:mt-0 lg:ml-[150px] lg:w-1/2">
          <div className="border backgroundSlateCustom sm:mx-auto sm:w-full sm:max-w-md sm:overflow-hidden sm:rounded-sm border-neutral-700">
            <div className="px-4 py-8 sm:px-10">
              <div className="relative mt-4">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-neutral-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="backgroundSlateCustom px-2 text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-4 w-4">
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"></path>
                    </svg>
                  </span>
                </div>
              </div>
              <div className="mt-6">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name" className="sr-only">
                      Full Name
                    </label>
                    <div className="mt-1 flex rounded-sm shadow-sm border-0">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="none"
                        placeholder="John Doe"
                        onInput={(e) => setName(e.currentTarget.value)}
                        className="mt-1 block w-full rounded-sm border border-gray-700 py-2 px-3 shadow-sm focus:border-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-800 sm:text-sm bg-zinc-700 selection:bg-green-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email address
                    </label>
                    <div className="mt-1 flex rounded-sm shadow-sm border-0">
                      <input
                        id="email"
                        placeholder="john.doe@example.com"
                        className="mt-1 block w-full rounded-sm border border-gray-700 py-2 px-3 shadow-sm focus:border-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-800 sm:text-sm bg-zinc-700 selection:bg-green-500"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        inputMode="email"
                        required={true}
                        name="email"
                        value={email}
                        onInput={(e) => setEmail(e.currentTarget.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <div className="mt-1 flex rounded-sm shadow-sm border-0">
                      <input
                        id="password"
                        placeholder="•••••••••••••"
                        className="mt-1 block w-full rounded-sm border border-gray-700 py-2 px-3 shadow-sm focus:border-neutral-800 focus:outline-none focus:ring-1 focus:ring-neutral-800 sm:text-sm bg-zinc-700 selection:bg-green-500"
                        type="password"
                        autoComplete="current-password"
                        required={true}
                        name="password"
                        value={password}
                        onInput={(e) => setPassword(e.currentTarget.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="inline-flex items-center py-2 font-medium rounded-sm relative border border-transparent dark:text-black text-white bg-neutral-900 dark:bg-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-neutral-900 w-full justify-center px-4 text-sm shadow-sm hover:bg-neutral-800 focus:ring-offset-2">
                      Sign up for free
                    </button>
                  </div>
                  <div className="mt-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-gray-500">Already have an account?</span>
                      </div>
                      <div className="mt-4 gap-2">
                        <Link href={routes.login}>
                          <a className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-sm relative border border-transparent hover:bg-opacity-90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-neutral-900 w-full justify-center bg-neutral-900">
                            Login
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="border-t border-neutral-700 backgroundSlateCustom px-4 py-6 sm:px-10">
              <p className="text-xs leading-5 text-gray-300">
                By signing up, you agree to our
                <span className="font-medium text-white hover:underline"> Terms of Service</span> and{" "}
                <span className="font-medium text-white hover:underline">Privacy Policy</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
