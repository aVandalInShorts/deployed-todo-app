import { useState } from "react";
import ProgressBar from "./ProgressBar";
import TickIcon from "./TickIcon";
import Modal from "./Modal";

const ListItem = ({ task, getData }) => {
	const [showModal, setShowModal] = useState(false);

	const deleteItem = async () => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`,
				{
					method: "DELETE",
				}
			);
			if (response.status === 200) {
				getData();
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<div className="list-item">
				<div className="info-container">
					<TickIcon />
					<p className="task-title">{task.title}</p>
					<ProgressBar progress={task.progress} />
				</div>

				<div className="button-container">
					<button className="edit" onClick={() => setShowModal(true)}>
						Edit
					</button>
					<button className="delete" onClick={deleteItem}>
						Delete
					</button>
				</div>
			</div>
			{showModal && (
				<Modal
					mode={"edit"}
					setShowModal={setShowModal}
					getData={getData}
					task={task}
				/>
			)}
		</>
	);
};

export default ListItem;
