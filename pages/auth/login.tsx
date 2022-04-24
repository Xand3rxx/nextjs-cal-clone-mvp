import { GetServerSidePropsContext } from "next";
import { getCsrfToken, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { getSession } from "@helpers/auth";

import { routes } from "../../helpers/config/constants";
import logo from "../../public/logo-white.svg";

interface ServerSideProps {
  csrfToken: string;
}

export default function Login({ csrfToken }: ServerSideProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const callbackUrl =
    typeof router.query?.callbackUrl === "string" ? router.query.callbackUrl : routes.upcomingBooking;

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    const response = await signIn<"credentials">("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl,
    });
    if (!response) {
      throw new Error("Received empty response from next auth");
    }

    if (!response.error) {
      // we're logged in! let's do a hard refresh to the desired url
      window.location.replace(callbackUrl);
      return;
    }
  }

  return (
    <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center justify-center">
          <Image className="mx-auto h-6" src={logo} alt="Cal.com(Clone) Logo" width={110} height={24} />
          (Clone)
        </div>
        {/* <h2 className=" mt-6 text-center text-3xl text-neutral-200">Cal.com(Clone)</h2> */}
        <h2 className=" mt-6 text-center text-3xl text-neutral-300">Sign in to your account</h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="mx-2 rounded-sm border border-neutral-700 px-4 py-8 sm:px-10 backgroundSlateCustom">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <input name="csrfToken" type="hidden" defaultValue={csrfToken || undefined} hidden />

            <div className="space-y-6">
              <div>
                <label htmlFor="radix-0" className="block text-sm font-medium text-white">
                  Email Address
                </label>
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
              <div className="relative">
                <div className="absolute right-0 -top-[2px]">
                  {/* <a
                    tabIndex={-1}
                    className="text-primary-600 text-sm font-medium"
                    href={routes.forgotPassword}>
                    Forgot?
                  </a> */}
                </div>
                <div>
                  <label htmlFor="radix-1" className="block text-sm font-medium text-white">
                    Password
                  </label>
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
            </div>
            <div className="flex space-y-2">
              <button
                className="inline-flex items-center px-3 py-2 text-sm font-medium rounded-sm relative border border-transparent hover:bg-opacity-90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-neutral-900 w-full justify-center bg-neutral-900"
                type="submit"
                disabled={isSubmitting}>
                Sign In
              </button>
            </div>
          </form>
        </div>
        <div className="mt-4 text-center text-sm text-neutral-400">
          <span>
            Don{"'"}t have an account?{" "}
            <Link href={routes.register}>
              <a className="font-medium text-neutral-300">Create an account</a>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
