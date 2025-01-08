const fetchFunction = (method, { id, ...data } = {}) => {
	let url = `http://localhost:3003/todos`;
	const options = {
		method,
		headers: { 'Content-Type': 'application/json;charset=utf-8' },
	};

	if (method === 'DELETE' || method === 'PUT') {
		url += `/${id}`;
	}

	if (method === 'POST' || method === 'PUT') {
		options.body = JSON.stringify(data);
	}

	return fetch(url, options).then((response) => response.json());
};

export const getTodoList = () => fetchFunction('GET');
export const addTodoList = (newTodo) => fetchFunction('POST', newTodo);
export const deleteTodoList = (currentTodo) => fetchFunction('DELETE', currentTodo);
export const updateTodoList = (currentTodo) => fetchFunction('PUT', currentTodo);
