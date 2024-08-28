import React from 'react'
import { Link } from 'react-router-dom';

export default function HeaderSideMenu({logstate}) {
    console.log(logstate);
  return (
    <ul>
        {
            logstate.map((value,idx) => (
                <li key={idx}>
                    <Link to=''></Link>
                </li>
            ))
        }
    </ul>
  )
}
