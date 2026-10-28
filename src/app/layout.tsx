import { Provider } from "@/components/ui/provider"
import MobileDisclaimer from "./components/MobileDisclaimer"
import "./globals.css";

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  return (
    <html suppressHydrationWarning>
      <body>
        <Provider>
          {children}
          <MobileDisclaimer />
        </Provider>
      </body>
    </html>
  )
}
