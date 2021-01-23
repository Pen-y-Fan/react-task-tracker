import {Link} from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer>
      <p>Copyright &copy; {currentYear}</p>
      <Link to='/about'>About</Link>
    </footer>
  );
}

export default Footer;
