import { useState, useContext } from 'react';
import { AppContext } from '../../../../context';
import styles from './todoItem.module.css';

export const TodoItem = ({ id, title }) => {
	const [editItemId, setEditItemId] = useState(null);
	const [valueForEdit, setValueForEdit] = useState('');
	const { dispatch } = useContext(AppContext);

	const editTodoItem = (id, title) => {
		setValueForEdit(title);
		if (id !== editItemId) {
			setEditItemId(id);
		} else {
			setEditItemId(null);
			dispatch({ type: 'UPDATE_TODO_ITEM', payload: { id, title: valueForEdit } });
		}
	};

	const deleteTodoItem = (id) => {
		dispatch({ type: 'DELETE_TODO_ITEM', payload: { id } });
	};

	return (
		<li key={id} className={styles['todos-list-item']}>
			{editItemId === id ? (
				<input
					className={styles.field}
					defaultValue={title}
					onChange={({ target }) => setValueForEdit(target.value)}
				/>
			) : (
				title
			)}
			<div className={styles['buttons-container']}>
				<button
					className={styles['edit-button'] + (editItemId === id ? ' ' + styles.edit : '')}
					type="button"
					onClick={() => editTodoItem(id, title)}
				></button>
				<button className={styles['delete-button']} type="button" onClick={() => deleteTodoItem(id)}>
					X
				</button>
			</div>
		</li>
	);
};
