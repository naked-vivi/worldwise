import Map from "../components/map"
import Sidebar from "../components/sidebar"
import User from "../components/user"
import styles from "./app-layout.module.css"

function AppLayout() {
    return (
        <div className={styles.app}>
            <Sidebar />
            <Map />
            <User />
        </div>
    )
}

export default AppLayout