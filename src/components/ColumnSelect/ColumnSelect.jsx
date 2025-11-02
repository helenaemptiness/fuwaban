import styles from './ColumnSelect.module.css';

function ColumnSelect({firstOption, secondOption, thirdOption, fourthOption, currentOption, onSelect}) {
    const handleChange = (e) => {
        if (onSelect) {
            onSelect(e.target.value)
        }
    }

    const selectClasses = [
        styles.column__select,
        currentOption === firstOption ? styles.column__1 : '',
        currentOption === secondOption ? styles.column__2 : '',
        currentOption === thirdOption ? styles.column__3 : '',
        currentOption === fourthOption ? styles.column__4 : ''
    ].filter(Boolean).join(' ')
    
    return (
        <form>
        <select 
            className={selectClasses} 
            name="column" 
            id="column-select" 
            defaultValue={currentOption}
            onChange={handleChange}
        >
            <option className={styles.column__option}  value={firstOption}>
                ● {firstOption}
            </option>
            <option className={styles.column__option} value={secondOption}>
                ● {secondOption}
            </option>
            <option className={styles.column__option} value={thirdOption}>
                ● {thirdOption}
            </option>
            <option className={styles.column__option} value={fourthOption}>
                ● {fourthOption}
            </option>
        </select>
    </form>
    );
}

export default ColumnSelect