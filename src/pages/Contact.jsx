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
                  <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors group">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                      </svg>
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

                  <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors group">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      </svg>
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

                  <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors group">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                      </svg>
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
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                  </svg>
                  Call Emergency Now
                </a>
                <a href="/book" className="btn-secondary">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H15V3H9v2H6.5c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                  </svg>
                  Book Ambulance Online
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
