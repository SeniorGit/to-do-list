import { 
  Twitter, 
  Github, 
  Linkedin, 
  Instagram 
} from 'lucide-react';

export default function FooterSection() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
                <span className="font-bold text-white">T</span>
              </div>
              <span className="text-xl font-bold">TodoApp</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              The modern task management app that helps you focus on what matters most. 
              Simple, fast, and powerful - everything you need to boost your productivity.
            </p>
           <div className="flex gap-4">
              {['twitter', 'github', 'linkedin', 'instagram'].map((social) => (
                <button
                  key={social}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-amber-500 transition-colors duration-300"
                >
                  {social === 'twitter' && <Twitter className="w-5 h-5 text-white" />}
                  {social === 'github' && <Github className="w-5 h-5 text-white" />}
                  {social === 'linkedin' && <Linkedin className="w-5 h-5 text-white" />}
                  {social === 'instagram' && <Instagram className="w-5 h-5 text-white" />}
                </button>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#features" className="hover:text-amber-400 transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-amber-400 transition-colors">How It Works</a></li>
              <li><a href="#use-cases" className="hover:text-amber-400 transition-colors">Use Cases</a></li>
              <li><a href="#showcase" className="hover:text-amber-400 transition-colors">App Showcase</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} SeniorGit. All rights reserved.
          </div>
          <div className="text-gray-400 text-sm">
            Made with ❤️ for productive people everywhere
          </div>
        </div>
      </div>
    </footer>
  );
}