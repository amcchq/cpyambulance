# CPY Ambulance - Emergency Medical Services Web App

A modern, responsive React web application for CPY Ambulance services, built with Vite, Tailwind CSS, and React Router. Features glassmorphism design, smooth animations, and comprehensive booking functionality.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with full responsiveness across all devices
- **Glassmorphism UI**: Modern glass effect design throughout the application
- **Smooth Animations**: Hover effects, transitions, and scroll animations
- **Compact Navbar**: Fixed navigation bar (50-65px height) with mobile hamburger menu
- **Online Booking**: Complete booking form with validation and WhatsApp integration
- **Emergency Contact**: Direct phone links and WhatsApp booking
- **Service Pages**: Home, Book, Contact, and About pages
- **24/7 Service Information**: Clear contact details and service areas

## 🛠️ Tech Stack

- **React 18** with Vite
- **Tailwind CSS** for styling
- **React Router** for navigation
- **React Testing Library** + Vitest for testing
- **ESLint** for code quality

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cpy-ambulance
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

## 🏗️ Building for Production

Build the application for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Navbar.jsx       # Navigation component
│   ├── Footer.jsx       # Footer component
│   ├── Hero.jsx         # Hero section
│   ├── ServiceCard.jsx  # Service display card
│   ├── BookingForm.jsx  # Booking form component
│   └── __tests__/       # Component tests
├── pages/               # Page components
│   ├── Home.jsx         # Home page
│   ├── Book.jsx         # Booking page
│   ├── Contact.jsx      # Contact page
│   └── About.jsx        # About page
├── hooks/               # Custom React hooks
│   └── useFormValidation.js
├── utils/               # Utility functions
│   └── mockApi.js       # Mock API for booking
└── assets/              # Static assets
```

## 🎨 Design Features

### Glassmorphism
- `backdrop-blur-md bg-white/20 border border-white/30`
- Consistent across all major UI elements
- Smooth hover effects with `shadow-glass-hover`

### Responsive Design
- Mobile-first approach
- Breakpoints: 360px, 414px, 768px, 1024px, 1440px
- Single column on mobile, multi-column on larger screens

### Animations
- Tailwind transitions: `transition-all duration-200 ease-in-out`
- Hover effects: scale, shadow, and color transitions
- Scroll animations: fade-in and slide-in effects

## 📞 Contact Information

- **Emergency Hotline**: +91-9942000266
- **Email**: support@cpyambulance.example
- **Service Area**: Gurugram, Haryana, India

## 🔧 Configuration

### Environment Variables
Create a `.env` file based on `.env.example`:

```env
VITE_APP_TITLE="CPY Ambulance"
VITE_WHATSAPP_NUMBER="+919942000266"
VITE_PHONE_NUMBER="+91-9942000266"
VITE_EMAIL="support@cpyambulance.example"
VITE_ADDRESS="Gurugram, Haryana, India"
```

### Tailwind Configuration
Custom utilities for glassmorphism effects are defined in `tailwind.config.js`.

## 🚑 Services Offered

1. **Emergency Ambulance** - 24/7 critical care response
2. **ICU Ambulance** - Intensive care unit transportation
3. **BLS Ambulance** - Basic life support services
4. **Neonatal Ambulance** - Specialized newborn care

## 📱 Mobile Responsiveness

- **Navbar**: Collapses to hamburger menu below 768px
- **Forms**: Stack vertically on mobile devices
- **Buttons**: Full-width on mobile, inline on larger screens
- **Cards**: 1 column on mobile, 2-4 columns on larger screens

## 🧪 Testing Strategy

- Unit tests for form validation
- Component testing with React Testing Library
- Mock API responses for booking functionality
- Accessibility testing considerations

## 🚀 Deployment

The application is built with Vite for optimal performance:

1. Build: `npm run build`
2. Deploy the `dist/` folder to your hosting service
3. Ensure proper meta tags and SEO optimization

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

**Emergency Services**: For immediate assistance, call +91-9942000266
