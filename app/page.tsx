import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Services from "@/components/Services";
import Statistics from "@/components/Statistics";
import Testimonials from "@/components/Testimonials";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-900 text-white">
      <Navbar />
      <Hero />
      <Features />
      <Services />
      <Statistics />
      <Testimonials />
      <BookingForm />
      <Footer />
    </main>
  );
}
