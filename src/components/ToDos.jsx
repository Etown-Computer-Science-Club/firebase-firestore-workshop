import React, { useEffect, useState } from 'react';
import ToDo from './ToDo';
import { getToDos, deleteToDo, updateToDo, addToDo } from '../services/toDoService';

const ToDos = () => {
	const [toDos, setToDos] = useState([]);
	const [toDoTitle, setToDoTitle] = useState('');

	useEffect(() => {
		async function fetchData() {
			const data = await getToDos();
			setToDos(data);
		}

		fetchData();
	}, []);

	async function handleDelete(id) {
		const originalToDos = toDos;

		try {
			await deleteToDo(id);

			const newToDos = toDos.filter((toDo) => toDo.id !== id);
			setToDos(newToDos);
		} catch (e) {
			console.error(e);
			setToDos(originalToDos);
		}
	}

	async function handleCheckboxChange(id, isChecked) {
		const originalToDos = toDos;

		try {
			await updateToDo(id, isChecked);

			const newToDos = toDos.map((toDo) => {
				if (toDo.id === id) {
					toDo.completed = isChecked;
				}
				return toDo;
			});

			setToDos(newToDos);
		} catch (e) {
			console.error(e);
			setToDos(originalToDos);
		}
	}

	async function handleAddToDo() {
		const originalToDos = toDos;

		try {
			const newToDo = await addToDo(toDoTitle, false);

			const newToDos = [...toDos, newToDo];
			setToDos(newToDos);
			setToDoTitle('');
		} catch (e) {
			console.error(e);
			setToDos(originalToDos);
		}
	}
	
	return (
		<>
			<div className='add-todo-container'>
				<input
					type="text"
					placeholder="Add a new todo"
					value={toDoTitle}
					onChange={(event) => setToDoTitle(event.target.value)}
				/>
				<button onClick={handleAddToDo}>
					Add
				</button>
			</div>
			<table className='todosTable'>
				<thead>
					<tr>
						<th>Title</th>
						<th>Completed</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{toDos.map((toDo) => (
						<ToDo
							key={toDo.id}
							id={toDo.id}
							title={toDo.title}
							completed={toDo.completed}
							handleDelete={handleDelete}
							handleCheckboxChange={handleCheckboxChange}
						/>
					))}
				</tbody>
			</table>
		</>
	);
};


				

export default ToDos;