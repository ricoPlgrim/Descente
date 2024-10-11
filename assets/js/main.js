
var _navSwiper;
var _kvSwiper;
var _mdPickSwiper;
var _rowSwiper;
var _lookBookSwiper;
var _cateGoryItems;
var _sections;
var _brandSwiper;
var _gnbBtn;
var _gnbBtnClose;
var _windowWidth; 

function create() {
  _cateGoryItems = $(".common_list").find("li");
  _sections = $(".aos-init");
  _gnbBtn = $( "header" ).find( ".gnb_btn" );
  _gnbBtnClose = $( ".gnb" ).find( ".btn_clsoe" );
};


function addEvent() {
  if ($("#wrap").hasClass("typeA")) {
    motionAInit();
  }

  $(".sections").on("scroll", function () {
    var scrollTop = $(this).scrollTop();
    scrollEvent(scrollTop);
  });

  resizeEvent( null );  
  $( window ).on( "resize", resizeEvent );

  $( ".intro_logo" ).on( "click", introMotionInit );

  _navSwiper = new Swiper(".nav_swiper", {
    slidesPerView: "auto",
  });

  function resizeEvent(){
    _windowWidth = $(window).width();
  }

  function motionAInit() {
    _mdPickSwiper = new Swiper(".mdpick_swiper", {
      slidesPerView: "auto",
    });
    _rowSwiper = new Swiper(".row_swiper", {
      slidesPerView: "auto",
    });

    _lookBookSwiper = new Swiper(".lookbook_swiper", {
      loop: false,
      loopAdditionalSlides: 1,
      touchRatio: 1,
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 1.1,
      coverflowEffect: {
        rotate: 0,
        stretch:0,
        depth: 67,
        modifier: 1.5,
        slideShadows: false,
        // rotate: 0,
        // // stretch: 20,
        // depth: 72,
        // // modifier: 1,
      },
      on: {
        slideChange: function () {
          var index = this.realIndex;
          gsap.killTweensOf("#lookbookLine");
          gsap.killTweensOf("#lookbookPath");

          var tl = gsap.timeline();
          var pathLength = document.getElementById("lookbookPath").getTotalLength();
          gsap.set("#lookbookPath", { strokeDasharray: pathLength, strokeDashoffset: pathLength });
          gsap.set("#lookbookLine", { height: 0 });
          tl.to("#lookbookLine", { duration: 1, height: 73, ease: "power1.inOut" })
            .to("#lookbookPath", { duration: 1, strokeDashoffset: pathLength * 2, ease: "power1.inOut" }, 0);
        },
        init: function () {
          gsap.killTweensOf("#lookbookLine");
          gsap.killTweensOf("#lookbookPath");

          var tl = gsap.timeline();
          var pathLength = document.getElementById("lookbookPath").getTotalLength();
          gsap.set("#lookbookPath", { strokeDasharray: pathLength, strokeDashoffset: pathLength });
          gsap.set("#lookbookLine", { height: 0 });
          tl.to("#lookbookLine", { duration: 1, height: 73, ease: "power1.inOut" })
            .to("#lookbookPath", { duration: 1, strokeDashoffset: pathLength * 2, ease: "power1.inOut" }, 0);
        }
      },

    });

    _cateGoryItems.on("click", cateGoryItemsClick);

  }

  function cateGoryItemsClick() {
    var index = $(this).index();
    var dataTypeCheck = $(this).data("type");
    $(this).addClass("on").siblings().removeClass("on");
    switch (dataTypeCheck) {
      case "popular":
        $(".tabcontent").eq(index).addClass("on").siblings().removeClass("on");
        break;
      case "trend":
        $(".trend_card_wrap").eq(index).addClass("on").siblings().removeClass("on");
        break;
    }

  }
  _gnbBtn.on( "click", gnbOpen );
  _gnbBtnClose.on( "click", gnbClose );
  $(window).on("keydown", function(event) {
    keydownEvent(event);
  });

  // 단계를 변경하는 함수
  function changeStep(stepIndex) {
    $( ".sections" ).scrollTop(0);
    $( ".main" ).removeClass( "on" );
    $(".step_box").eq(stepIndex).addClass("on").siblings().removeClass("on");
    $(".step_box").eq(stepIndex).find( ".sections" ).css( "opacity", 1 );
  }

  // 클릭 이벤트 핸들러 등록
  $(".doc-contents > ul > li").on("click", function() {
    var index = $(this).index();
    switch (index) {
      case 0:
        changeStep(1);
        if (_brandSwiper !== undefined && _brandSwiper !== null) {
          _brandSwiper.destroy(); 
        }
        _brandSwiper = new Swiper(".brand_swiper", {
          slidesPerView: "auto",
        });
        break;
      case 1:
        changeStep(0);
        kvSwiperInit();
        break;
      case 2:
        changeStep(2);
        break;
    }
  });

  $(".btn_page-link").on("click", function() {
    changeStep(3);
    $(".gnb").removeClass("open");
  });

  $(".btn_shop_view").on("click", function() {
    changeStep(4);
  });

  $(".btn_page-brand").on("click", function() {
    changeStep(5);
    $(".gnb").removeClass("open");
  });
  $(".btn_page-brandIntro").on("click", function() {
    changeStep(6);
    $(".gnb").removeClass("open");
  });

  $(".btn_page-brandHome").on("click", function() {
    changeStep(5);
  });

  $(".btn_prev").on("click", function() {
    changeStep(0);
    kvSwiperInit();
    $( ".doc-nav" ).css({ "opacity": 1, "z-index":9999999});
  });

  $( ".btn_home" ).on( "click", function(){
    changeStep(0);
    kvSwiperInit();
    $( ".doc-nav" ).css({ "opacity": 1, "z-index":9999999});
  })
}


