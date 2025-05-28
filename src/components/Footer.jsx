import { Link } from 'react-router-dom';
import { colors } from '../utils/colors';
// import logo from '../assets/logo.png';

function Footer() {
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/programs', label: 'Programs' },
    { to: '/get-involved', label: 'Get Involved' },
    { to: '/report-abuse', label: 'Report Abuse' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' },
  ];

  const socialLinks = [
    { href: 'https://instagram.com/interceptcsa', label: 'Instagram' },
    { href: 'https://facebook.com/Intercept-Child-Sexual-Abuse-Foundation', label: 'Facebook' },
  ];

  return (
    <footer className={`bg-${colors.primary} py-8`}>
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Description */}
        <div>
          <Link to="/" className="flex items-center mb-4">
            {/* <img src={logo} alt="Intercept CSA Logo" className="h-12 mr-2" /> */}
            <span className="text-xl font-bold">Intercept CSA</span>
          </Link>
          <p className="text-sm">
            Preventing, confronting, and healing child sexual abuse through education, advocacy, and
            survivor support.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`hover:text-${colors.secondary} transition-colors`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact & Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-sm mb-2">Email: interceptcsa@gmail.com</p>
          <p className="text-sm mb-4">Phone: 0810 335 0098</p>
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:text-${colors.secondary} transition-colors`}
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-sm border-t border-white/20 pt-4">
        © {new Date().getFullYear()} Intercept CSA. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;