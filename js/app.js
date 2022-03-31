var decal = 0;
var screenwidth = 0;
var totalwidth = 0;
var timeOutResize;
$(document).ready(function () {
  console.log(document.querySelector(".col-products").getBoundingClientRect().width)
  reinitDecal();
  $('#nav-icon2').click(function () {
    $(this).toggleClass('open');
    $("#taglist1").toggleClass("showresbar");
  });
  $('#roteratag').click(function () {
    $("#nav-icon2").toggleClass('open');
    $("#taglist1").toggleClass("showresbar");
  });
  $('#roteratag1').click(function () {
    $("#nav-icon2").toggleClass('open');
    $("#taglist1").toggleClass("showresbar");
  });
  $('#roteratag2').click(function () {
    $("#nav-icon2").toggleClass('open');
    $("#taglist1").toggleClass("showresbar");
  });
  $('#roteratag3').click(function () {
    $("#nav-icon2").toggleClass('open');
    $("#taglist1").toggleClass("showresbar");
  });
  $('.product-selection button').click(function () {
    $('.product-selection button').removeClass('is-active');
    $(this).addClass('is-active');
    // console.log("------------------------");
    // if($(this).attr('name') === 'lcdlcd'){
    //   $('.cell-lcd').width("950px");
    // }else{
    //   $('.cell-lcd').width("1200px");
    // }
    var btClicked = $(this).data('type');

    if (btClicked == 'all') {
      $('.blackboard').addClass('initial');
      $('.blackboard .col-products .cell').removeClass('masked');
    } else {
      $('.blackboard').removeClass('initial');
      $('.blackboard .col-products .cell.' + $(this).data('type')).removeClass(
        'masked',
      );
      $(
        '.blackboard .col-products .cell:not(.' + $(this).data('type') + ')',
      ).addClass('masked');
    }
    if (btClicked == 'cell-premium') {
      $('.col-products .cell.cell-premium').addClass('is-narrowly');
    }
    if (btClicked == 'cell-oled') {
      $('.col-products .cell.cell-oled').addClass('is-narrowly');
    }
    // if(btClicked == 'cell-lcd') {
    //   $('.col-products .cell.cell-lcd').addClass('is-narrowly');
    // }

    reinitDecal();
  });
  $('.btn-line').click(function () {
    var valDecal = 275;
    var unit = 'px';
    totalwidth =
      $('.blackboard .col-products').width() +
      $('.blackboard .col-left').width(); // screenwidth = $('.main-section').width();

    screenwidth = $('.main-section .specifications').width();
    $('.btn-line.right').show();
    $('.btn-line.left').show();

    if (screenwidth < 1400) {
      valDecal = 33;
      unit = 'vw';

      if (screenwidth < 560) {
        valDecal = 66.66;
        unit = 'vw';
      }

      var displacementwidth = (screenwidth * valDecal) / 100;

      if (totalwidth * 0.96 - displacementwidth <= screenwidth) {
        valDecal = totalwidth - screenwidth;
        unit = 'px';
        $('.btn-line.right').hide();
      }
    }

    if ($(this).hasClass('right')) {
      console.log(-((screenwidth * (decal - valDecal)) / 100 - screenwidth), totalwidth * 0.96)
      console.log(totalwidth, screenwidth);
      console.log(decal, valDecal)
      if (unit == 'px') {
        var remainingWidth = totalwidth - screenwidth + decal;

        if (remainingWidth <= valDecal) {
          valDecal = remainingWidth;
          $('.btn-line.right').hide();
        }
      } else if (unit == 'vw') {
        if (
          -((screenwidth * (decal - valDecal)) / 100 - screenwidth) >
          (totalwidth * 0.96)
        ) {
          // valDecal = valDecal / 2;

          $('.btn-line.right').hide();
        }
      }

      $('.blackboard .col-products').css(
        'margin-left',
        decal - valDecal + unit,
      );
      decal -= valDecal;
    } else {
      if (decal + valDecal > 0) {
        valDecal = -decal;
      }

      $('.blackboard .col-products').css(
        'margin-left',
        decal + valDecal + unit,
      );
      decal += valDecal;
      $('.btn-line.right').show();
    }

    if (decal >= 0) {
      $('.btn-line.left').hide();
    }
  });
  $('.blackboard').on('swipeleft', function (event) {
    if (!($('.btn-line.right').css('display') == 'none')) {
      $('.btn-line.right').click();
    }
  });
  $('.blackboard').on('swiperight', function (event) {
    if (!($('.btn-line.left').css('display') == 'none')) {
      $('.btn-line.left').click();
    }
  });
  $(window).resize(function () {
    reinitDecal();
  });

  function reinitDecal() {
    decal = 0;
    $('.blackboard .col-products').css('margin-left', 0);
    $('.btn-line.left').hide();
    $('.btn-line.right').hide();
    $('.row-tab.contents-model .col-left').css('height', 'auto');
    clearTimeout(timeOutResize);
    timeOutResize = setTimeout(function () {
      totalwidth =
        $('.blackboard .col-products').width() +
        $('.blackboard .col-left').width();
      screenwidth = $('.main-section .specifications').width();

      if (totalwidth * 0.96 > screenwidth) {
        $('.btn-line.right').show();
      } // if(($('.row-tab.contents-model .cellUnique').innerHeight())>($('.row-tab.contents-model .col-left').innerHeight())) {
      //     $('.row-tab.contents-model .col-left').css('height',$('.row-tab.contents-model .cellUnique').innerHeight());
      // }
      // else {
      //     $('.row-tab.contents-model .col-left').css('height','auto');
      // }
    }, 500);
  }
});
