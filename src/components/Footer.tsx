function Footer() {
  return (
    <footer className="text-center bg-black text-white shadow p-2 md:p-4">
      <div className="w-full mx-auto max-w-screen-xl p-1 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-300 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <a href="https://github.com/eyupkirci/rijksmuseum-app" className="hover:underline">
            Eyup™
          </a>{" "}
          All Rights Reserved.
        </span>
        <ul className="flex flex-wrap justify-center gap-4 items-center text-sm font-medium text-gray-400">
          <li>
            <a href="#" className="hover:underline">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
