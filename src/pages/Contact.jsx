const Contact = () => {
  return (
    <div className="min-h-screen bg-slate-50 animate-fade-in">
      {/* Header */}
      <div className="bg-navy-900 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="badge !bg-primary-600 !text-white mb-4 mx-auto">Get In Touch</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Get in touch with us for emergency services or any inquiries
          </p>
        </div>
      </div>

      {/* Contact Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-navy-900 mb-6">Emergency Contact</h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-primary-50 transition-colors group">
                    <div className="icon-box flex-shrink-0">
                      <span className="text-2xl">📞</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-navy-900 mb-1">Emergency Hotline</h3>
                      <a
                        href="tel:+919942000266"
                        className="text-primary-600 hover:text-primary-700 text-lg font-semibold"
                      >
                        +91-9942000266
                      </a>
                      <p className="text-navy-500 text-sm mt-1">Available 24/7</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-primary-50 transition-colors group">
                    <div className="icon-box flex-shrink-0">
                      <span className="text-2xl">📧</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-navy-900 mb-1">Email Support</h3>
                      <a
                        href="mailto:cpyambulance@gmail.com"
                        className="text-primary-600 hover:text-primary-700"
                      >
                        cpyambulance@gmail.com
                      </a>
                      <p className="text-navy-500 text-sm mt-1">For general inquiries</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-primary-50 transition-colors group">
                    <div className="icon-box flex-shrink-0">
                      <span className="text-2xl">📍</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-navy-900 mb-1">Service Area</h3>
                      <p className="text-navy-700">Gurugram, Haryana, India</p>
                      <p className="text-navy-500 text-sm mt-1">Extended coverage to nearby areas</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-8">
                <h2 className="text-2xl font-bold text-navy-900 mb-6">Service Hours</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 rounded-xl bg-slate-50 hover:bg-primary-50 transition-colors">
                    <span className="text-navy-700 font-medium">Emergency Services</span>
                    <span className="font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full text-sm">24/7</span>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-xl bg-slate-50 hover:bg-primary-50 transition-colors">
                    <span className="text-navy-700 font-medium">Administrative Support</span>
                    <span className="font-semibold text-navy-800">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center p-4 rounded-xl bg-slate-50 hover:bg-primary-50 transition-colors">
                    <span className="text-navy-700 font-medium">Customer Service</span>
                    <span className="font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full text-sm">24/7</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-navy-900 mb-6">Our Location</h2>
              <div className="aspect-video rounded-xl overflow-hidden border-2 border-slate-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d448196.526489099!2d76.81307265!3d28.4594965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19d582e38859%3A0x2cf5e9dfc503ecf!2sGurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1703123456789!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="CPY Ambulance Service Area - Gurugram, Haryana"
                ></iframe>
              </div>
              <p className="text-navy-500 text-sm mt-4">
                Serving Gurugram and surrounding areas in Haryana. Extended coverage available for inter-city transfers.
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-16">
            <div className="card p-8 md:p-12 text-center">
              <h2 className="section-title mb-4">Need Immediate Assistance?</h2>
              <p className="section-subtitle mx-auto mb-8">
                Our emergency team is ready to help you 24/7
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+919942000266" className="btn-primary">
                  📞 Call Emergency Now
                </a>
                <a href="/book" className="btn-secondary">
                  🚑 Book Ambulance Online
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
