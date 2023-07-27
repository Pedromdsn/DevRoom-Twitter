import { getServerSession } from "next-auth"
import "../fonts"
import "../styles/globals.css"

import HeadBar from "@/components/global/Header"
import authOptions from "src/libs/auth"

export default async function RootLayout({ children }: WithChildren) {
	const session = await getServerSession(authOptions)

	return (
		<html lang="en">
			<head>
				<title>DevRoom - Twitter</title>
				<link rel="icon" href="favicon.ico" type="image/x-icon" />
				<meta name="description" content="Don't forget check my github https://github.com/pedromdsn" />
				<meta name="author" content="Pedromdsn <me@pedromdsn.com>" />
			</head>
			<body className="flex min-h-screen flex-col font-main scrollbar-thin scrollbar-track-gray-400 scrollbar-thumb-gray-700">
				<HeadBar session={session} />
				{children}
			</body>
		</html>
	)
}
