const BASE_URL = "https://api.notion.com/v1"
const PROBLEM_NAME_CLASS = "mr-2"
const DIFFICULTY_CONTAINER_CLASS = "mt-3"

const title = document.querySelector(".mr-2").textContent
const link = window.location.href
const difficulty =
	document.querySelector(".mt-3").firstChild.firstChild.textContent
console.log(title, link, difficulty)

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
	sendResponse([title, link, difficulty])
})
