import React from 'react'
import '../styles/layout/Footer.scss';

export default function Footer() {
  return (
    <footer>
        <div className='inner'>
          <p className="copyright">&copy;
              <span className="this-year"></span>
              리블링스
          </p>
      </div>
    </footer>
  )
}
