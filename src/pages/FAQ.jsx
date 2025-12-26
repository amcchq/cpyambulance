import { useState } from 'react';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "What is the ambulance contact number in Delhi NCR?",
            answer: "You can call CPY Ambulance at +91-9942000266 for 24/7 emergency ambulance service in Delhi, Gurugram, Noida, Faridabad, and Ghaziabad. Our helpline is available round the clock for immediate assistance."
        },
        {
            question: "How fast can an ambulance reach me?",
            answer: "CPY Ambulance provides the fastest response in Delhi NCR with an average arrival time of 15-20 minutes. Our ambulances are strategically stationed across key locations in Delhi, Gurugram, and Noida for rapid deployment."
        },
        {
            question: "What types of ambulances do you provide?",
            answer: "We provide a complete range of ambulance services: ICU Ambulance with ventilator and cardiac monitors, BLS (Basic Life Support) Ambulance for non-critical transport, ALS (Advanced Life Support) Ambulance, Neonatal Ambulance for newborn care, and Dead Body Ambulance/Mortuary Van for deceased transport."
        },
        {
            question: "Is your ambulance service available 24/7?",
            answer: "Yes, CPY Ambulance operates 24 hours a day, 7 days a week, 365 days a year including all national holidays. Emergency medical services never stop - we are always ready to help."
        },
        {
            question: "What areas do you cover in Delhi NCR?",
            answer: "We provide ambulance services across the entire Delhi NCR region including Delhi, Gurugram (Gurgaon), Noida, Greater Noida, Faridabad, Ghaziabad, and surrounding areas. We can also arrange inter-city ambulance transport."
        },
        {
            question: "How much does ambulance service cost?",
            answer: "Our ambulance charges vary based on the type of ambulance and distance. Basic ambulance starts from ₹1,500 while ICU ambulance with advanced equipment starts from ₹3,500. We provide transparent pricing with no hidden charges. Contact us for an exact quote."
        },
        {
            question: "Do you provide ICU ambulance with ventilator?",
            answer: "Yes, our ICU ambulances are fully equipped with ventilators, cardiac monitors, defibrillators, oxygen supply, infusion pumps, and all critical care equipment. Trained ICU technicians and nurses accompany every critical patient."
        },
        {
            question: "Can I book an ambulance online?",
            answer: "Yes, you can book an ambulance through our website by filling the booking form, or contact us via WhatsApp at +91-9942000266. For emergencies, we recommend calling directly for the fastest response."
        },
        {
            question: "Do you provide dead body ambulance/mortuary van?",
            answer: "Yes, we provide dignified dead body ambulance (mortuary van) service for transporting deceased from hospital to home, cremation ground, or any other destination. Our freezer-equipped vans maintain proper temperature during transport."
        },
        {
            question: "What medical equipment is available in your ambulances?",
            answer: "Our ambulances are equipped with: Oxygen cylinders and masks, Cardiac monitors, Defibrillators, Ventilators (in ICU ambulances), Stretcher and wheelchair, First aid kit, Suction machine, IV fluids and medicines, Pulse oximeter, and BP monitors."
        },
        {
            question: "Do your ambulances have trained medical staff?",
            answer: "Yes, all our ambulances are staffed with trained EMTs (Emergency Medical Technicians). ICU ambulances have specialized critical care technicians and nurses. Our staff is trained in CPR, first aid, and emergency medical procedures."
        },
        {
            question: "How can I track my ambulance?",
            answer: "We provide real-time GPS tracking for all our ambulances. Once your booking is confirmed, you can track the ambulance's live location. Our team will also keep you informed about the estimated arrival time."
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="animate-fade-in">
            {/* Hero Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="badge mb-4 bg-white/10 text-white border-white/20">Help Center</div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-xl text-slate-300">
                        Find answers to common questions about our ambulance services
                    </p>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cream-100">
                <div className="max-w-4xl mx-auto">
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="card overflow-hidden"
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-cream-100 transition-colors"
                                >
                                    <h3 className="text-lg font-semibold text-navy-900 pr-4">
                                        {faq.question}
                                    </h3>
                                    <div className={`w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180 bg-primary-600' : ''}`}>
                                        <svg
                                            className={`w-5 h-5 ${openIndex === index ? 'text-white' : 'text-primary-600'}`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}>
                                    <p className="px-6 pb-6 text-navy-600 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary-600">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Still Have Questions?
                    </h2>
                    <p className="text-white/90 mb-8">
                        Our team is available 24/7 to answer your queries
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="tel:+919942000266"
                            className="flex items-center justify-center gap-2 bg-cream-50 text-primary-600 px-8 py-4 rounded-full font-bold hover:bg-navy-900 hover:text-white transition-all duration-300 shadow-lg"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                            </svg>
                            Call Now
                        </a>
                        <a
                            href="https://wa.me/919942000266?text=Hi,%20I%20have%20a%20question%20about%20your%20ambulance%20service."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 bg-green-500 text-white px-8 py-4 rounded-full font-bold hover:bg-green-600 transition-all duration-300 shadow-lg"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            WhatsApp Us
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FAQ;
