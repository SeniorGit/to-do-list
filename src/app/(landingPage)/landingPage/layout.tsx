import NavbarLandingSection from "../component/navbarSection"
import FooterSection from "../component/footerSection"
export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <NavbarLandingSection/>
      {children}
      <FooterSection/>
    </div>
  )
}