//d버튼 클릭 시 로컬스토리 값 삭제
function keydownEvent($e){
  if( $e.which  == "68"){
    localStorage.removeItem("splashImage");
    location.reload();
  }
}
//kv 비주얼영역 스와이퍼
function kvSwiperInit(){
  _kvSwiper = new Swiper(".kvSwiper", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
    },
    on: {
      slideChange: function () {
        var index = this.realIndex;
        gsap.killTweensOf("#animated-rect");
        gsap.killTweensOf("#path-line");

        var tl = gsap.timeline();
        var pathLength = document.getElementById("path-line").getTotalLength();
        gsap.set("#path-line", { strokeDasharray: pathLength, strokeDashoffset: pathLength });
        gsap.set("#animated-rect", { height: 0 });
        tl.to("#animated-rect", { duration: 1, height: 239, ease: "power1.inOut" })
          .to("#path-line", { duration: 1, strokeDashoffset: 0, ease: "power1.inOut" }, 0);
      },
    },
  });
}

//gnb Open
function gnbOpen(){
  $( ".gnb" ).addClass( "open" );
  $( ".doc-nav" ).css( "z-index", 1 );
}

//gnb Close
function gnbClose(){
  $( ".gnb" ).removeClass( "open" );
  $( ".doc-nav" ).css( "z-index", 9999999 );
}

//scrollEvent
var executedFunctions = [];  

function scrollEvent(scrollTop){
  var boxHeight = $(".sections").height();
  var scrollMiddle = scrollTop + boxHeight / 1.5;
  $('.aos-init').each(function() {
      var $section = $(this);
      var targetTop = $section.offset().top - $('.scrollbox').offset().top;
      var targetBottom = targetTop + ($section.outerHeight() / 4);
      if (targetTop <= scrollMiddle && targetBottom >= scrollMiddle) {
          var targetId = $(this).attr('id');
          if (!executedFunctions.includes(targetId)) {
            gsap.to($section, 0.5, { opacity: 1, y: 0, ease: Power0.easeOut });
            switch (targetId) {
              case 'season':
                  seasonShow();
                  break;
              default:
                  break;
            }
            executedFunctions.push(targetId); 
          }
      }
  });

  //header
  if( $("header" ).hasClass( "main" )){
    if( scrollTop >= 400){
      $( "header" ).addClass( "on" );
    }else{
      $( "header" ).removeClass( "on" );
    }
  }
}


