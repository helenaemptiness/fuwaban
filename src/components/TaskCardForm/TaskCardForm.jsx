import { useEffect, useReducer, useState } from 'react';
import Button from '../Button/Button';
import styles from './TaskCardForm.module.css';
import { INITIAL_STATE, formReducer, validateInput } from "./TaskCardForm.state"
function TaskCardForm({ formType, onSubmit, onClose, minDate, task, deadline, noDeadline }) {
    const [buttonText, setButtonText] = useState('')
    const [state, dispatch] = useReducer(formReducer, {
        ...INITIAL_STATE,
        values: {
            ...INITIAL_STATE.values,
            task: task || '',
            deadline: deadline || '',
            noDeadline: noDeadline || false
        }
    });



    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const inputValue = type === 'checkbox' ? checked : value;
        
        dispatch({
            type: 'SET_VALUE',
            payload: { name, value: inputValue }
        });
    
        const isValid = validateInput(
            name, 
            inputValue, 
            name === 'noDeadline' ? inputValue : state.values.noDeadline
        );
        
        dispatch({
            type: 'SET_IS_VALID',
            payload: { name, isValid }
        });
    };

    useEffect(() => {
        const isTaskValid = validateInput('task', state.values.task, false);
        const isDeadlineValid = validateInput(
            'deadline', 
            state.values.deadline, 
            state.values.noDeadline
        );
        
        dispatch({
            type: 'SET_READY_TO_SUBMIT',
            payload: isTaskValid && isDeadlineValid
        });
    }, [state.values]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!state.isFormReadyToSubmit) return;
        const newTask = {
            id: Date.now(),
            text: state.values.task,
            deadline: state.values.noDeadline ? null : state.values.deadline,
        };

        onSubmit(newTask);
        dispatch({ type: 'RESET' });
        onClose();
    }

    const handleReset = () => {
        dispatch({
            type: 'RESET_TO_INITIAL',
            payload: {
                task: task || '',
                deadline: deadline || '',
                noDeadline: noDeadline || false
            }
        });
    }

    useEffect(() => {
        if (formType === 'addTask') {
            setButtonText('Добавить задачу')
        } else if (formType === 'editTask') {
            setButtonText('Сохранить')
        }
    })

    
    return (
        <form className={styles.card__form} onSubmit={handleSubmit}>
            <input className={styles.input} type="text" name="task" placeholder='Новая задача'
            value={state.values.task}
            onChange={handleChange}/>
            <div className={styles.form__div}>
                <span className={styles.form__span}>
                    <label className={styles.label__date} htmlFor="deadline">До:</label>
                    <input type="date" name="deadline" id="deadline" 
                    min={minDate}
                    value={state.values.deadline}
                    onChange={handleChange}
                    disabled={state.values.noDeadline}/>
                </span>
                <span className={styles.form__span}>
                    <input type="checkbox" name="noDeadline" id="no-deadline" 
                    checked={state.values.noDeadline}
                    onChange={handleChange}/>
                    <label className={styles.label__checkbox} htmlFor="no-deadline">Без срока</label>
                </span>
            </div>
            <div className={styles.form__buttons}>
                <Button 
                    type="button" 
                    name="Очистить" 
                    onClick={handleReset}
                />
                <Button type="submit" name={buttonText} disabled={!state.isFormReadyToSubmit}/>
            </div>
        </form>
    );
}

export default TaskCardForm