// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const form = document.getElementById("form")

let response

const url = "https://randomuser.me/api/"
const details = document.getElementById("det")

const sendRequest = async (data) => {
	try {
		document.querySelector(".loading").classList.remove("display-none")
		document.querySelector(".info").classList.add("display-none")
		console.log(data)
		response = (await axios.get(url)).data
		console.log(response)
	} catch (error) {
		console.log(error)
	}
}

const updateDetails = () => {
	document.querySelector(".info").classList.remove("display-none")
	document.querySelector(".loading").classList.add("display-none")
}

const onSubmit = () => {
	const ip1 = document.getElementById("ip1").value
	const ip2 = document.getElementById("ip2").value
	const ip3 = document.getElementById("ip3").value
	const ip4 = document.getElementById("ip4").value
	const prefix = parseInt(document.getElementById("prefix").value)
	const ip = [ip1, ip2, ip3, ip4]
	const data = { ip: ip.join("."), prefix }
	sendRequest(data).then(updateDetails)
}

form.addEventListener("submit", function (e) {
	e.preventDefault()
	onSubmit()
})

sendRequest("hello").then(updateDetails)
