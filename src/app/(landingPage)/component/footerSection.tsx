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