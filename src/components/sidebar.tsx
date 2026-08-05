import { Outlet } from 'react-router-dom'
import AppNav from './app-nav'
import Logo from './logo'
import styles from './sidebar.module.css'

function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <Logo />
            <AppNav />

            <Outlet />
            
            <footer className={styles.footer}>
                <p className={styles.copyright}>&copy; {new Date().getFullYear()} World Wise. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default Sidebar