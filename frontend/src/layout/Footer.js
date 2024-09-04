import React from 'react';
import '../styles/layout/Footer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer>
      <div className="inner">
        <div className="footer-info">
          <a href="https://github.com/SeSAC-2nd">
            <FontAwesomeIcon icon={faGithub} />
            <span className="footer-infotxt">github</span>
          </a>
        </div>
        <p className="copyright">
          &copy;
          <span className="this-year">{new Date().getFullYear()}</span>
          리블링스
        </p>
      </div>
    </footer>
  );
}
