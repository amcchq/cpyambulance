import BookingForm from '../components/BookingForm';

const Book = () => {
  return (
    <div className="min-h-screen bg-slate-50 animate-fade-in">
      {/* Header */}
      <div className="bg-navy-900 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="badge !bg-primary-600 !text-white mb-4 mx-auto">Quick Booking</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Book Your Ambulance
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Fast, reliable ambulance booking service. Fill out the form below and we&apos;ll dispatch the nearest available ambulance.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="max-w-4xl mx-auto">
          <BookingForm />
        </div>

        {/* Info Cards */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card p-6 text-center group">
              <div className="icon-box mb-4 mx-auto">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-2 group-hover:text-primary-600 transition-colors">Quick Response</h3>
              <p className="text-navy-600 text-sm">Average response time under 15 minutes in emergency situations.</p>
            </div>

            <div className="card p-6 text-center group">
              <div className="icon-box mb-4 mx-auto">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-2 group-hover:text-primary-600 transition-colors">24/7 Support</h3>
              <p className="text-navy-600 text-sm">Round-the-clock emergency services and customer support.</p>
            </div>

            <div className="card p-6 text-center group">
              <div className="icon-box mb-4 mx-auto">
                <span className="text-2xl">💼</span>
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-2 group-hover:text-primary-600 transition-colors">Professional Staff</h3>
              <p className="text-navy-600 text-sm">Highly trained medical professionals and certified EMTs.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
