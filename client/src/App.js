import Auth from "./components/Auth";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const App = () => {
	const [cookies, setCookie, removeCookie] = useCookies(null);
	const userEmail = cookies.Email;
	const authToken = cookies.AuthToken;
	const [tasks, setTasks] = useState([]);

	const getData = async () => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`
			);
			const json = await response.json();
			setTasks(json);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (authToken) {
			getData();
		}
	}, []);

	//Sort by date
	const sortedTasks = tasks.sort((a, b) => {
		return new Date(a.date) - new Date(b.date);
	});

	return (
		<div className="app">
			{!authToken && <Auth />}
			{authToken && (
				<>
					<ListHeader
						listName={"Holiday Tick list 🚵"}
						getData={getData}
					/>
					<p className="user-email">Welcome back {userEmail}</p>
					{sortedTasks.map((task) => (
						<ListItem key={task.id} task={task} getData={getData} />
					))}
					<p className="copyright">© Franck yooo</p>
				</>
			)}
		</div>
	);
};

export default App;
