import { PrismaAdapter } from "@auth/prisma-adapter"
import { AuthOptions } from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import prisma from "./prisma"

const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma) as AuthOptions["adapter"],
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_ID || "",
			clientSecret: process.env.GITHUB_SECRET || ""
		})
	]
}

export default authOptions
