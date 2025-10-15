export default function SocialProofSection() {
  const stats = [
    { number: "10,000+", label: "Active Users" },
    { number: "98%", label: "Satisfaction Rate" },
    { number: "4.9/5", label: "User Rating" },
    { number: "50+", label: "Countries" }
  ];

  const trustBadges = [
    { icon: "🔒", text: "End-to-End Encrypted" },
    { icon: "🌐", text: "GDPR Compliant" },
    { icon: "⚡", text: "99.9% Uptime" },
    { icon: "🔄", text: "Real-Time Sync" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-amber-500 to-orange-500 text-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Thousands Worldwide
          </h2>
          <p className="text-amber-100 text-lg max-w-2xl mx-auto">
            Join our growing community of productive users who transformed their workflow.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-amber-100">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {trustBadges.map((badge, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
              <div className="text-2xl mb-2">{badge.icon}</div>
              <div className="text-sm font-medium">{badge.text}</div>
            </div>
          ))}
        </div>

        {/* Media Logos  */}
        <div className="text-center mt-12 pt-8 border-t border-amber-400/30">
          <p className="text-amber-100 mb-6">As featured in</p>
          <div className="flex justify-center items-center gap-8 opacity-80">
            <div className="bg-white/20 rounded-lg px-6 py-3 text-sm font-semibold">TechCrunch</div>
            <div className="bg-white/20 rounded-lg px-6 py-3 text-sm font-semibold">Product Hunt</div>
            <div className="bg-white/20 rounded-lg px-6 py-3 text-sm font-semibold">Forbes</div>
          </div>
        </div>
      </div>
    </section>
  );
}