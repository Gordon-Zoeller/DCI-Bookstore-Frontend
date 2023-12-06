import { FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <>
      <footer>
        <p>
          <a href='https://github.com/Gordon-Zoeller/DCI-Bookstore-Frontend'>
            <FaGithub />
          </a>
        </p>
        <p>
          <a href='#'>Contact</a>
        </p>
        <p>
          <a href='#'>Impressum</a>
        </p>
        <p>
          &copy; {new Date().getFullYear()} <span>Booksy</span>
        </p>
      </footer>
    </>
  );
}
