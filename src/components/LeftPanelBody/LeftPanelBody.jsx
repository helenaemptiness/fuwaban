import styles from './LeftPanelBody.module.css';

function LeftPanelBody({ children }) {
    return (
        <div className={styles.panel__body}>
            {children}
        </div>
    );
}

export default LeftPanelBody