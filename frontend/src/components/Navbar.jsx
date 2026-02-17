import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "./ui/Button";
import AvatarDropdown from "./AvatarDropdown";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold tracking-tighter">
            Blog<span className="text-gray-400">App</span>.
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link to="/create-blog">
                  <Button variant="outline" className="hidden sm:block">
                    Write
                  </Button>
                </Link>
                <AvatarDropdown user={user} logout={logout} />
              </>
            ) : (
              <div className="flex gap-2">
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Get Started</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
