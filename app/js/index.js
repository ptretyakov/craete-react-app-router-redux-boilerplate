import './statistics';
import './sprite.svg';
import './transition';
import './collapse';
import './../vendor/slick.min';
import './../vendor/jquery.onepage-scroll';
import { API } from './api';
import { UserInfo } from './userinfo';
import './lazyload';
require("./../less/styles.less");

var userdataReq  = API.getInfo();
var docReady = $.Deferred();

$(function() {
    docReady.resolve();
});

$.when(userdataReq, docReady)
    .done(function (jqXHR) {
        initDOM(jqXHR[0].data.jsonBody);
    })
    .fail(function (jqXHR) {
        $.when(docReady)
            .done(function () {
                initDOM(null);
            });
    });

$.fn.extend({
    animateCss: function (animationName, callback) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
            if (callback) {
                callback();
            }
        });
        return this;
    }
});

function initDOM(userdata) {
    if (userdata) {
        var template = require("../templates/page_template.html");
        $('.wrapper').html(UserInfo.render(template, userdata));
    } else {
        ga('set', 'page', '/error');
        ga('send', 'pageview');

        var template = require("../templates/page_error_template.html");
        $('.wrapper').html( template() );
    }

    var images = Array.prototype.slice.call(document.querySelectorAll(".scene-bottom__img")).reverse();
    // var scenes = Array.prototype.slice.call(document.querySelectorAll(".scene")).reverse();

    lazyload(images);

    function loadNextImage() {
        var image = images.pop();
        var src = $(image).attr('src');
        var dataSrc = $(image).attr('data-src');

        if (dataSrc && src !== dataSrc) {
            $(image).attr('src', dataSrc);
            setTimeout(function(){
                loadNextImage()
            },500);
        } else if (images.length > 0) {
            loadNextImage();
        }
    }
    // force load all after timeout
    setTimeout(loadNextImage, 1000);

    if (false) {
        // 22.12: disable alt demo
        $('body').on('mousedown touchstart', '.scene-content__val', function (e) {
            var scene = $(".scene--largest-purchase").get(0);

            if(/.*_alt.*/.test(scene.style.backgroundImage)) {
                scene.style.backgroundImage = scene.style.backgroundImage.replace("_alt.png", ".png");
            } else {
                scene.style.backgroundImage = scene.style.backgroundImage.replace(".png", "_alt.png");
            }
            $(".scene--largest-purchase .scene-bottom__img").each(function(){
                var img = $(this);
                if(/.*_alt.*/.test(img.attr("src"))) {
                    img.attr("src", img.attr("src").replace("_alt.png", ".png"));
                } else {
                    img.attr("src", img.attr("src").replace(".png", "_alt.png"));
                }
            });
            e.stopPropagation();
            e.preventDefault();
        });
    }
    $(window).scroll(function() {


        var scroll = $(window).scrollTop();
        var vh = $(window).height();

        if (scroll >= 10) {
            $("body,html").animate({
               // scrollTop: vh
            }, 800);
        }

    });

    $('.scene-slider').slick({
        dots: false,
        infinite: false,
        arrows: true,
        speed: 800,
        slidesToShow: 1,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    dots: true
                }
            }
        ]
    });
    $('.countries-slider').slick({
        dots: false,
        infinite: false,
        arrows: true,
        speed: 800,
        slidesToShow: 1,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    dots: true
                }
            }
        ]
    });

