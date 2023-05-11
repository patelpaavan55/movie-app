import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '@/styles/NavMenu.module.css'

const NavMenu = () => {
    const router = useRouter()

    return (
        <nav className={styles['nav-menu']}>
            <Link
                href="/"
                className={router.pathname === '/' ? styles.active : ''}
            >
                Home
            </Link>
            <Link
                href="/favorites"
                className={
                    router.pathname === '/favorites' ? styles.active : ''
                }
            >
                Favorites
            </Link>
        </nav>
    )
}

export default NavMenu
