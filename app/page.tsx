import { Suspense } from "react";
import GoatGallery from "./components/goat-gallery";
import SearchAndFilter from "./components/search-and-filter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "A.B Livestocks - Premium Goats for Sale",
  description:
    "Al Baraqah Livestocks - Browse our premium collection of goats available for sale. Quality livestock with detailed information and videos.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-stone-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">AB</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-stone-800">
                  A.B Livestocks
                </h1>
                <p className="text-sm text-stone-600">Al Baraqah Livestocks</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2 text-sm text-stone-600">
              <span>Premium Quality</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        {/* <Suspense
          fallback={
            <div className="h-16 bg-white rounded-lg animate-pulse mb-8"></div>
          }
        >
          <SearchAndFilter />
        </Suspense> */}

        {/* Gallery */}
        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl h-80 animate-pulse"
                ></div>
              ))}
            </div>
          }
        >
          <GoatGallery />
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="bg-stone-800 text-white mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-orange-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">AB</span>
              </div>
              <span className="text-xl font-bold">A.B Livestocks</span>
            </div>
            <p className="text-stone-400 mb-4">
              Al Baraqah Livestocks - Premium Quality Goats
            </p>
            <p className="text-sm text-stone-500">
              © 2024 A.B Livestocks. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
