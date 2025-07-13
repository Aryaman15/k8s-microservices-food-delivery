const Footer = () => (
  <footer className="bg-blue-600 text-white mt-12">
    <div className="max-w-7xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-3 text-sm">
      <section>
        <h4 className="font-semibold mb-2">Quick Links</h4>
        <ul className="space-y-1">
          <li>About Us</li>
          <li>Services</li>
          <li>Privacy Policy</li>
        </ul>
      </section>

      <section>
        <h4 className="font-semibold mb-2">Contact</h4>
        <p>123 Food Street, Gourmet City</p>
        <p>Phone: (123) 456-7890</p>
      </section>

      <p className="md:col-span-3 text-center mt-6 md:mt-0">
        © {new Date().getFullYear()} MERN Dine. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
