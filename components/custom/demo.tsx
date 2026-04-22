export function DemoPreview() {
  return (
    <section className="section bg-gray-50/50">
      <div className="container">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Designed for Focus
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Every element is crafted to fade into the background, leaving only what you need to create your best work.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Browser Mockup */}
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-fade-in stagger-1">
            {/* Browser Header */}
            <div className="bg-gray-50/80 px-4 py-3 border-b border-gray-100 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
            </div>

            {/* Browser Content */}
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8">
                {/* Mock Sidebar */}
                <div className="w-full md:w-1/4 space-y-4">
                  <div className="h-4 bg-gray-100 rounded w-3/4" />
                  <div className="h-4 bg-gray-100 rounded w-1/2" />
                  <div className="h-4 bg-emerald-50 rounded w-2/3" />
                </div>

                {/* Mock Main Area */}
                <div className="flex-1 space-y-8">
                  <div className="h-8 bg-gray-100 rounded-lg w-1/3 mb-10" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="h-32 bg-gray-50 rounded-xl border border-gray-100" />
                    <div className="h-32 bg-emerald-50/50 rounded-xl border border-emerald-100" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-3 bg-gray-100 rounded w-full" />
                    <div className="h-3 bg-gray-100 rounded w-5/6" />
                    <div className="h-3 bg-gray-100 rounded w-4/6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}