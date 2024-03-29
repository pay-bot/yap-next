import { Link } from 'react-router-dom';

function Button({ text, bg, padding }) {
  return (
    <div>
      <button
        className={`
          ${padding || 'px-6 py-2'} rounded-sm text-sm font-semibold
          uppercase text-white transition ${bg}`}
      >
        <span>{text}</span>
      </button>
    </div>
  );
}

function Navbar2() {
  return (
    <div className="fixed left-0 right-0 top-0 h-16 bg-gray-900 shadow-md">
      <nav className="mx-auto mx-auto flex h-full max-w-screen-2xl items-center justify-between">
        <h1 className="text-lg font-semibold uppercase text-gray-100">🔄</h1>
        <div>
          <ul className="flex items-center space-x-10 text-sm">
            <li>
              <Link to="/" className="text-gray-400 hover:text-gray-100">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-400 hover:text-gray-100">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/docs" className="text-gray-400 hover:text-gray-100">
                Docs
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <button text="Login" bg="bg-gradient-to-r from-purple-500 to-blue-500" />
        </div>
      </nav>
    </div>
  );
}

export default Navbar2;
