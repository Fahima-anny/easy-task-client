

const Footer = () => {
    return (
        <footer className="footer footer-center bg-base-300 text-gray-500 p-4">
        <aside>
          <p>Copyright © {new Date().getFullYear()} - Designed & Developed by <br className="block md:hidden" /> <a className="text-accent font-semibold" href="https://fahima-akter.netlify.app/">Fahima Akter</a></p>
        </aside>
      </footer>
    );
};

export default Footer;