import React from "react";

const ToDo = (props) => {
	function onCheckboxChange(id, event) {
		let isChecked = event.target.checked;
		props.handleCheckboxChange(id, isChecked);
	}

	return (
		<tr>
			<td>{props.title}</td>
			<td>
				<input 
					type="checkbox" 
					checked={props.completed} 
					onChange={(event) => onCheckboxChange(props.id, event)} 
				/>
			</td>
			<td>
				<button onClick={() => props.handleDelete(props.id)} className="deleteBtn">
					Delete
				</button>
			</td>
		</tr>
	);
};

export default ToDo;
