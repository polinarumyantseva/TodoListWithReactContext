import { useContext } from 'react';
import { AppContext } from '../../context';
import { TodoItem } from './components/TodoItem/TodoItem';
import styles from './components/TodoItem/todoItem.module.css';

export const TodosList = () => {
	const { todosList } = useContext(AppContext);

	return (
		<ul className={styles['todos-list']}>
			{todosList.map(({ id, title }) => (
				<TodoItem key={id} id={id} title={title} />
			))}
		</ul>
	);
};
