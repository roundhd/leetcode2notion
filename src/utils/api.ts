import axios from "axios"

import { NOTION_KEY, NOTION_DATABASE_ID } from "../secret"
const BASE_URL = "https://api.notion.com/v1"

const getDatabase = async () => {
	const options = {
		method: "GET",
		url: `${BASE_URL}/databases/${NOTION_DATABASE_ID}`,
		headers: {
			Authorization: `Bearer ${NOTION_KEY}`,
			accept: "application/json",
			"Notion-Version": "2022-06-28",
		},
	}

	axios
		.request(options)
		.then(function (response) {
			console.log(response.data)
		})
		.catch(function (error) {
			console.error(error)
		})
}

const getPages = async (problemTitle) => {
	// console.log(problemTitle)

	const options = {
		method: "post",
		url: `${BASE_URL}/databases/${NOTION_DATABASE_ID}/query`,
		headers: {
			Authorization: `Bearer ${NOTION_KEY}`,
			accept: "application/json",
			"Notion-Version": "2022-06-28",
			"content-type": "application/json",
		},
		data: {
			page_size: 100,
			filter: {
				property: "Name",
				rich_text: {
					contains: `${problemTitle}`,
				},
			},
		},
	}

	axios
		.request(options)
		.then(function (response) {
			const rows = response.data.results
			// return rows
			console.log(rows.length)
			for (let i = 0; i < rows.length; i++) {
				console.log(rows[i])
				console.log(rows[i].id)
				console.log(rows[i].properties.Date.date.start)
				console.log(rows[i].properties.Notes.rich_text[0].plain_text)
				console.log(rows[i].properties.Name.title[0].plain_text)
			}
		})
		.catch(function (error) {
			console.error(error)
		})
}

const addItem = async (data) => {
	const [name, link, difficulty, notes, date] = data
	console.log("para info", data, name, link, difficulty, notes, date)

	const options = {
		method: "POST",
		url: "https://api.notion.com/v1/pages",
		headers: {
			Authorization: `Bearer ${NOTION_KEY}`,
			accept: "application/json",
			"Notion-Version": "2022-06-28",
			"content-type": "application/json",
		},
		data: {
			parent: { database_id: NOTION_DATABASE_ID },
			properties: {
				Name: {
					title: [
						{
							text: {
								content: name,
							},
						},
					],
				},
				Link: {
					url: link,
				},
				Difficulty: {
					select: {
						name: difficulty,
					},
				},
				Notes: {
					rich_text: [
						{
							type: "text",
							text: {
								content: notes,
							},
						},
					],
				},
				Date: {
					date: {
						start: date,
					},
				},
			},
		},
	}

	axios
		.request(options)
		.then(function (response) {
			console.log(response.data)
			window.close()
		})
		.catch(function (error) {
			console.error(error)
			alert("error")
		})
}
export { getDatabase, getPages, addItem }
