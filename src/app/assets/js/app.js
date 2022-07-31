import('jqueryui');

var _app_ = function(){

  function hasAttr(el,a) {
    let attr = $(el).attr(a);
    return (typeof attr !== 'undefined' && attr !== false) ? attr : false;
  }

  $('.menu-text').each(function() {
    let img = hasAttr(this,'img-replacement');
    if (img !== false) {
      $(this).attr('alt',$(this).text());
      $(this).html('<img src="'+img+'" />');
    }
  });

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
    		$('.color-block.orange').delay(400).animate({top:'-50%',left:'-50%',opacity:0},400);
    		$('.color-block.yellow').delay(400).animate({top:'-50%',right:'-50%',opacity:0},400);
    		$('.color-block.green').delay(400).animate({bottom:'-50%',right:'-50%',opacity:0},400);
    		$('.color-block.purple').delay(400).animate({top:'100%',left:'-50%',opacity:0},400);
    		$('#sublogo').animate({opacity:0},400);
    		$('#logo').delay(200).animate({opacity:0},200);
    		var url = $(this).attr('href');
    		setTimeout(function(){location.href=url;},1000);
    			return false;
    	});
  }

  var animSpeed = 1000;
  var animType = 'easeInOutQuart';
  var delay = 300;

  function introAnim () {

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

};

$(document).ready(function() {
  _app_();
});

window.onpageshow = function() {
  _app_();
};
