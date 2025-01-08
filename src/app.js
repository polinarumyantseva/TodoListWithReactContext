import { useState, useEffect } from 'react';
import { AppContext } from './context';
import { getTodoList, addTodoList, deleteTodoList, updateTodoList } from './api';
import { TodosList, ControlPanel } from './components';
import styles from './app.module.css';

export const App = () => {
	const [todosList, setTodosList] = useState([]);
	const [todoItemInputValue, setTodoItemInputValue] = useState('');
	const [isSorted, setIsSorted] = useState(false);

	const dispatch = (action) => {
		const { type, payload } = action;

		switch (type) {
			case 'SET_TODO_LIST': {
				setTodosList(payload);
				break;
			}
			case 'ADD_TO_TODO_LIST': {
				addTodoList(payload).then((newItem) => {
					console.log('Добавление', newItem);
					setTodosList((prevItem) => [...prevItem, newItem]);
				});
				break;
			}
			case 'UPDATE_TODO_ITEM': {
				updateTodoList(payload).then((updatedItem) => {
					console.log('Изменение', updatedItem);
					setTodosList((prevItems) =>
						prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
					);
				});
				break;
			}
			case 'DELETE_TODO_ITEM': {
				deleteTodoList(payload).then((response) => {
					console.log('Удаление', response);
					setTodosList((prevItems) => prevItems.filter((item) => item.id !== payload.id));
				});
				break;
			}
			default:
		}
	};

	const sortTodoList = (list) => list.sort((a, b) => (a.title > b.title ? 1 : -1));

	useEffect(() => {
		getTodoList().then((loadedTodosList) => {
			if (isSorted) {
				loadedTodosList = sortTodoList(loadedTodosList);
			}
			setTodosList(loadedTodosList);
		});
	}, [todoItemInputValue, isSorted]);

	return (
		<AppContext.Provider value={{ todosList, dispatch }}>
			<div className={styles.app}>
				<div className={styles.container}>
					<h1 className={styles.title}>Todo list with React Context</h1>
					<ControlPanel
						todoItemInputValue={todoItemInputValue}
						setTodoItemInputValue={setTodoItemInputValue}
						isSorted={isSorted}
						setIsSorted={setIsSorted}
					/>

					{todosList && todosList.length > 0 ? <TodosList /> : <p>Нет данных</p>}
				</div>
			</div>
		</AppContext.Provider>
	);
};
