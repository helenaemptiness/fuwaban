import styles from './MoveButton.module.css';

function MoveButton( { onClick, color } ) {
    return (
        <button className={styles.button__move} onClick={onClick}>
            <svg 
                width="24" 
                height="20" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M10.2 10L8.575 11.625L9.975 13.025L14 9L9.975 4.975L8.575 6.375L10.2 8H6V10H10.2ZM2 16C1.45 16 0.979333 15.8043 0.588 15.413C0.196667 15.0217 0.000666667 14.5507 0 14V2C0 1.45 0.196 0.979333 0.588 0.588C0.98 0.196666 1.45067 0.000666667 2 0H8L10 2H18C18.55 2 19.021 2.196 19.413 2.588C19.805 2.98 20.0007 3.45067 20 4V14C20 14.55 19.8043 15.021 19.413 15.413C19.0217 15.805 18.5507 16.0007 18 16H2ZM2 14H18V4H9.175L7.175 2H2V14Z" 
                fill={color}/>
            </svg>



        </button>
    );
}

export default MoveButton    