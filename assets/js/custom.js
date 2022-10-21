
(function ($) {
	"use strict";
	// /*========== Responsive Menu  ==========*/
	$('.header__area-main-menu').meanmenu({
		meanMenuContainer: '.responsive-menu',
		meanScreenWidth: '991',
		meanMenuOpen: '<span></span><span></span><span></span>',
		meanMenuClose: '<i class="flaticon-close"></i>'
	});
	// /*==========  wow  ==========*/
	new WOW().init();
	/*========== menu-bar sticky  ==========*/
	$(window).on('scroll', function () {
		var scrollDown = $(window).scrollTop();
		if (scrollDown < 135) {
			$(".header__area").removeClass("header__area-sticky-menu");
		} else {
			$(".header__area").addClass("header__area-sticky-menu");
		}
	});
	/*==========  Team Slider  ==========*/
	var swiper = new Swiper(".team-slider", {
		slidesPerView: 1,
		loop: true,
		speed: 600,
		autoplay: {
			delay: 3000,
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
	});
	/*==========  counterUp  ==========*/
	var counter = $('.counter');
	counter.counterUp({
		time: 2500,
		delay: 100
	});
	/*==========  Search  =========*/
	$('.header__area-search-icon.open').on('click', function () {
		$('.header__area-search-box').fadeIn().addClass('active');
	});
	$('.header__area-search-box').on('click', function () {
		$(this).fadeIn().removeClass('active');
	});
	$('.header__area-search-box-icon').on('click', function () {
		$('.header__area-search-box').fadeOut().removeClass('active');
	});
	$('.header__area-search-box form').on('click', function (e) {
		e.stopPropagation();
	});
	/*==========  img-popup  ==========*/
	$('.img-popup').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true
		}
	});
	/*==========  video-popup  ==========*/
	$('.video-popup').magnificPopup({
		type: 'iframe'
	});
	/*==========  background  ==========*/
	$("[data-background]").each(function () {
		$(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
	})
	/*========== scroll to top  ==========*/
	$(window).on('scroll', function () {
		if ($(this).scrollTop() > 200) {
			$('.scroll-top').fadeIn(200);
		} else {
			$('.scroll-top').fadeOut(200);
		}
	});
	$('.scroll-top').on('click', function (event) {
		event.preventDefault();
		$('html, body').animate({
			scrollTop: 0
		}, 1000);
	});
	/*==========  theme loader  ==========*/
	$(window).on("load", function () {
		$(".theme-loader").fadeOut(500);
	});
	/*========== FAQ  ==========*/
	$(".faq__area-collapse-item-card-header").click(function () {
		if ($(this).next(".faq__area-collapse-item-card-header-content").hasClass("active")) {
			$(this).next(".faq__area-collapse-item-card-header-content").removeClass("active").slideUp()
			$(this).children("i").removeClass("flaticon-remove").addClass("flaticon-plus")
		} else {
			$(".faq__area-collapse-item-card .faq__area-collapse-item-card-header-content").removeClass("active").slideUp()
			$(".faq__area-collapse-item-card .faq__area-collapse-item-card-header i").removeClass("flaticon-remove").addClass("flaticon-plus");
			$(this).next(".faq__area-collapse-item-card-header-content").addClass("active").slideDown()
			$(this).children("i").removeClass("flaticon-plus").addClass("flaticon-remove")
		}
	});
	/*========== Progress Bar  ==========*/
	$('svg.circle-progress').each(function (index, value) {
		$(this).find($('circle.complete')).removeAttr('style');
	});
	$(window).on("scroll", function () {
		$('svg.circle-progress').each(function (index, value) {
			if ($(window).scrollTop() > $(this).offset().top - ($(window).height() * 0.75) && $(window).scrollTop() < $(this).offset().top + $(this).height() - ($(window).height() * 0.25)) {
				var percent = $(this).parent('.beorx-progress').data('counter');
				var radius = $(this).find($('circle.complete')).attr('r');
				var circumference = 2 * Math.PI * radius;
				var strokeDashOffset = circumference - ((percent * circumference) / 100);
				$(this).find($('circle.complete')).animate({
					'stroke-dashoffset': strokeDashOffset
				}, 1250);
			}
		});
	}).trigger('scroll');
	$('.beorx-progress').each(function () {
		$(this).append('<span class="counter">' + $(this).data('counter') + '<small>%</small></span>');
	});
})(jQuery);

