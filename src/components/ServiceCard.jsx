import PropTypes from 'prop-types';

const ServiceCard = ({ title, description, icon, features }) => {
  return (
    <div className="card p-8 h-full group">
      <div className="text-center">
        {/* Icon Box */}
        <div className="icon-box mb-6 mx-auto">
          <span className="text-3xl">{icon}</span>
        </div>

        <h3 className="text-xl font-bold text-navy-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-navy-600 mb-5 leading-relaxed">{description}</p>

        {features && features.length > 0 && (
          <ul className="text-left space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-navy-700">
                <span className="w-5 h-5 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  ✓
                </span>
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
  icon: PropTypes.string.isRequired,
  features: PropTypes.arrayOf(PropTypes.string)
};

export default ServiceCard;
