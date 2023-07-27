import { getServerSession } from "next-auth"
import Image from "next/image"
import { redirect } from "next/navigation"
import authOptions from "src/libs/auth"
import prisma from "src/libs/prisma"

const PostComponent = async () => {
	const session = await getServerSession(authOptions)

	const handleSubmit = async (e: FormData) => {
		"use server"
		const content = e.get("post") as string | undefined

		if (!content) {
			return
		}

		if (content.length > 140) {
			return
		}

		const user = await prisma.user.findUnique({
			where: {
				email: session?.user?.email || ""
			}
		})

		const userId = user?.id

		await prisma.post.create({
			data: {
				content,
				authorId: userId!
			}
		})

		const random = Math.round(Math.random() * 100000)
		redirect(`/?${random}`)
	}

	return (
		<div className="flex w-full max-w-[600px] items-center justify-stretch gap-3">
			<Image src={session?.user?.image || "/images/logo.jpg"} alt="logo" width={60} height={60} className="rounded-full" />
			<form action={handleSubmit} className="flex w-full flex-col gap-2">
				<input
					type="text"
					name="post"
					placeholder="What are you thinking?"
					className="px-6 py-4 outline-none placeholder:text-gray-400"
					required
					maxLength={140}
				/>
				<button className="self-end rounded-xl bg-blue-400 px-4 py-2 text-sm font-bold text-white duration-200 hover:scale-105 active:scale-95">
					Send
				</button>
			</form>
		</div>
	)
}

export default PostComponent