// this function  use to View All bloggs
let bloggs;
function ViewAllbloggs() {
	fetch("https://enagancy.000webhostapp.com/api/blogs")
		.then(response => {
			return response.json()


		})
		.then(data => {

			bloggs = data
			// alert("sdkk")
			let trs = ``;
			for (var i = 0; i < bloggs.length; i++) {
				trs += `
				<div class="col-xl-4 col-lg-6">
					<div class="blog__area-item wow fadeInUp" data-wow-delay="1.2s">
						<div class="blog__area-item-image">
							<img src="assets/img/blog-6.jpg" alt="">
							<div class="blog__area-item-image-date">	<span><i class="flaticon-calendar"></i><a href="#">19 Feb, 2022</a></span>	
							</div>
						</div>
						<div class="blog__area-item-content">
							<div class="blog__area-item-content-meta">
								<ul>
									<li><i class="flaticon-user parag"></i><a href="#">Aaron Finch</a></li>
									<li><i class="flaticon-chat parag"></i><a href="#">Comments (2)</a></li>
								</ul>
							</div>
							<h3 class="mb-20 parag" style="font-size:large ;"><a href="blog-details.html">${bloggs[i].small_title}</a></h3>
							<div class="blog__area-item-content-btn parag" >	<a onclick="BlogDetils(${bloggs[i].id})" >Read More <i class="flaticon-right-arrow"></i></a>
							</div>
						</div>
					</div>
				</div>
			`;

			}

			document.getElementById("Alllblogs").innerHTML = trs;


		})
		.catch(error => {
			// alert(error)
		});
}
ViewAllbloggs()

// this function use to get single blog by id 
let singleBlog
function BlogDetils(id) {
	alert(id)
	fetch(`https://enagancy.000webhostapp.com/api/blog/${id}`)
		.then(response => {
			return response.json()


		})
		.then(data => {

			singleBlog = data
			// console.log(data)
			localStorage.setItem("singleBlog", JSON.stringify(singleBlog));

			window.location.assign("blog-details.html")


		})
		.catch(error => {
			// handle the error
		});
}
// this function use to  display Single Blog 
function displaySingleBlog() {
	let SingleBlog = JSON.parse(localStorage.getItem("singleBlog"));


	document.getElementById("bolgDetils").innerHTML = `
	<div class="col-xl-8 col-lg-8 lg-mb-30">
	<div class="blog__details-left">
		<div class="blog__details-left-image">
			<img src="${SingleBlog.img}" alt="">
		</div>
		<div class="blog__details-left-content mb-40">
			<div class="blog__details-left-content-meta mb-20">
				<ul>
					<li class="blog__details-left-content-date mr-40"><i class="flaticon-calendar"></i><a href="#">27 Feb, 2022</a></li>
					<li class="mr-30"><i class="flaticon-user"></i><a href="#">${SingleBlog.writer}</a></li>
				</ul>
			</div>
			<h3 class="mb-15 parag">${SingleBlog.title}</h3>
			<p class="mb-30 parag">${SingleBlog.description}</p>
			<p class="mb-20 parag">Mauris aliquam ante id eros viverra, sed convallis metus accumsan. Donec condimentum enim vel tristique tincidunt. Nullam lacus lorem, ultricies at dictum at, malesuada ut dolor. Pellentesque habitant morbi tristique senectus et netus et malesuada </p>

			<p class="parag">Donec scelerisque ex arcu. Cras commodo auctor tortor, quis euismod sapien tincidunt non. Pellentesque aliquam sem in tellus fringilla interdum. Integer nec ex magna. Ut urna urna, blandit quis mi ac, elementum molestie turpis. Integer mattis turpis id quam volutpat egestas. Nulla sagittis ligula a augue semper sagittis.</p>
		</div>
		
							
		</div>
	</div>	
</div>
	`




}
displaySingleBlog()


//  form_partner.html (Enter Now Into A Partnership With Us. We Provide A Great Role And Assistance To Our Partners)

