//HEADER NAVIGATION
$(document).ready(function () {
	var ulNav = ".nav-list"
		, openNav = "active";
	$('.toggle-menu').click(function (e) {
			e.preventDefault();
			if ($(ulNav).hasClass(openNav)) {
				$(ulNav).toggleClass(openNav);
			}
			else {
				$(ulNav).addClass(openNav);
			}
		})
		//SLIDER
	$(document).ready(function () {
		// Activate Carousel
		$("#myCarousel").carousel();
		// Enable Carousel Indicators
		$(".item1").click(function () {
			$("#myCarousel").carousel(0);
		});
		$(".item2").click(function () {
			$("#myCarousel").carousel(1);
		});
		$(".item3").click(function () {
			$("#myCarousel").carousel(2);
		});
		$(".item4").click(function () {
			$("#myCarousel").carousel(3);
		});
		// Enable Carousel Controls
		$(".left").click(function () {
			$("#myCarousel").carousel("prev");
		});
		$(".right").click(function () {
			$("#myCarousel").carousel("next");
		});
	});
	//CONTACT FORM
	const form = document.querySelector('#contactForm');
	const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
	//wyłączamy domyślną walidację
	form.setAttribute('novalidate', true);
	const displayFieldError = function (elem) {
		const fieldRow = elem.closest('.form-row');
		const fieldError = fieldRow.querySelector('.field-error');
		if (fieldError === null) {
			const errorText = elem.dataset.error;
			const divError = document.createElement('div');
			divError.classList.add('field-error');
			divError.innerText = errorText;
			fieldRow.appendChild(divError);
		}
	};
	const hideFieldError = function (elem) {
		const fieldRow = elem.closest('.form-row');
		const fieldError = fieldRow.querySelector('.field-error');
		if (fieldError !== null) {
			fieldError.remove();
		}
	};
    [...inputs].forEach(elem => {
		elem.addEventListener('input', function () {
			if (!this.checkValidity()) {
				this.classList.add('error');
			}
			else {
				this.classList.remove('error');
				hideFieldError(this);
			}
		});
		if (elem.type === "checkbox") {
			elem.addEventListener('click', function () {
				const formRow = this.closest('.form-row');
				if (this.checked) {
					this.classList.remove('error');
					hideFieldError(this);
				}
				else {
					this.classList.add('error');
				}
			});
		}
	});
	const checkFieldsErrors = function (elements) {
		//ustawiamy zmienną na true. Następnie robimy pętlę po wszystkich polach
		//jeżeli któreś z pól jest błędne, przełączamy zmienną na false.
		let fieldsAreValid = true;
        [...elements].forEach(elem => {
			if (elem.checkValidity()) {
				hideFieldError(elem);
				elem.classList.remove('error');
			}
			else {
				displayFieldError(elem);
				elem.classList.add('error');
				fieldsAreValid = false;
			}
		});
		return fieldsAreValid;
	};
	form.addEventListener('submit', function (e) {
		e.preventDefault();
		//jeżeli wszystkie pola są poprawne...
		if (checkFieldsErrors(inputs)) {
			const elements = form.querySelectorAll('input:not(:disabled), textarea:not(:disabled), select:not(:disabled)');
			const dataToSend = new FormData();
            [...elements].forEach(el => dataToSend.append(el.name, el.value));
			const url = form.getAttribute('action');
			const method = form.getAttribute('method');
			const submit = form.querySelector('[type="submit"]');
			submit.disabled = true;
			submit.classList.add('element-is-busy');
			fetch(url, {
				method: method.toUpperCase()
				, body: dataToSend
			}).then(ret => ret.json()).then(ret => {
				submit.disabled = false;
				submit.classList.remove('element-is-busy');
				if (ret.errors) {
					ret.errors.map(function (el) {
						return '[name="' + el + '"]'
					});
					const selector = ret.errors.join(',');
					checkFieldsErrors(form.querySelectorAll(sekector));
				}
				else {
					if (ret.status === 'ok') {
						//wyświetlamy komunikat powodzenia, cieszymy sie
						const div = document.createElement('div');
						div.classList.add('form-send-success');
						div.innerText = 'Wysłanie wiadomości się nie powiodło';
						form.parentElement.insertBefore(div, form);
						div.innerHTML = '<strong>Wiadomość została wysłana</strong><span>Dziękujemy za kontakt. Postaramy się odpowiedzieć jak najszybciej</span>';
						form.remove();
					}
					if (ret.status === 'error') {
						//komunikat błędu, niepowodzenia
						const div = document.createElement('div');
						div.classList.add('send-error');
						div.innerText = 'Wysłanie wiadomości się nie powiodło';
					}
				}
			}).catch(_ => {
				submit.disabled = false;
				submit.classList.remove('element-is-busy');
			});
		}
	});
	//OUR TEAM
	var coll = document.getElementsByClassName("button-collapsible");
	var i;
	for (i = 0; i < coll.length; i++) {
		coll[i].addEventListener("click", function () {
			this.classList.toggle("active");
			var content = this.nextElementSibling;
			if (content.style.display === "block") {
				content.style.display = "none";
			}
			else {
				content.style.display = "block";
			}
		});
	}
	//TABS	
	$(function () {
		//dla każdego kontenera z treścią tabów dodajemy klasę js -> patrz dalej
		$('.tabs-container').addClass('js');
		$('.tabs').each(function () {
			const $a = $(this).find('a'); //pobieram wszystkie linki-zakładki
			//po kliknięciu na link...
			$a.on('click', function (e) {
				//podstawiamy pod zmienną $this kliknięty link
				const $this = $(this);
				//pobieramy href klikniętego linka
				const href = $this.attr('href');
				//pobieramy treść na którą wskazuje link
				const $target = $(href);
				//jeżeli ta treść w ogóle istnieje...
				if ($target.length) {
					e.preventDefault(); //przerwij domyślną czynność jeżeli istnieje zawartość zakładki - inaczej niech dziala jak link
					//usuwamy z sąsiednich linków klasę active
					$this.siblings('a').removeClass('active');
					//klikniętemu linkowi dajemy klasę active
					$this.addClass('active');
					//podobne działanie robimy dla treści tabów
					$target.siblings('.tab-content').removeClass('active');
					$target.addClass('active');
				}
			});
		});
	});
});