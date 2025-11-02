import styles from './Header.module.css';

function Header() {
    return (
        <div className={styles.header}>
            <img src="/logo.svg" width='233' height="64" alt="" className={styles.logo} />
        </div>
    );
}

export default Header