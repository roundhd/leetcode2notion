import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { Box, Grid, InputBase, IconButton, TextField } from "@material-ui/core"
import { Add as AddIcon } from "@material-ui/icons"
import "./popup.css"
import { getDatabase, getPages, addItem } from "../utils/api"
import getDateString from "../utils/helpers"

const App: React.FC<{}> = () => {
	const [noteInput, setNoteInput] = useState<string>("")

	const handleButtonClick = () => {
		let data = [noteInput, getDateString()]

		chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
			chrome.tabs.sendMessage(
				tabs[0].id,
				"ask for lc title from pop",
				(problemData) => {
					// console.log("problemData=", problemData)
					data = [...problemData, ...data]
					console.log(data)
					addItem(data)
				}
			)
		})
	}

	return (
		<Box
			mx="8px"
			my="16px"
		>
			{/* <InputBase
				placeholder="Add notes ..."
				value={noteInput}
				onChange={(event) => setNoteInput(event.target.value)}
			/> */}
			<TextField
				style={{ width: 270 }}
				placeholder="Add notes ..."
				// label="fullWidth"
				value={noteInput}
				onChange={(event) => setNoteInput(event.target.value)}
			/>
			<IconButton
				size="small"
				onClick={handleButtonClick}
			>
				<AddIcon />
			</IconButton>
		</Box>
	)
}

const root = document.createElement("div")
document.body.appendChild(root)
ReactDOM.render(<App />, root)
