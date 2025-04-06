
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar userRole={null} />
      
      <main className="flex-1">
        <section className="py-12 bg-gradient-to-r from-medical-light to-white md:py-20">
          <div className="container px-4 mx-auto md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold tracking-tight text-medical-dark md:text-5xl">
                About Swasthya Saathi
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Revolutionizing healthcare through technology and innovation
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container px-4 mx-auto md:px-6">
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <h2 className="text-2xl font-bold text-medical-blue mb-4">Our Mission</h2>
                <p className="text-gray-700 mb-4">
                  Swasthya Saathi aims to bridge the gap between technology and healthcare, making medical records 
                  accessible, secure, and useful for both healthcare providers and patients. Our mission is to empower 
                  doctors with AI-assisted tools for better diagnosis while giving patients greater control over their 
                  health information.
                </p>
                <p className="text-gray-700">
                  We believe that everyone deserves access to quality healthcare, regardless of geographic location or 
                  technical literacy. That's why we've created a platform that works offline, supports multiple languages, 
                  and offers voice navigation for users of all backgrounds.
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-medical-blue mb-4">Our Vision</h2>
                <p className="text-gray-700 mb-4">
                  We envision a future where healthcare is seamlessly connected through technology, where doctors and 
                  patients can collaborate efficiently, and where AI assists in providing better care outcomes. Our 
                  vision is to become the leading healthcare management platform that addresses the unique challenges 
                  of the healthcare system.
                </p>
                <p className="text-gray-700">
                  By 2025, we aim to serve over 10,000 healthcare professionals and 100,000 patients, making a 
                  significant impact on healthcare delivery and patient outcomes across diverse communities.
                </p>
              </div>
            </div>
            
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-medical-blue mb-6 text-center">Our Core Values</h2>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-xl font-semibold mb-3">Privacy & Security</h3>
                  <p className="text-gray-700">
                    We maintain the highest standards of data protection, ensuring patient information is secure and 
                    only accessible to authorized individuals.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-xl font-semibold mb-3">Accessibility</h3>
                  <p className="text-gray-700">
                    We design our platform to be accessible to everyone, including those in rural areas, the elderly, 
                    and those with limited technical knowledge.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                  <p className="text-gray-700">
                    We continuously explore new technologies like AI to enhance healthcare delivery and make medical 
                    information more actionable.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
