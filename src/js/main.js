const App = {
    SetBackground: () => {
        $('[setBackground]').each(function () {
            var background = $(this).attr('setBackground')
            $(this).css({
                "background-image": "url(" + background + ")",
                "background-size": "cover",
                "background-position": "center center"
            })
        })
        $('[setBackgroundRepeat]').each(function () {
            var background = $(this).attr('setBackgroundRepeat')
            $(this).css({
                "background-image": "url(" + background + ")",
                "background-repeat": "repeat"
            })
        })
    },
    EqualHeightElement: el => {
        let height = 0;
        let thisHeight = 0;
        $(el).each(function () {
            thisHeight = $(this).height();
            if (thisHeight > height) {
                height = thisHeight;
            }
        });
        $(el).height(height)
    },
    InitLazyLoad: () => {
        return new LazyLoad({
            elements_selector: ".lazy"
        });
    },
    ScrollTo: y => {
        $('html, body').animate({
            scrollTop: y
        }, 1000)
    },
    Init: () => {
        App.SetBackground()
        App.InitLazyLoad()
    }
}

function InitSlider() {
    new Swiper(".sgspority-banner .swiper-container", {
        speed: 1e3,
        slidesPerView: 1,
        // autoplay: {
        //     delay: 5000,
        // },
    });
    new Swiper(".partners__slider .swiper-container", {
        speed: 1e3,
        slidesPerView: 5,
        slidesPerColumn: 1,
        spaceBetween: 50,
        navigation: {
            clickable: !0,
            nextEl: ".partners__slider .swiper-next",
            prevEl: ".partners__slider .swiper-prev",
        },
        breakpoints: {
            992: {
                slidesPerView: 2
            },
            768: {
                slidesPerView: 1
            },
        },
    });
}
$(document).ready(function () {
    App.Init()
    InitSlider()
    mappingInit()
    toggleMenu()
    Headers()
    animationScroll()
})

function mappingInit() {
    var moveNav = new MappingListener({
        selector: ".menu",
        mobileWrapper: ".mobile-inner-nav",
        mobileMethod: "appendTo",
        desktopWrapper: ".header-wrapper .logo",
        desktopMethod: "insertAfter",
        breakpoint: 1200,
    }).watch();
}

function toggleMenu() {
    $(".toggle-btn").on("click", function () {
        $(".toggle-btn").toggleClass("active");
        $(".mobile-inner-nav").toggleClass("active");
        $(".back-drop").toggleClass("active");
        $("body").toggleClass("overflow");
    });
    $(".back-drop").on("click", function () {
        $(".toggle-btn").removeClass("active");
        $(".mobile-inner-nav").removeClass("active");
        $(".back-drop").removeClass("active");
    });
}
$(document).on("click", ".dropdown-icon", function () {
    $(this).toggleClass("active").next().slideToggle();
});

function Headers() {
    $(window).scroll(function () {
        if ($(window).scrollTop() >= 200) {
            $(".header").addClass("fixed");
        } else {
            $(".header").removeClass("fixed");
        }
    });
}

function animationScroll() {
    $(window).on("scroll", function e() {
            var i = $(window).scrollTop() + $(window).height(),
                t = $(".animatable");
            0 == t.length && $(window).off("scroll", e),
                t.each(function (e) {
                    var t = $(this);
                    t.offset().top + t.height() - 20 < i &&
                        t.removeClass("animatable").addClass("animated");
                });
        }),
        $(window).trigger("scroll");
}