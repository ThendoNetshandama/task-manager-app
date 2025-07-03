import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';
import Button from './ui/Button';
import { Link } from 'react-router-dom';

const Navbar =() > {
    const { theme, toggleTheme} =useTheme()

return (
    <nav className= "bg-white dark:bg-gray-900 shadow-md transition-colors duration-300">
    <div>
    <Link to="/">
        TaskManager
    </Link>
    
    </div>
    </nav>
)


}
export default Navbar;