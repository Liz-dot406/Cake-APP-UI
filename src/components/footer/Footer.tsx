export const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-pink-700 text-pink-50 p-10 mt-16">

      <nav>
        <h6 className="footer-title text-white">Services</h6>
        <a className="link link-hover text-pink-100 hover:text-white">Custom Cakes</a>
        <a className="link link-hover text-pink-100 hover:text-white">Delivery</a>
        <a className="link link-hover text-pink-100 hover:text-white">Event Catering</a>
        <a className="link link-hover text-pink-100 hover:text-white">Cake Design</a>
      </nav>

      <nav>
        <h6 className="footer-title text-white">Company</h6>
        <a className="link link-hover text-pink-100 hover:text-white">About Us</a>
        <a className="link link-hover text-pink-100 hover:text-white">Contact</a>
        <a className="link link-hover text-pink-100 hover:text-white">Careers</a>
        <a className="link link-hover text-pink-100 hover:text-white">Our Bakers</a>
      </nav>

      <nav>
        <h6 className="footer-title text-white">Legal</h6>
        <a className="link link-hover text-pink-100 hover:text-white">Terms of Service</a>
        <a className="link link-hover text-pink-100 hover:text-white">Privacy Policy</a>
        <a className="link link-hover text-pink-100 hover:text-white">Cookie Policy</a>
      </nav>

      

      <div>
        <h6 className="footer-title text-white">CakeApp</h6>
        <p className="text-pink-100">
          Making every celebration <br /> a little sweeter 🎂
        </p>
        <p className="mt-4 text-sm text-pink-200">
          {new Date().getFullYear()} CakeApp. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
