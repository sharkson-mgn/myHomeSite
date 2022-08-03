
require('jqueryui');

var _app_ = function(){

  this.oryg = null;
  var that = this;

  if (this.oryg === null) {
    this.oryg = $('body').clone();
  }

  this.restore = function() {
    var anyAnimate = false;
    $('.color-block').each(function() {
      if ($(this).is(':animated')) {
        anyAnimate = true;
      }
    });
    if (anyAnimate !== true && this.oryg !== null) {
      $('body').replaceWith(this.oryg);
      $('#body').css({
        opacity: 0,
      });
      $('#body').animate({
        opacity: 1,
      },300,'linear');
    }
  }

  function hasAttr(el,a) {
    let attr = $(el).attr(a);
    return (typeof attr !== 'undefined' && attr !== false) ? attr : false;
  }

  this.replaceImages = function () {
    $('.menu-text').each(function() {
      let img = hasAttr(this,'img-replacement');
      if (img !== false) {
        $(this).attr('alt',$(this).text());
        $(this).html('<img src="'+img+'" />');
      }
    });
  }

  function registerActions () {
      $('.menu-pos').mouseenter(function(event) {
        $(this).children('.menu-text').stop(true,false).animate({
          top: '45%',
          color: '#fff',
        }, 100);
      });

      $('.menu-pos').mouseleave(function(event) {
        $(this).children('.menu-text').stop(true,false).animate({
          top: '40%',
          color: '#000',
        }, 100);
      });

      $('.menu-pos').click(function(){
    		$(this).stop(true,false).animate({color:'white'},100);
    		$('.menu-pos').each(function(index){
    			$(this).delay(index*100).animate({opacity:0},100);
    		});
        $('.color-block').each(function(index){
          let params = {opacity: 0};
          params[(index < 2) ? 'top' : 'bottom'] = '-50%';
          params[([1,2].includes(index)) ? 'right' : 'left'] = '-50%';
          $(this).animate(params, 400);
        });
    		$('#sublogo').animate({opacity:0},400);
    		$('#logo').delay(200).animate({opacity:0},200);
    		var url = $(this).attr('href');
    		setTimeout(function(){
          location.href=url;
        },400);
    		return false;
    	});
  }

  var animSpeed = 1000;
  var animType = 'easeInOutQuart';
  var delay = 300;

  function introAnim () {

    $('.init-anim').toggleClass('init-anim').toggleClass('stop-anim');

    this.replaceImages();

    setTimeout(function() {
      registerActions();
    }, 4 * delay + 2 * animSpeed);

    let dir = ['top','right','bottom','left'];

    $('.menu-text').css({
      top: '20%',
      opacity: 0,
    })

    $('.color-block').each(function(index) {

      let init = {opacity: 0};

      init[dir[index]] = '-50%';

      if (['top','bottom'].includes(dir[index])) {
        init.width = '70%';
      }
      else {
        init.height = '70%';
      }

      $(this).css(init);

      let finish = {opacity: 1};

      finish[dir[index]] = '0';

      $(this).delay(delay * index + 10).animate(finish, animSpeed, animType, function() {
        var that = this;
        setTimeout(function() {
          $(that).css({
            width: '50%',
            height: '50%',
          });

          $(that).find('.menu-text').animate({
            top: '40%',
            opacity: 1,
          }, animSpeed / 2);
        }, 2 * delay);

      });

    });

  };

  introAnim();

  window.onpageshow = function() {
    setTimeout(() => {
        that.restore();
    },1);
  };

};

$('body').ready(function() {
  _app_();
});
