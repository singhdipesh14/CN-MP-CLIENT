// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const form = document.getElementById("form")

let response = {}

const url = "http://localhost:3000/api/v1/ipv4"
const details = document.getElementById("det")

const sendRequest = async (data) => {
	try {
		document.querySelector(".loading").classList.remove("display-none")
		document.querySelector(".info").classList.add("display-none")
		response = (await axios.post(url, data)).data
	} catch (error) {
		console.log(error)
	}
}

const updateDetails = () => {
	document.querySelector(".info").classList.remove("display-none")
	document.querySelector(".loading").classList.add("display-none")
	document.getElementById("IP").textContent = response.info.ip
	document.getElementById("Network-Address").textContent =
		response.info.netAddress
	document.getElementById("Usable-Range").textContent =
		response.info.usableAddressRange
	document.getElementById("Broadcast-Address").textContent =
		response.info.broadcastAddress
	document.getElementById("Total-Hosts").textContent = response.info.totalHosts
	document.getElementById("Usable-Hosts").textContent =
		response.info.numberOfUsableHosts
	document.getElementById("Subnet-Mask").textContent = response.info.subnetmask
	document.getElementById("Wildcard").textContent = response.info.wildCardMask
	document.getElementById("IP-Class").textContent = response.info.ipClass
	document.getElementById("IP-Type").textContent = response.info.ipType
	document.getElementById("blocks-table").innerHTML = response.info.blocks
		.map((item, index) => {
			let [start, end] = item.split("-")
			return `<tr><td>${index + 1}</td><td>${start}</td><td>${end}</td></tr>`
		})
		.join("")
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

sendRequest({ ip: "192.192.192.192", prefix: 8 }).then(updateDetails)
