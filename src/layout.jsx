import "./globals.css"

export const metadata = {
  title: "Chatbot Flow Builder",
  description: "Build chatbot flows with drag and drop interface",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

