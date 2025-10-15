export default function ShowCaseSection() {
  return (
    <section id="showcase" className="py-20 bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Beautiful & Intuitive
            <span className="text-amber-600 block">Interface</span>
          </h2>
          <p className="text-lg text-gray-600">
            Experience the clean, modern design that makes task management a pleasure across all devices.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Desktop Dashboard Preview */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-6 border border-amber-200">
              {/* Browser Frame */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="flex-1 bg-gray-100 rounded h-6"></div>
              </div>
              
              {/* Dashboard Content */}
              <div className="space-y-4">
                <div className="flex gap-4 mb-6">
                  <div className="flex-1 bg-amber-100 rounded-lg h-8"></div>
                  <div className="w-20 bg-amber-500 rounded-lg h-8"></div>
                </div>
                
                {/* Task List */}
                <div className="space-y-3">
                  {[
                    { text: 'Design team meeting preparation', completed: true },
                    { text: 'Complete project proposal draft', completed: true },
                    { text: 'Review client feedback', completed: false },
                    { text: 'Schedule team sync', completed: false },
                    { text: 'Update project timeline', completed: false }
                  ].map((task, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                        task.completed ? 'bg-amber-500 border-amber-500' : 'border-gray-300'
                      }`}>
                        {task.completed && '✓'}
                      </div>
                      <span className={`text-sm flex-1 ${
                        task.completed ? 'text-gray-400 line-through' : 'text-gray-700'
                      }`}>
                        {task.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-center text-gray-500 mt-4 text-sm">Desktop Dashboard</p>
            </div>
          </div>

          {/* Mobile Preview */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Mobile Frame */}
              <div className="w-72 bg-gray-800 rounded-[2rem] p-4 shadow-2xl border-4 border-gray-700">
                {/* Status Bar */}
                <div className="flex justify-between items-center mb-4 px-2 text-white text-xs">
                  <span>9:41</span>
                  <div className="flex gap-1">
                    <div className="w-8 h-4 bg-gray-600 rounded"></div>
                  </div>
                </div>
                
                {/* Mobile Content */}
                <div className="bg-white rounded-2xl p-4 h-80">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Today</h3>
                    <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white">
                      +
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      'Morning workout',
                      'Team standup',
                      'Finish report',
                      'Grocery shopping',
                      'Read book'
                    ].map((task, i) => (
                      <div key={i} className="flex items-center gap-3 p-2">
                        <div className="w-5 h-5 rounded border border-gray-300"></div>
                        <span className="text-sm text-gray-700 flex-1">{task}</span>
                        {i < 2 && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
                      </div>
                    ))}
                  </div>
                  
                  {/* Bottom Navigation */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-around border-t pt-3">
                    {['Tasks', 'Calendar', 'Projects', 'Profile'].map((item, i) => (
                      <div key={i} className={`text-xs ${
                        i === 0 ? 'text-amber-500 font-semibold' : 'text-gray-400'
                      }`}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-center text-gray-500 mt-4 text-sm">Mobile App</p>
            </div>
          </div>
        </div>

        {/* Demo CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Want to see it in action?</p>
          <button className="bg-white border border-amber-300 text-amber-600 font-semibold py-3 px-6 rounded-lg hover:bg-amber-50 transition-all duration-300 shadow-md hover:shadow-lg">
            🎬 Watch Live Demo
          </button>
        </div>
      </div>
    </section>
  );
}