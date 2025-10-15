"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignInPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);

	return (
		<div className="max-w-md mx-auto">
			<h1 className="text-2xl font-bold mb-4">Sign in</h1>
			<form
				onSubmit={async (e) => {
					e.preventDefault();
					setError(null);
					const res = await signIn("credentials", { email, password, redirect: true, callbackUrl: "/" });
					// next-auth will redirect; if it returns, it's an error
					if ((res as any)?.error) setError("Invalid email or password");
				}}
				className="grid gap-3"
			>
				<label className="grid gap-1">
					<span className="text-sm font-medium">Email</span>
					<input value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-md border border-gray-300 px-3 py-2" type="email" />
				</label>
				<label className="grid gap-1">
					<span className="text-sm font-medium">Password</span>
					<input value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-md border border-gray-300 px-3 py-2" type="password" />
				</label>
				{error && <p className="text-sm text-red-600">{error}</p>}
				<button className="inline-flex items-center rounded-md bg-gray-900 text-white px-4 py-2 text-sm font-medium hover:bg-gray-800 w-fit">Sign in</button>
			</form>
			<div className="my-4 h-px bg-gray-200" />
			<button onClick={() => signIn("google", { callbackUrl: "/" })} className="inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50 w-full justify-center">Continue with Google</button>
		</div>
	);
}
