// this function  use to View All internship
let internships;
function ViewAllInternship() {
	fetch("https://enagancy.000webhostapp.com/api/internships")
		.then(response => {
			return response.json()


		})
		.then(data => {
				internships = data
			console.log(internships)
			let trs = ``;
			for (var i = 0; i < internships.length; i++) {
				trs += `
			<div class="col-xl-4 col-lg-4 col-md-6 md-mb-30">
					<div class="service__area-item t-center thin-bg">
						<div class="service__area-item-icon mb-20 bg-white">
							<img src="${internships[i].small_icon}" alt="">
						</div>
						<div class="service__area-item-content">
							<h4 class="mb-20 parag" style="text-align:center;">${internships[i].small_title}</h4>
							<p class="mb-20 cont ">${internships[i].small_description}</p>
							<a class="simple-btn"  onclick="intershipDetils(${internships[i].id})">More Details</a>
						</div>
					</div>
				</div>
			`;

			}

			document.getElementById("internships").innerHTML = trs;


		})
		.catch(error => {
			// handle the error
		});
}
ViewAllInternship()

// this function use to get Internship Detils by id 
let singleIntership
function intershipDetils(id) {
	fetch(`https://enagancy.000webhostapp.com/api/internship/${id}`)
		.then(response => {
			return response.json()


		})
		.then(data => {

			singleIntership = data
			// console.log(data)
			localStorage.setItem("internshipDeltils", JSON.stringify(singleIntership));

			window.location.assign("internship_view.html")


		})
		.catch(error => {
			// handle the error
		});
}
// this function use to display Cours Detils 
let displayIntern = []
function displaySingleIntern() {
	let Intership = JSON.parse(localStorage.getItem("internshipDeltils"));
	displayIntern = Intership
	document.getElementById("internDetils").innerHTML = `
	<div class="itemOne">
					<h1 class="backendTitle">${displayIntern.title}</h1>
					<p class="p-title">${displayIntern.description}</p>
					<div class="">
						<ul class="ListLinks">
						<li>${displayIntern.price} </li>
						<li>${displayIntern.duration} </li>
						<li>${displayIntern.project} </li>
						<li>${displayIntern.tag_one} </li>
						<li>${displayIntern.tag_two} </li>
						</ul>
					</div>
					<br>
					<br>
					<div class="FooterButtons">
						<button class="childButtom1">
							Register now
							<img src="img/arrow-right.svg" alt="" srcset="">
						</button>
						<button class="childButtom2"> <svg xmlns="http://www.w3.org/2000/svg" width="20.402"
								height="24.264" viewBox="0 0 20.402 24.264">
								<g id="download" transform="translate(-628.752 -864.244)">
									<g id="icon" fill="none" stroke="#0f0f0f" stroke-width="2px"
										transform="translate(623.113 859)">
										<path id="Line_310" stroke-linejoin="round" d="M0 0L19.606 0"
											data-name="Line 310" transform="translate(6.085 28.508)"></path>
										<g id="arrow" transform="rotate(90 9.798 15.542)">
											<path id="Rectangle_2" d="M8.96-.012L18.011 9.5 8.96 19.012"
												data-name="Rectangle 2"></path>
											<path id="Line_382" d="M18 0L0 0" data-name="Line 382"
												transform="translate(-.5 9.5)"></path>
										</g>
									</g>
								</g>
							</svg>
							<a href="${displayIntern.content_link}">Download Internship content</a>

							</button>
					</div>

				</div>
				<div class="ItemTow">
					<img src="${displayIntern.img}" alt="">
				</div>
	`
	document.getElementById("internBg").style.cssText = `background-color:${displayIntern.color}; !important`

}

displaySingleIntern()





// form internship_view.html (Register Internship Now)

function sendData() {
	// (A) GET FORM DATA
	var data = new FormData();
	data.append("name", document.getElementById("name").value);
	data.append("email", document.getElementById("email").value);
	data.append("phone", document.getElementById("phone").value);
	data.append("address", document.getElementById("address").value);

	// (B) INIT FETCH POST
	fetch("https://enagancy.000webhostapp.com/api/internship/regester", {
		method: "POST",
		body: data
	})

		// (C) RETURN SERVER RESPONSE AS TEXT
		.then((result) => {
			if (result.status != 200) { throw new Error("Bad Server Response"); }
			return result.text();
		})

		// (D) SERVER RESPONSE
		.then((response) => {
			if (response == `"regester course is successfully"`) {

				// sucess register
				document.getElementById("AlertSucses").classList.add("d-block");
				document.getElementById("AlertSucses").innerHTML = `regester course is successfully`
			} else {
				//  falid register 
				document.getElementById("alert").classList.add("d-block")
				if (response.includes("phone field")) {

					document.getElementById("alert").innerHTML = `phone field !`

				} else if (response.includes(" email field")) {

					document.getElementById("alert").innerHTML = `email field !`

				} else if (response.includes("name field")) {

					document.getElementById("alert").innerHTML = `name field !`

				} else if ((response.includes("address field"))) {

					document.getElementById("alert").innerHTML = `address field !`

				}
			}

			//   window.location.assign("course_view.html")
		})

		// (E) HANDLE ERRORS - OPTIONAL
		.catch((error) => { console.log(error); });

	// (F) PREVENT FORM SUBMIT
	return false;
}