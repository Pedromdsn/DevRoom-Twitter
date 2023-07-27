"use client"

import Image from "next/image"
import Link from "next/link"

import logo from "@/images/logo.jpg"
import { Session } from "next-auth"

import { signIn } from "next-auth/react"
import { AiOutlineLogin } from "react-icons/ai"

interface HeadBarProps {
	session: Session | null
}

const HeadBar = ({ session }: HeadBarProps) => {
	return (
		<div className="relative flex h-32 items-center justify-around px-5">
			<Link href="/">
				<Image
					src={logo}
					alt="logo"
					width={60}
					height={60}
					className="rounded-full grayscale duration-200 hover:scale-105 hover:grayscale-0 active:scale-95"
				/>
			</Link>
			{session?.user ? (
				<div className="flex items-center justify-center gap-5 rounded-md bg-gray-100 px-4 py-2 cursor-pointer">
					<Image
						src={session.user.image || logo}
						alt="user"
						width={40}
						height={40}
						className="rounded-full duration-200 hover:scale-105 active:scale-95"
					/>
					<span>{session.user.name || "Anonymous"}</span>
				</div>
			) : (
				<div
					onClick={() => signIn("github")}
					className="flex cursor-pointer items-center justify-center gap-5 rounded-md bg-gray-100 px-4 py-2"
				>
					<AiOutlineLogin className="text-2xl" />
					<span>Sign In</span>
				</div>
			)}
		</div>
	)
}

export default HeadBar