function partenerForm() {
	// (A) GET FORM DATA
	var data = new FormData();
	data.append("name", document.getElementById("name").value);
	data.append("email", document.getElementById("email").value);
	data.append("phone", document.getElementById("phone").value);
	data.append("about", document.getElementById("about").value);
	data.append("company_name", document.getElementById("CompanyName").value);

	// (B) INIT FETCH POST
	fetch("https://enagancy.000webhostapp.com/api/partnership/regester", {
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
			if (response == `"regester Partnership is successfully"`) {

				// sucess register
				document.getElementById("AlertSucses").classList.add("d-block");
				document.getElementById("AlertSucses").innerHTML = `regester Partnership is successfully`
			} else {
				//  falid register 
				document.getElementById("alert").classList.add("d-block")
				if (response.includes("phone field")) {

					document.getElementById("alert").innerHTML = `phone field !`

				} else if (response.includes("email field")) {

					document.getElementById("alert").innerHTML = `email field !`

				} else if (response.includes("The name field is required.")) {

					document.getElementById("alert").innerHTML = `name field !`

				} else if ((response.includes("about"))) {

					document.getElementById("alert").innerHTML = `about required !`

				} else if ((response.includes("The company name field is required."))){
					document.getElementById("alert").innerHTML = `company name field  !`

				}
			}

			//   window.location.assign("course_view.html")
		})

		// (E) HANDLE ERRORS - OPTIONAL
		.catch((error) => { console.log(error); });

	// (F) PREVENT FORM SUBMIT
	return false;
}

// form_valanteer.HTML
function valanteerForm() {
	// (A) GET FORM DATA
	var data = new FormData();
	data.append("name", document.getElementById("name").value);
	data.append("email", document.getElementById("email").value);
	data.append("phone", document.getElementById("phone").value);
	data.append("about", document.getElementById("about").value);
	data.append("field_of_volunteering", document.getElementById("volunteering").value);
	data.append("age", document.getElementById("age").value);

	// (B) INIT FETCH POST
	fetch("https://enagancy.000webhostapp.com/api/valanteer/regester", {
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
			if (response == `"regester valanteer is successfully"`) {

				// sucess register
				document.getElementById("AlertSucses").classList.add("d-block");
				document.getElementById("AlertSucses").innerHTML = `regester Partnership is successfully`
			} else {
				//  falid register 
				document.getElementById("alert").classList.add("d-block")
				if (response.includes("phone field")) {

					document.getElementById("alert").innerHTML = `phone field !`

				} else if (response.includes("email field")) {

					document.getElementById("alert").innerHTML = `email field !`

				} else if (response.includes("The name field is required.")) {

					document.getElementById("alert").innerHTML = `name field !`

				} else if ((response.includes("about"))) {

					document.getElementById("alert").innerHTML = `about required !`

				} else if ((response.includes("volunteering"))){
					document.getElementById("alert").innerHTML = ` volunteering field is required.  !`

				} else if ((response.includes("age"))){
					document.getElementById("alert").innerHTML = ` The age must not be greater than 2 characters. !`
					
				}
			}

			//   window.location.assign("course_view.html")
		})

		// (E) HANDLE ERRORS - OPTIONAL
		.catch((error) => { console.log(error); });

	// (F) PREVENT FORM SUBMIT
	return false;
}


// form contuct 
function contactForm() {
	// (A) GET FORM DATA
	var data = new FormData();
	data.append("name", document.getElementById("name").value);
	data.append("email", document.getElementById("email").value);
	data.append("phone", document.getElementById("phone").value);
	data.append("subject", document.getElementById("subject").value);
	data.append("massage", document.getElementById("massage").value);

	// (B) INIT FETCH POST
	fetch("https://enagancy.000webhostapp.com/api/contact_us", {
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
			if (response ==`"We have received your request and will contact you as soon as possible"`) {

				// sucess register
				document.getElementById("AlertSucses").classList.add("d-block");
				document.getElementById("AlertSucses").innerHTML = `We contact you as soon as possible`
			} else {
				//  falid register 
				document.getElementById("alert").classList.add("d-block")
				if (response.includes("phone field")) {

					document.getElementById("alert").innerHTML = `phone field !`

				} else if (response.includes(" email field")) {

					document.getElementById("alert").innerHTML = `email field !`

				} else if (response.includes("subject field")) {

					document.getElementById("alert").innerHTML = `subject field !`

				} else if ((response.includes("massage field"))) {

					document.getElementById("alert").innerHTML = `massage field !`

				} else if (response.includes("name field")) {

					document.getElementById("alert").innerHTML = `name field !`

				}
			}

			//   window.location.assign("course_view.html")
		})

		// (E) HANDLE ERRORS - OPTIONAL
		.catch((error) => { console.log(error); });

	// (F) PREVENT FORM SUBMIT
	return false;
}












