function Header() {
  return (
    <div className="grow-0 p-4 w-full bg-black text-white dark:text-white dark:bg-black flex justify-between items-center p-2">
      <div>
        <a href="/" className="hover:text-orange-400 hover:scale-105">
          Rijks Museum
        </a>
      </div>
      <div>
        <p>User</p>
      </div>
    </div>
  );
}

export default Header;
