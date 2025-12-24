import PropTypes from 'prop-types';

// Icon mapping - renders SVG icons based on icon type
const IconSVG = ({ type }) => {
  const icons = {
    ambulance: (
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H15V3H9v2H6.5c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
    ),
    hospital: (
      <path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z" />
    ),
    van: (
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5H15V3H9v2H6.5c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
    ),
    baby: (
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h2V9h2v2h2V9h2v2h2V9h2v4H7V9zm5 2c-1.66 0-3 1.34-3 3h6c0-1.66-1.34-3-3-3z" />
    ),
    lightning: (
      <path d="M7 2v11h3v9l7-12h-4l4-8z" />
    ),
    doctor: (
      <path d="M12 2C8.13 2 5 5.13 5 9c0 3.17 2.11 5.85 5 6.71V22h4v-6.29c2.89-.86 5-3.54 5-6.71 0-3.87-3.13-7-7-7zm-1.5 5c.83 0 1.5.67 1.5 1.5S11.33 10 10.5 10 9 9.33 9 8.5 9.67 7 10.5 7zm3 0c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5z" />
    ),
    location: (
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    ),
  };

  return (
    <svg className="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
      {icons[type] || icons.hospital}
    </svg>
  );
};

IconSVG.propTypes = {
  type: PropTypes.string.isRequired
};

const ServiceCard = ({ title, description, iconType, features }) => {
  return (
    <div className="card p-8 h-full group">
      <div className="text-center">
        {/* Icon Box */}
        <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
          <IconSVG type={iconType} />
        </div>

        <h3 className="text-xl font-bold text-navy-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-navy-600 mb-5 leading-relaxed">{description}</p>

        {features && features.length > 0 && (
          <ul className="text-left space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-navy-700">
                <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

ServiceCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  iconType: PropTypes.string.isRequired,
  features: PropTypes.arrayOf(PropTypes.string)
};

export default ServiceCard;
