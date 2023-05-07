function Header() {
  return (
    <header className="flex justify-center">
      <nav>
        <ul className="flex">
          <li className="m-3">
            <a className="p-2 text-center text-cyan-300 font-medium" href="#">Home</a>
          </li>
          <li className="m-3">
            <a className="p-2 text-center text-cyan-300 font-medium" href="#">Products</a>
          </li>
          <li className="m-3">
            <a className="p-2 text-center text-cyan-300 font-medium" href="#">About Us</a>
          </li>
          <li className="m-3">
            <a className="p-2 text-center text-cyan-300 font-medium" href="#">Cont Us</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
