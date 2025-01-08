import { useContext } from 'react';
import { AppContext } from '../../context';
import styles from './controlPanel.module.css';

export const ControlPanel = ({ todoItemInputValue, setTodoItemInputValue, isSorted, setIsSorted }) => {
	const { todosList, dispatch } = useContext(AppContext);

	const onClear = () => {
		setTodoItemInputValue('');
		setIsSorted(false);
	};

	const addTodoItem = () => {
		dispatch({ type: 'ADD_TO_TODO_LIST', payload: { title: todoItemInputValue } });
		setTodoItemInputValue('');
	};

	const searchTodoItem = () => {
		const foundItem = todosList.filter((item) => item.title.indexOf(todoItemInputValue) !== -1);
		dispatch({ type: 'SET_TODO_LIST', payload: foundItem });
	};

	return (
		<div className={styles['add-new-value-block']}>
			<input
				type="text"
				className={styles.field}
				value={todoItemInputValue}
				onChange={({ target }) => setTodoItemInputValue(target.value)}
				placeholder="Введите название дела"
			/>
			<div className={styles['buttons-container']}>
				<button
					className={styles['submit-button']}
					type="button"
					onClick={addTodoItem}
					disabled={todoItemInputValue === ''}
				>
					Добавить
				</button>
				<button className={styles['submit-button']} type="button" onClick={searchTodoItem}>
					Найти
				</button>
				<button className={styles['secondary-button']} type="button" onClick={onClear}>
					Сброс
				</button>
				<label className={styles['checkbox-label']}>
					<input
						type="checkbox"
						checked={isSorted}
						name="sort"
						onChange={({ target }) => {
							setIsSorted(target.checked);
						}}
					/>
					Отсортировать по алфавиту
				</label>
			</div>
		</div>
	);
};
