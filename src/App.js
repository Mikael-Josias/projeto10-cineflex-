import "./styles/fonts.css";
import GlobalStyle from "./components/GlobalStyle";

import Header from "./components/Header";
import Content from "./components/Content";

export default function App() {
	return (
		<>
			<GlobalStyle/>
			<Header/>
			<Content/>
		</>
	);
}
