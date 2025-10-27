import { 
  GraduationCap, 
  Home, 
} from 'lucide-react';

export default function CasesSection() {
  const useCases = [
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "For Students",
      description: "Manage assignments, track deadlines, and organize study schedules. Perfect for academic success.",
      features: ["Exam schedules", "Study reminders", "Project deadlines"]
    },
    {
      icon: <Home className="w-6 h-6" />,
      title: "For Personal Use",
      description: "Organize daily routines, shopping lists, bills, and personal goals. Simplify your life.",
      features: ["Daily routines", "Bill reminders"]
    }
  ];


  return (
    <section id="use-cases" className="py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Perfect For Everyone
            <span className="text-amber-600 block">Use Cases</span>
          </h2>
          <p className="text-lg text-gray-600">
            Whether you re a student, professional, or managing a household, our app adapts to your needs.
          </p>
        </div>
        {/* grid content */}
        <div className="grid md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <div key={index} className="bg-gradient-to-br from-white to-amber-50 rounded-2xl p-6 border border-amber-100 hover:border-amber-200 transition-all duration-300 group hover:shadow-lg">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-amber-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">{useCase.icon}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {useCase.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {useCase.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {useCase.features.map((feature, featureIndex) => (
                      <span key={featureIndex} className="bg-white px-3 py-1 rounded-full text-sm text-gray-600 border border-amber-200">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}