/** @jsxImportSource react */
import Listings from "@/app/listings";
import Navbar from "@/app/navbar";
import Schedule from "@/app/schedule";
import Testimonials from "@/app/testimonials";
import Welcome from "@/app/welcome";
import Footer from "@/app/footer";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      {/* Header */}
      <div className="w-full bg-white p-4 shadow-xs rounded-lg shadow-md mb-4">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="w-full flex gap-4">
        {/* Left Section */}
        <div className="flex flex-col w-1/4 space-y-4">
          <div className="bg-white p-4 rounded-lg shadow-md h-16">
            <Welcome />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md h-12">
            <Schedule />
          </div>
        </div>

        {/* Center Content */}
        <div className="flex-1 bg-white p-4 rounded-lg shadow-md h-96">
            <Testimonials />
        </div>

        {/* Right Section */}
        <div className="w-1/4 bg-white p-4 rounded-lg shadow-md h-96">
            <Listings />
        </div>
      </div>
    </div>
  );
}