var isMotion = false;
//season animation
function seasonShow() {
  if( isMotion) return;
  gsap.killTweensOf("#seasonLine");
  gsap.killTweensOf("#seasonPath");

  isMotion = true;
  var tween = 0.75;
  var tl = gsap.timeline();
  var pathLength = document.getElementById("seasonPath").getTotalLength();
  var categoryItems = $(".season .category_list").find(".items");
  var seasonItems = $(".season .season_list").find(".items");
  gsap.set("#seasonPath", { strokeDasharray: pathLength, strokeDashoffset: pathLength, opacity: 0 });
  gsap.set("#seasonLine", { height: 0 });
  setTimeout( function(){
    $( "#season .bg" ).addClass( "on" );
  },180);
  tl.to("#seasonLine", { duration: 1, height: 73, ease: "power1.inOut"})
    .to("#seasonPath", { duration: 1, opacity: 1, strokeDashoffset: 0, ease: "power1.inOut" }, 0);
  gsap.to(".text_title", tween, { top: 0, ease: Expo.esaeInOut, delay: .3 });
  $.each(categoryItems, function ($index, $ele) {
    gsap.set($ele,  {delay:30 });
    gsap.to($ele, tween, { top: 0, ease: Expo.easeOut, delay: .5 * $index });
  });
  $.each(seasonItems, function ($index, $ele) {
    gsap.set($ele, { delay: 15 });
    gsap.to($ele, tween, { top: 0, ease: Expo.easeOut, delay: .75 * $index });
  });

  gsap.to(".sub_text", 0.35, { top: 0, ease: Expo.esaeInOut, delay: .75 });
}


//인트로 화면 체크
var splashCheck = true;

function introMotionInit() {
  if (splashCheck) {
    $( "#intro" ).css( "display", "block" );
    var introLogo = $(".intro_logo");
    introLogo.find( ".img" ).remove();
    var svgLogoStr = `<object class="header-logo" data="./assets/images/logo_Ani.svg"></object>`;
    introLogo.append( svgLogoStr );

    if( introLogo.find( $( ".header-logo" ))){
      var tl = gsap.timeline();

      tl.to(introLogo, 0.75, { left: "165px", delay: 2.5, ease: Expo.esaeInOut });
      tl.to(introLogo, 0.75, { left: "14px", top: "79px",   width: "110px",  ease: Expo.esaeInOut });


      tl.to($("#intro"), 0.1, { opacity: 0, ease: Power0.esaeIn }),
      tl.add(function () {
          $("#wrap").addClass("active");
          $( "#intro" ).remove();
          // $( "#intro" ).css( "display", "none" );
          localStorage.setItem("splashImage", splashCheck); 
          $( "#wrap" ).removeClass( "isLoading" );
          $( "#wrap" ).find( ".sections" ).css( "opacity", 1 );
          $( ".doc-nav" ).css( "z-index", 9999999 );
          kvSwiperInit();
      }, "+=.01");
    }
  }
}


//함수호출
function init() {
  create();
  addEvent(); 
  var retrievedValue = localStorage.getItem("splashImage"); 
  if(retrievedValue){
    showMainContent();
    kvSwiperInit();
  }else{
    showSplashScreen();
  }

  
}

//로딩 분기처리
function showMainContent() {
  $("#wrap").addClass("active");
  $("#wrap").removeClass("isLoading");
  $("#intro").hide();
  $(".sections").css("opacity", 1);
  $("header, .doc-nav").css("opacity", 1);
  $(".doc-nav").css("z-index", 9999999);
}

function showSplashScreen() {
  $("#intro").show();
}



$(document).ready(function () {
  init();
  $( ".mockup").css( {
    opacity: 1,
    zoom: '80%'
  });
  $( "#wrap").css( "opacity", 1 );

})

