const apiUrl = 'http://localhost:3000/todos';

export async function getToDos() {
	try {
		const response = await fetch(apiUrl);
		const data = await response.json();
		return data;
	} catch (e) {
		console.error(e);
		return [];
	}
}

export async function addToDo(title, completed) {
	const response = await fetch(apiUrl, {
		method: 'POST',
		body: JSON.stringify({
			title: title,
			completed: completed,
			userId: 1,
		}),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	});
	const data = await response.json();
	return data;
}

export async function updateToDo(id, completed) {
	const response = await fetch(`${apiUrl}/${id}`, {
		method: 'PATCH',
		body: JSON.stringify({
			completed: completed
		}),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	});
	const data = await response.json();
	return data;
}

export async function deleteToDo(id) {
	const response = await fetch(`${apiUrl}/${id}`, {
		method: 'DELETE',
	});
	const data = await response.json();
	return data;
}