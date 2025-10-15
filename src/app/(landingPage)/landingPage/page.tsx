import CasesSection from "../component/casesSection";
import FeatureSection from "../component/featureSection";
import HeroSection from "../component/heroSection";
import ShowCaseSection from "../component/showcaseSection";
import SocialProofSection from "../component/sosialProofSection";

export default function LandingPage() {
  return (
    <div>
      <HeroSection/>
      <FeatureSection/>
      {/* showcase dan sosial butuh improment lebih lanjut */}
      {/* <ShowCaseSection/>  */}
      <CasesSection/>
      {/* <SocialProofSection/> */}
    </div>
  )
}