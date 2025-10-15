import { CheckCircle, Calendar, Smartphone, Lock, Zap, Tags } from 'lucide-react';

export default function FeatureSection() {
  const features = [
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Effortless Task Management",
      description: "Create, edit, and organize tasks in seconds with our intuitive drag-and-drop interface. Perfect for daily to-dos and complex projects alike."
    },
    {
      icon: <Tags className="w-6 h-6" />,
      title: "Smart Categorization",
      description: "Organize with color-coded tags, custom labels, and smart filters. Keep your workspace clean and focused on what matters most."
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Intelligent Scheduling",
      description: "Set deadlines, create recurring tasks, and get smart reminders. Never miss important deadlines with our proactive notification system."
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Universal Access",
      description: "Works seamlessly across all devices. Your tasks sync in real-time whether you're on desktop, tablet, or mobile."
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Bank-Level Security",
      description: "Your data is encrypted and secure. We use enterprise-grade security measures to protect your information and privacy."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Experience blazing fast performance with instant loading and smooth animations. Optimized for speed and efficiency."
    }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-white to-amber-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need to
            <span className="text-amber-600 block">Stay Productive</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Powerful features designed to simplify your workflow and boost your productivity. 
            From simple to-dos to complex projects, we ve got you covered.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl border border-amber-100 hover:border-amber-200 transition-all duration-300 hover:transform hover:scale-[1.02]"
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">{feature.icon}</span>
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-amber-700 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}