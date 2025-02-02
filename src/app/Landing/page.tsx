import Listings from "@/app/listings";
import Navbar from "@/app/navbar";
import Schedule from "@/app/schedule";
import Testimonials from "@/app/testimonials";
import Welcome from "@/app/welcome";
import Footer from "@/app/footer";

export default function Landing() {
    return (
        <div>
            <Navbar />
            <div>
                <div>
                    < Welcome />
                    < Schedule/>
                    <Testimonials />
                </div>
                <div>
                    <Listings />
                </div>
                <Footer />
            </div>
        </div>
    )
};