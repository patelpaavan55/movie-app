import React, { FC } from 'react'
import Link from 'next/link'
import { Favorites } from './Favorites'

export const NavMenu: FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href={'/'}>Home</Link>
        </li>
        <li>
          <Link href={'/favorites'}>Favorites</Link>
        </li>
      </ul>
    </nav>
  )
}
