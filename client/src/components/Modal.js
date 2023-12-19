import { useState } from "react";
import { useCookies } from "react-cookie";

const Modal = ({ mode, setShowModal, task, getData }) => {
	const [cookies, setCookie, removeCookie] = useCookies(null);
	const editMode = mode === "edit";

	const [data, setData] = useState({
		user_email: editMode ? task.user_email : cookies.Email,
		title: editMode ? task.title : "",
		progress: editMode ? task.progress : 50,
		date: editMode ? "" : new Date(),
	});

	const postData = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(
				`${process.env.REACT_APP_SERVERURL}/todos`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(data),
				}
			);
			if (response.status === 200) {
				console.log("CREATE WORKED", response);
				setShowModal(false);
				getData();
			}
		} catch (error) {
			console.error(error);
		}
	};

	const editData = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(
				`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`,
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(data),
				}
			);
			if (response.status === 200) {
				console.log("EDIT WORKED", response);
				setShowModal(false);
				getData();
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setData({ ...data, [name]: value });
	};

	return (
		<div className="overlay">
			<div className="modal">
				<div className="form-title-container">
					<h3>Let's {mode} your task</h3>

					<button
						className="delete"
						onClick={() => setShowModal(false)}
					>
						X
					</button>
				</div>
				<form>
					<input
						type="text"
						name="title"
						maxLength={30}
						placeholder="Task title"
						value={data.title}
						onChange={handleChange}
					/>
					<label>
						<span>The progress of your task</span>
						<input
							type="range"
							min={0}
							max={100}
							name="progress"
							value={data.progress}
							onChange={handleChange}
						/>
					</label>
					<button
						type="submit"
						className={mode}
						onClick={editMode ? editData : postData}
					>
						{mode === "create" ? "Create" : "Update"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default Modal;