// On before slide change
    $('.scene-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        com.rooxteam.statistic.client.logOperation("slide.change", com.rooxteam.statistic.getContext({ "slider": "costs", "linkId" : window.currentLink, "nextSlide": nextSlide}));
    });

    $('.countries-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        com.rooxteam.statistic.client.logOperation("slide.change", com.rooxteam.statistic.getContext({ "slider": "countries", "linkId" : window.currentLink, "nextSlide": nextSlide}));
    });

    var changeCircle = function (curCircle, percent) {
        if (isNaN(percent)) {
            percent = 100;
            console.log('100');
        }
        else{
            var r = curCircle.attr('r');
            var c = Math.PI*(r*2);

            if (percent < 0) { percent = 0;}
            if (percent > 99) {percent = 100;}

            var pct = ((100-percent)/100)*c;

            curCircle.css({ strokeDashoffset: pct});

        }
    }


    if ($(window).width() > 1200){
        $('.countries-slider-item__title').each(function () {
            let simbolCount = $(this).text().length;
            if ((simbolCount > 7) && (simbolCount < 11)) {
                $(this).css({'font-size' : '110px', 'line-height' : '110px'});
            }
            if ((simbolCount > 10) && (simbolCount < 20)) {
                $(this).css({'font-size' : '80px', 'line-height' : '80px'});
            }
            if (simbolCount > 20) {
                $(this).css({'font-size' : '60px', 'line-height' : '60px'});
            }
        });
    }

    if (($(window).width() > 1024) && ($(window).width() < 1200)){
        $('.countries-slider-item__title').each(function () {
            let simbolCount = $(this).text().length;
            if ((simbolCount > 7) && (simbolCount < 11)) {
                $(this).css({'font-size' : '90px', 'line-height' : '90px'});
            }
            if ((simbolCount > 10) && (simbolCount < 14)) {
                $(this).css({'font-size' : '70px', 'line-height' : '70px'});
            }
            if ((simbolCount > 13) && (simbolCount < 20)) {
                $(this).css({'font-size' : '60px', 'line-height' : '60px'});
            }
            if (simbolCount > 20) {
                $(this).css({'font-size' : '60px', 'line-height' : '60px'});
            }

        });
    }
    if (($(window).width() > 480) && ($(window).width() < 1024)){
        $('.countries-slider-item__title').each(function () {
            let simbolCount = $(this).text().length;
            if ((simbolCount > 7) && (simbolCount < 13)) {
                $(this).css({'font-size' : '60px', 'line-height' : '60px'});
            }
            if (simbolCount > 12)  {
                $(this).css({'font-size' : '50px', 'line-height' : '50px'});
            }

        });
    }

    if ($('.countries-slider').hasClass('slick-slider') && $(window).width() > 480) {

        var slider = $('.countries-slider');
        var slideCount = slider.slick("getSlick").slideCount;
        if (slideCount > 1) {
            var step = Math.floor(100 / slideCount);
            var curArrow = slider.find('.slick-next');
            curArrow.attr('data-pct', step);
            var circleStr = '<svg id="countries-svg" class="progress-svg animate" width="54" height="54" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg">' +
                '<circle id="countries-bar" class="progress-bar" cx="27" cy="27" r="24" stroke-dasharray="150.796416"  stroke-dashoffset="0" fill="transparent" stroke="white"/>' +
                '</svg>';
            curArrow.append(circleStr);
            var $circle = $('#countries-svg #countries-bar');
            changeCircle($circle, 0);
        }
    }

    $('.countries-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    });

    if ($('.scene-slider').hasClass('slick-slider') && $(window).width() > 480) {

        var slider = $('.scene-slider');
        var slideCount = slider.slick("getSlick").slideCount;
        if (slideCount > 1) {
            var step = Math.floor(100 / slideCount);
            var curArrow = slider.find('.slick-next');
            curArrow.attr('data-pct', step);
            var circleStr = '<svg id="scene-svg" class="progress-svg animate" width="54" height="54" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg">' +
                '<circle id="scene-bar" class="progress-bar" cx="27" cy="27" r="24" stroke-dasharray="150.796416"  stroke-dashoffset="0" fill="transparent" stroke="white"/>' +
                '</svg>';
            curArrow.append(circleStr);
            var $circle = $('#scene-svg #scene-bar');
            changeCircle($circle, 0);
        }
    }

    $('.scene-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    });

    $('.cost__diagram').each(function () {
        var percent = $(this).data('percent');
        var $circle = $(this).find('.diagram-svg .diagram-bar');
        changeCircle($circle, percent);
    });

    $('[data-action]').on('click', function (e) {
        var action = $(this).data('action');
        switch (action) {
            case 'top-scroll' :
                e.preventDefault();
                if ($.isFunction($(".wrapper").moveDown)) {
                    $(".wrapper").moveDown();
                } else {
                    $("body,html").animate({
                        scrollTop: $('#top-scroll').offset().top
                    }, 800);
                }
                break;
            case 'vote-yes' :
            case 'vote-no' :
                e.preventDefault();
                $('.btn-container-bottom__content').fadeOut(200);
                $('.btn-container-bottom').addClass('result');

                var result = (action == 'vote-yes' ? 1 : 0);
                API.sendVote(result);

                setTimeout(function () {
                    $('.btn-container-bottom__content.result').fadeIn();
                }, 200);
                break;
            default: break;

        }
    });

    if ($(window).width()>750) {
        $(".wrapper").onepage_scroll({
            sectionContainer: "section",
            easing: "ease",

            animationTime: 1000,
            pagination: true,
            updateURL: false,
            afterMove: function (index) {
                com.rooxteam.statistic.client.logOperation("scroll.page", com.rooxteam.statistic.getContext({ "index": index, "linkId" : window.currentLink}));
            },
            loop: true,
            keyboard: true,
            responsiveFallback: false,
            direction: "vertical"
        });
    } else {
        // Returns a function, that, as long as it continues to be invoked, will not
        // be triggered. The function will be called after it stops being called for
        // N milliseconds. If `immediate` is passed, trigger the function on the
        // leading edge, instead of the trailing.
        function debounce(func, wait, immediate) {
            var timeout;
            return function() {
                var context = this, args = arguments;
                var later = function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        };
        $(window).scroll(debounce(function(ev) {
            var lastVisibleIndex = false;
            $("section").each(function(){

                var elem = this;
                var docViewTop = $(window).scrollTop();
                var docViewBottom = docViewTop + $(window).height();

                var elemTop = $(elem).offset().top;
                var elemBottom = elemTop + $(elem).height();

                if (((elemBottom - 300) <= docViewBottom) && (elemTop >= docViewTop)){
                    lastVisibleIndex = $("section").index(elem);
                }
            });
            if (lastVisibleIndex) {
                com.rooxteam.statistic.client.logOperation("scroll.mobile", com.rooxteam.statistic.getContext({ "index": lastVisibleIndex, "linkId" : window.currentLink}));
            }
        }, 500));
    }



    /*** Анимация слайдера с посещенными странами ***/
    var animateCountrySlider = function () {
        if ($('.scene.active').find('.countries-slider').length > 0) {
            var $circle = $('#countries-svg #countries-bar');

            if (!$('.countries-slider').hasClass('active')) {

                $('.countries-slider').addClass('active');

                setTimeout(function () {
                    $('#countries-svg').addClass('animate');
                    changeCircle($circle, 100);
                }, 100);

                var slideCount = $('.countries-slider').slick("getSlick").slideCount;

                if (slideCount > 1) {
                 for (let i=0; i < slideCount-1; i++) {
                     let time = 5100 * (i+1);
                         setTimeout(function () {
                             if (!$('#countries-svg').hasClass('no-animate')) {
                                 $('#countries-svg').addClass('animate');
                                 changeCircle($circle, 100);
                             } else {
                                 return;
                             }
                         }, time - 5000);
                         setTimeout(function () {
                             if (!$('#countries-svg').hasClass('no-animate')) {
                                 $('.countries-slider').slick('slickNext');
                             } else {
                                 return;
                             }
                         }, time);
                         setTimeout(function () {
                             if (!$('#countries-svg').hasClass('no-animate')) {
                             $('#countries-svg').removeClass('animate');
                             changeCircle($circle, 0);
                             } else {
                                 return;
                             }
                         }, time + 50);
                 }
            }
        }
    }
    else {

        }
    }

    var animateSceneSlider = function () {

        if ($('.scene.active').find('.scene-slider').length > 0) {
            var $circle = $('#scene-svg #scene-bar');

            if (!$('.scene-slider').hasClass('active')) {

                $('.scene-slider').addClass('active');

                //анимация заполнения полоски
                setTimeout(function () {
                    $('#scene-svg').addClass('animate');
                    changeCircle($circle, 100);
                }, 100);

                var slideCount = $('.scene-slider').slick("getSlick").slideCount;

                if (slideCount > 1) {
                    for (let i=0; i < slideCount-1; i++) {
                        let time = 5100 * (i+1);
                        setTimeout(function () {
                            if (!$('#scene-svg').hasClass('no-animate')) {
                                $('#scene-svg').addClass('animate');
                                changeCircle($circle, 100);
                            } else {
                                return;
                            }
                        }, time - 5000);
                        setTimeout(function () {
                            if (!$('#scene-svg').hasClass('no-animate')) {
                                $('.scene-slider').slick('slickNext');
                            } else {
                                return;
                            }
                        }, time);
                        setTimeout(function () {
                            if (!$('#scene-svg').hasClass('no-animate')) {
                                $('#scene-svg').removeClass('animate');
                                changeCircle($circle, 0);
                            } else {
                                return;
                            }
                        }, time + 50);
                    }
                }
            }
        }

        if ($('.scene.active').find('.scene-slider').length > 0) {
            var $circle = $('#scene-svg #scene-bar');

            if (!$('.scene-slider').hasClass('active')) {

                $('.scene-slider').addClass('active');

                setTimeout(function () {
                    $('#scene-svg').addClass('animate');

                    changeCircle($circle, 100);
                }, 100);
                setTimeout(function () {
                    $('.scene-slider').slick('slickPlay');
                }, 800);
                setTimeout(function () {
                    $('#scene-svg').removeClass('animate');
                    changeCircle($circle, 0);
                }, 5100);
            }
        }
    }

    $(document).bind('mousewheel  DOMMouseScroll', function (e) {
       animateCountrySlider();
       animateSceneSlider();

        $('.scene.active').find('.content-animation').addClass('animated');

    });

    $(".onepage-pagination li a").click(function (){
        animateCountrySlider();
        animateSceneSlider();
        $('.scene.active').find('.content-animation').addClass('animated');
    });

    $('.scene-slider .slick-arrow').click(function () {
        $('#scene-svg').addClass('no-animate');
        $('#scene-svg').removeClass('animate');
    });
    $('.countries-slider .slick-arrow').click(function () {
        $('#countries-svg').addClass('no-animate');
        $('#countries-svg').removeClass('animate');
    });

    $('.scene-slider').on('swipe', function(event, slick, direction){
        $('#scene-svg').addClass('no-animate');
        $('#scene-svg').removeClass('animate');
    });

    $('.countries-slider').on('swipe', function(event, slick, direction){
        $('#countries-svg').addClass('no-animate');
        $('#countries-svg').removeClass('animate');
    });

    $(document).ready(function () {
        //$('.scene.active').find('.content-animation').addClass('animated');
    });
}