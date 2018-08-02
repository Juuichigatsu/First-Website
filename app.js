//HEADER NAVIGATION
$(document).ready(function () {
    var ulNav = ".nav-list"
        , openNav = "active";
    $('.toggle-menu').click(function (e) {
            e.preventDefault();
            if ($(ulNav).hasClass(openNav)) {
                $(ulNav).removeClass(openNav);
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
    //gallery
    //Options
    var showNav = 1;
    var keyboardNav = 1;
    var showCaption = 1;
    //Create overlay items
    var $overlay = $('<div id="overlay"></div>');
    var $image = $('<img>');
    var $holder = $('<div class="holder"></div>');
    var $caption = $('<p></p>');
    var $nav = $('<div class="nav"><a id="close" nohref><span>&times;</span></a></nav>');
    var glength = $('.imageGallery').length;
    var imageIndex, imageLocation, captionText, allowKeyboard;
    //Add overlay items to DOM
    $('#overlay img').before('');
    $holder.append($image);
    $holder.append($nav);
    if (showCaption) {
        $holder.append($caption);
    }
    if (!showNav) {
        $nav.hide();
    }
    $overlay.append($holder);
    $("body").append($overlay);
    //Click image link
    $('.imageGallery a').click(function (event) {
        event.preventDefault();
        imageLocation = $(this).attr("href");
        // index of clicked item
        imageIndex = $('.imageGallery a').index(this) + 1;
        //Image focused on
        $image.attr("src", imageLocation);
        //Add and remove active class on link
        $(this).addClass('active');
        $('.imageGallery a').not(this).removeClass('active');
        //Show alt attribute as caption
        captionText = $(this).children("img").attr("alt");
        $caption.text(captionText);
        allowKeyboard = 1;
        $overlay.show();
    });
    //Close overlay
    $image.click(function () {
        allowKeyboard = 0;
        $($overlay).hide();
    });
    $overlay.click(function (e) {
        if (e.target != this) return;
        $(this).hide();
    });
    $('#close').click(function () {
        $($overlay).hide();
    });
});