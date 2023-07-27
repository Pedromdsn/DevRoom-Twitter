import type { NextPage } from "next"
import { getServerSession } from "next-auth"
import Image from "next/image"
import authOptions from "src/libs/auth"
import prisma from "src/libs/prisma"
import PostComponent from "./Post"

const getData = async () => {
	const data = await prisma.post.findMany({
		include: {
			author: true
		}
	})
	return data
}
const Home: NextPage = async () => {
	const data = await getData()
	const session = await getServerSession(authOptions)

	return (
		<div className="mt-10 flex flex-1 flex-col items-center gap-5 py-2 md:px-5">
			{session && <PostComponent />}

			{data.map((post) => (
				<div className="flex max-w-[600px] items-center justify-start gap-5 w-full" key={post.id}>
					<Image src={post.author.image || "/images/logo.jpg"} alt="logo" width={60} height={60} className="rounded-full " />
					<div className="flex flex-col gap-2">
						<div className="text-lg font-semibold">{post.author.name}</div>
						<div>{post.content}</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default Home
