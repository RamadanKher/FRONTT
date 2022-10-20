// this function  use to View All Courses
let cousres;
function ViewAllCourses() {
	fetch("https://enagancy.000webhostapp.com/api/courses")
		.then(response => {
			return response.json()


		})
		.then(data => {

			cousres = data
			// console.log(cousres)
			let trs = ``;
			for (var i = 0; i < cousres.length; i++) {
				trs += `
			  <div class="col-xl-4 col-lg-4 col-md-6 md-mb-30">
			  <div class="service__area-item t-center thin-bg">
			  <div class="service__area-item-icon mb-20 bg-white">
				  <img src="${cousres[i].small_icon}" alt="">
			  </div>
			  <div class="service__area-item-content">
				  <h4 class="mb-20 parag" style="text-align:center;">${cousres[i].small_title}</h4>
				  <p class="mb-20 cont ">${cousres[i].small_description}</p>
				  <a  onclick="getCoursDetils(${cousres[i].id})"    class="simple-btn"  >More Details</a>
			  </div>
		  </div>
		  </div>
				`;

			}

			document.getElementById("tboddy").innerHTML = trs;


		})
		.catch(error => {
			// handle the error
		});
}

ViewAllCourses()
// this function use to get Cours Detils by id 
let single
 function getCoursDetils(id) {
	 fetch(`https://enagancy.000webhostapp.com/api/course/${id}`)
		.then(response => {
			return response.json()


		})
		.then(data => {

			single = data
			console.log(data)
			localStorage.setItem("coursDeltils", JSON.stringify(data));

			window.location.assign("course_view.html")


		})
		.catch(error => {
			// handle the error
		});
}

// this function use to display Cours Detils  
function displayCourseDetils() {
	let SingleCourse = JSON.parse(localStorage.getItem("coursDeltils"));
	console.log(SingleCourse)





	document.getElementById("coursDetils").innerHTML = `
	<div class="itemOne">
					<h1 class="backendTitle"> ${SingleCourse.title} </h1>
					<p class="p-title">${SingleCourse.description}</p>
					<div class="">
						<ul class="ListLinks">
							<li>${SingleCourse.price} </li>
							<li>${SingleCourse.duration} </li>
							<li>${SingleCourse.project} </li>
							<li>${SingleCourse.tag_one} </li>
							<li>${SingleCourse.tag_two} </li>
							
						</ul>
					</div>
					<br>
					<br>
					<div class="FooterButtons">
						<button class="childButtom1">
							Register now
							<img src="img/arrow-right.svg" alt="" srcset="">
						</button>
						<button class="childButtom2"> 
						<svg xmlns="http://www.w3.org/2000/svg" width="20.402"height="24.264" viewBox="0 0 20.402 24.264">
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
							<a href="${SingleCourse.content_link}">Download Content</a>
							</button>
					</div>

				</div>
				<div class="ItemTow">
					<img class="w-100" src="${SingleCourse.img}" alt="">
				</div>
	`
	// change bg 
	document.getElementById("backendBg").style.cssText = `background-color:${SingleCourse.color}; !important`
}
displayCourseDetils()


// form course_view (Register Course Now)

function sendData() {
	// (A) GET FORM DATA
	var data = new FormData();
	data.append("name", document.getElementById("name").value);
	data.append("email", document.getElementById("email").value);
	data.append("phone", document.getElementById("phone").value);
	data.append("address", document.getElementById("address").value);

	// (B) INIT FETCH POST
	fetch("https://enagancy.000webhostapp.com/api/course/regester", {
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
				// route 
				window.location.assign("course_view.html")
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