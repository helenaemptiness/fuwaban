import Button from '../Button/Button';
import styles from './TaskCardForm.module.css';

function TaskCardForm({ task, deadline }) {
    return (
        <form className={styles.card__form}>
            <input className={styles.input} type="text" placeholder='Новая задача'/>
            <div className={styles.form__div}>
                <span className={styles.form__span}>
                    <label className={styles.label__date} htmlFor="deadline">До:</label>
                    <input type="date" name="deadline" id="deadline"/>
                </span>
                <span className={styles.form__span}>
                    <input type="checkbox" name="no-deadline" id="no-deadline" />
                    <label className={styles.label__checkbox} htmlFor="no-deadline">Без срока</label>
                </span>
            </div>
            <Button type="submit" name="ОК"/>
        </form>
    );
}

export default TaskCardForm