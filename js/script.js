var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
var agent = navigator.userAgent.toLowerCase();
var trident = navigator.userAgent.match(/Trident\/(\d.\d)/i);

var _w;
var _breakpoint = 720;
var _breakpointDesktop = 1100;
var _wid;

var _playing = false;

var _gameGiftList;

$(function(){
    init();
    onComplete();
});


function onComplete(){
    TweenMax.fromTo( $(".visual-3"), 0.75, { opacity: 0, x:380}, { opacity: 1, x:0, delay: 0.2, ease: Power1.easeOut}); //220210 zoe 추가
    //220210 zoe 주석 처리
    // TweenMax.fromTo( $(".visual-1"), 0.2, { opacity: 0, y:-50}, { opacity: 1, y:0, ease: Power0.easeOut});
    // TweenMax.fromTo( $(".visual-2"), 0.2, { opacity: 0, scale:0.5}, { opacity: 1, scale:1,  delay:0.4,ease: Sine.easeOut});
    // TweenMax.fromTo( $(".bubble-1"), 0.5, { opacity: 0, x:-30, y:-30}, { opacity: 1,  x:0, y:0, delay:0.5, ease: Bounce.easeOut});
    // TweenMax.fromTo( $(".bubble-2"), 0.5, { opacity: 0,  x:30, y:-30}, { opacity: 1, x:0, y:0,  delay:0.6,ease: Bounce.easeOut});
    // TweenMax.fromTo( $(".visual-text"), 0.2, { opacity: 0, scale:0.5}, { opacity: 1, scale:1,  delay:0.7,ease: Sine.easeOut});
}

function init(){
    create();
    addEvent();
}

function create(){
    _w = $(window);
    _wid = _w.width();

    _gameGiftList = $(".game-gift-list").children(".gift-list");
}

function addEvent(){
    _w.on("resize", resizeEvent);
    resizeEvent();

    // _w.on("scroll", scrollEvent);
    // scrollEvent();

    pageMove('.page-move');

    $("#layerLogin").find(".layer-close").on("click", function(){
        $("#layerLogin").hide();
    });

    $("#layerSuccess").find(".layer-close").on("click", function(){
        $("#layerSuccess").hide();
    });

    $("#layerFail").find(".layer-close").on("click", function(){
        $("#layerFail").hide();
    });

    // 1. 사다리 선택 이벤트
    gamePlayEvent();
}

// 게임 클릭
function gamePlayEvent(){
    _gameGiftList.on("click", function(){
        _gameGiftList.removeClass("active");
        $(this).addClass("active");

        _gameGiftList.each(function(){
            $(this).find(".gift-img>img").attr({src:  $(this).find(".gift-img>img").attr("src").replace('_on', '_off')});
        });

        $(this).find(".gift-img>img").attr({src:  $(this).find(".gift-img>img").attr("src").replace('_off', '_on')});
    });
}

// 결과확인
function gameResultEvent(idx){
    var _gameResultList = $(".game-result-list").children(".gift-list");
    _gameResultList.removeClass("ready");
    _gameResultList.eq(idx).addClass("ready");

    setTimeout(function(){
        _gameResultList.eq(idx).find(".result-img>img").attr({src: 
             _gameResultList.eq(idx).find(".result-img>img").attr("src").replace('_question', '_gift'+idx)});
        _gameResultList.removeClass("ready");
    }, 1000);
}

// 시작하기 버튼
function gameStart(){
    
    if(!_gameGiftList.hasClass("active")){
        alert('원하는 삼성 가전을 선택 후 시작해주세요.');
    }else{
        _playing = true;
        // 1. 버튼 숨기기
        $(".btn-start").fadeOut();
        var idx = $(".game-gift-list").find(".active").index();
        _gameGiftList.eq(idx).addClass("motion");

        // 2. 사다리 그리기
        drawCanvas(idx);

        // 3. 결과 확인
        // 0 : 꽝 / 1~4 : 경품
        //gameResultEvent(4);

        // 4. 결과팝업확인
        // gameEnd(idx);

    }
    
}

// 사다리완료
function gameEnd(idx){
    _gameGiftList.removeClass("motion");
    gameResultEvent(idx);

    setTimeout(function(){

        if(idx == 0) $("#layerFail").fadeIn(); 
        else $("#layerSuccess").fadeIn();
    },1500);
}

function drawCanvas(idx){
    var index = idx;
    var obj = $("#ladderCanvas"+(idx+1));
       
    if(index == 0){
        TweenMax.fromTo(obj.find(".stoke-line1"), 0.2, { opacity: 0, height:0}, { opacity: 1, height:obj.find(".stoke-line1").height(), 
        ease: Power0.easeOut,onComplete:function(){
            TweenMax.fromTo(obj.find(".stoke-line2"), 0.2, { opacity: 0, width:0}, { opacity: 1, width:obj.find(".stoke-line2").width(), 
            ease: Power0.easeOut,onComplete:function(){

                TweenMax.fromTo(obj.find(".stoke-line3"), 0.2, { opacity: 0, height:0}, { opacity: 1, height:obj.find(".stoke-line3").height(), 
                ease: Power0.easeOut,onComplete:function(){
                    TweenMax.fromTo(obj.find(".stoke-line4"), 0.2, { opacity: 0, width:0}, { opacity: 1, width:obj.find(".stoke-line4").width(), 
                    ease: Power0.easeOut,onComplete:function(){

                        TweenMax.fromTo(obj.find(".stoke-line5"), 0.2, { opacity: 0, height:0}, { opacity: 1, height:obj.find(".stoke-line5").height(), 
                        ease: Power0.easeOut,onComplete:function(){
                            TweenMax.fromTo(obj.find(".stoke-line6"), 0.2, { opacity: 0, width:0}, { opacity: 1, width:obj.find(".stoke-line6").width(), 
                            ease: Power0.easeOut,onComplete:function(){

                                TweenMax.fromTo(obj.find(".stoke-line7"), 0.2, { opacity: 0, height:0}, { opacity: 1, height:obj.find(".stoke-line7").height(), 
                                ease: Power0.easeOut,onComplete:function(){
                                    TweenMax.fromTo(obj.find(".stoke-line8"), 0.2, { opacity: 0, width:0}, { opacity: 1, width:obj.find(".stoke-line8").width(), 
                                    ease: Power0.easeOut,onComplete:function(){

                                        TweenMax.fromTo(obj.find(".stoke-line9"), 0.2, { opacity: 0, height:0}, { opacity: 1, height:obj.find(".stoke-line9").height(), 
                                        ease: Power0.easeOut,onComplete:function(){
                                            TweenMax.fromTo(obj.find(".stoke-line10"), 0.2, { opacity: 0, width:0}, { opacity: 1, width:obj.find(".stoke-line10").width(), 
                                            ease: Power0.easeOut,onComplete:function(){
                                
                                                TweenMax.fromTo(obj.find(".stoke-line11"), 0.2, { opacity: 0, height:0}, { opacity: 1, height:obj.find(".stoke-line11").height(), 
                                                ease: Power0.easeOut,onComplete:function(){
                                                    TweenMax.fromTo(obj.find(".stoke-line12"), 0.2, { opacity: 0, width:0}, { opacity: 1, width:obj.find(".stoke-line12").width(), 
                                                    ease: Power0.easeOut,onComplete:function(){
                                                        TweenMax.fromTo(obj.find(".stoke-line13"), 0.2, { opacity: 0, height:0}, { opacity: 1, height:obj.find(".stoke-line13").height(), 
                                                        ease: Power0.easeOut,onComplete:function(){
                                                            gameEnd(2);
                                                        }});
                                                    }});
                                                }});

                                            }});
                                        }});
                                    }});
                                }});
                            }});
                        }});
                    }});
                }});

            }});
        }});
    }
    else if(index == 1){
        TweenMax.fromTo(obj.find(".stoke-line1"), 0.2, { opacity: 0, height:0}, { opacity: 1, height:obj.find(".stoke-line1").height(), 
        ease: Power0.easeOut,onComplete:function(){
            TweenMax.fromTo(obj.find(".stoke-line2"), 0.2, { opacity: 0, width:0}, { opacity: 1, width:obj.find(".stoke-line2").width(), 
            ease: Power0.easeOut,onComplete:function(){

                TweenMax.fromTo(obj.find(".stoke-line3"), 0.2, { opacity: 0, height:0}, { opacity: 1, height:obj.find(".stoke-line3").height(), 
                ease: Power0.easeOut,onComplete:function(){
                    TweenMax.fromTo(obj.find(".stoke-line4"), 0.2, { opacity: 0, width:0}, { opacity: 1, width:obj.find(".stoke-line4").width(), 
                    ease: Power0.easeOut,onComplete:function(){

                        TweenMax.fromTo(obj.find(".stoke-line5"), 0.2, { opacity: 0, height:0}, { opacity: 1, height:obj.find(".stoke-line5").height(), 
                        ease: Power0.easeOut,onComplete:function(){
                            TweenMax.fromTo(obj.find(".stoke-line6"), 0.2, { opacity: 0, width:0}, { opacity: 1, width:obj.find(".stoke-line6").width(), 
                            ease: Power0.easeOut,onComplete:function(){

                                TweenMax.fromTo(obj.find(".stoke-line7"), 0.2, { opacity: 0, height:0}, { opacity: 1, height:obj.find(".stoke-line7").height(), 
                                ease: Power0.easeOut,onComplete:function(){
                                    TweenMax.fromTo(obj.find(".stoke-line8"), 0.2, { opacity: 0, width:0}, { opacity: 1, width:obj.find(".stoke-line8").width(), 
                                    ease: Power0.easeOut,onComplete:function(){

                                        TweenMax.fromTo(obj.find(".stoke-line9"), 0.2, { opacity: 0, height:0}, { opacity: 1, height:obj.find(".stoke-line9").height(), 
                                        ease: Power0.easeOut,onComplete:function(){
                                            TweenMax.fromTo(obj.find(".stoke-line10"), 0.2, { opacity: 0, width:0}, { opacity: 1, width:obj.find(".stoke-line10").width(), 
                                            ease: Power0.easeOut,onComplete:function(){
                                
                                                TweenMax.fromTo(obj.find(".stoke-line11"), 0.2, { opacity: 0, height:0}, { opacity: 1, height:obj.find(".stoke-line11").height(), 
                                                ease: Power0.easeOut,onComplete:function(){
                                                    gameEnd(4);

                                                }});

                                            }});
                                        }});
                                    }});
                                }});
                            }});
                        }});
                    }});
                }});

            }});
        }});
    }
    else if(index == 2){
        TweenMax.fromTo(obj.find(".stoke-line1"), 0.2, { opacity: 0, height:0}, { opacity: 1, height:obj.find(".stoke-line1").height(), 
        ease: Power0.easeOut,onComplete:function(){
            TweenMax.fromTo(obj.find(".stoke-line2"), 0.2, { opacity: 0, width:0}, { opacity: 1, width:obj.find(".stoke-line2").width(), 
            ease: Power0.easeOut,onComplete:function(){

                TweenMax.fromTo(obj.find(".stoke-line3"), 0.2, { opacity: 0, height:0}, { opacity: 1, height:obj.find(".stoke-line3").height(), 
                ease: Power0.easeOut,onComplete:function(){
                    TweenMax.fromTo(obj.find(".stoke-line4"), 0.2, { opacity: 0, width:0}, { opacity: 1, width:obj.find(".stoke-line4").width(), 
                    ease: Power0.easeOut,onComplete:function(){

                        TweenMax.fromTo(obj.find(".stoke-line5"), 0.2, { opacity: 0, height:0}, { opacity: 1, height:obj.find(".stoke-line5").height(), 
                        ease: Power0.easeOut,onComplete:function(){
                            TweenMax.fromTo(obj.find(".stoke-line6"), 0.2, { opacity: 0, width:0}, { opacity: 1, width:obj.find(".stoke-line6").width(), 
                            ease: Power0.easeOut,onComplete:function(){

                                TweenMax.fromTo(obj.find(".stoke-line7"), 0.2, { opacity: 0, height:0}, { opacity: 1, height:obj.find(".stoke-line7").height(), 
                                ease: Power0.easeOut,onComplete:function(){
                                    TweenMax.fromTo(obj.find(".stoke-line8"), 0.2, { opacity: 0, width:0}, { opacity: 1, width:obj.find(".stoke-line8").width(), 
                                    ease: Power0.easeOut,onComplete:function(){

                                        TweenMax.fromTo(obj.find(".stoke-line9"), 0.2, { opacity: 0, height:0}, { opacity: 1, height:obj.find(".stoke-line9").height(), 
                                        ease: Power0.easeOut,onComplete:function(){
                                            TweenMax.fromTo(obj.find(".stoke-line10"), 0.2, { opacity: 0, width:0}, { opacity: 1, width:obj.find(".stoke-line10").width(), 
                                            ease: Power0.easeOut,onComplete:function(){
                                
                                                TweenMax.fromTo(obj.find(".stoke-line11"), 0.2, { opacity: 0, height:0}, { opacity: 1, height:obj.find(".stoke-line11").height(), 
                                                ease: Power0.easeOut,onComplete:function(){
                                                    gameEnd(3);

                                                }});

                                            }});
                                        }});
                                    }});
                                }});
                            }});
                        }});
                    }});
                }});

            }});
        }});
    }   
    else if(index == 3){
        TweenMax.fromTo(obj.find(".stoke-line1"), 0.2, { opacity: 0, height:0}, { opacity: 1, height:obj.find(".stoke-line1").height(), 
        ease: Power0.easeOut,onComplete:function(){
            TweenMax.fromTo(obj.find(".stoke-line2"), 0.2, { opacity: 0, width:0}, { opacity: 1, width:obj.find(".stoke-line2").width(), 
            ease: Power0.easeOut,onComplete:function(){

                TweenMax.fromTo(obj.find(".stoke-line3"), 0.2, { opacity: 0, height:0}, { opacity: 1, height:obj.find(".stoke-line3").height(), 
                ease: Power0.easeOut,onComplete:function(){
                    TweenMax.fromTo(obj.find(".stoke-line4"), 0.2, { opacity: 0, width:0}, { opacity: 1, width:obj.find(".stoke-line4").width(), 
                    ease: Power0.easeOut,onComplete:function(){

                        TweenMax.fromTo(obj.find(".stoke-line5"), 0.2, { opacity: 0, height:0}, { opacity: 1, height:obj.find(".stoke-line5").height(), 
                        ease: Power0.easeOut,onComplete:function(){
                            TweenMax.fromTo(obj.find(".stoke-line6"), 0.2, { opacity: 0, width:0}, { opacity: 1, width:obj.find(".stoke-line6").width(), 
                            ease: Power0.easeOut,onComplete:function(){

                                TweenMax.fromTo(obj.find(".stoke-line7"), 0.2, { opacity: 0, height:0}, { opacity: 1, height:obj.find(".stoke-line7").height(), 
                                ease: Power0.easeOut,onComplete:function(){
                                    TweenMax.fromTo(obj.find(".stoke-line8"), 0.2, { opacity: 0, width:0}, { opacity: 1, width:obj.find(".stoke-line8").width(), 
                                    ease: Power0.easeOut,onComplete:function(){

                                        TweenMax.fromTo(obj.find(".stoke-line9"), 0.2, { opacity: 0, height:0}, { opacity: 1, height:obj.find(".stoke-line9").height(), 
                                        ease: Power0.easeOut,onComplete:function(){
                                            gameEnd(1);
                                        }});
                                    }});
                                }});
                            }});
                        }});
                    }});
                }});

            }});
        }});
    }   
    else if(index == 4){
        TweenMax.fromTo(obj.find(".stoke-line1"), 0.2, { opacity: 0, height:0}, { opacity: 1, height:obj.find(".stoke-line1").height(), 
        ease: Power0.easeOut,onComplete:function(){
            TweenMax.fromTo(obj.find(".stoke-line2"), 0.2, { opacity: 0, width:0}, { opacity: 1, width:obj.find(".stoke-line2").width(), 
            ease: Power0.easeOut,onComplete:function(){

                TweenMax.fromTo(obj.find(".stoke-line3"), 0.2, { opacity: 0, height:0}, { opacity: 1, height:obj.find(".stoke-line3").height(), 
                ease: Power0.easeOut,onComplete:function(){
                    TweenMax.fromTo(obj.find(".stoke-line4"), 0.2, { opacity: 0, width:0}, { opacity: 1, width:obj.find(".stoke-line4").width(), 
                    ease: Power0.easeOut,onComplete:function(){

                        TweenMax.fromTo(obj.find(".stoke-line5"), 0.2, { opacity: 0, height:0}, { opacity: 1, height:obj.find(".stoke-line5").height(), 
                        ease: Power0.easeOut,onComplete:function(){
                            TweenMax.fromTo(obj.find(".stoke-line6"), 0.2, { opacity: 0, width:0}, { opacity: 1, width:obj.find(".stoke-line6").width(), 
                            ease: Power0.easeOut,onComplete:function(){

                                TweenMax.fromTo(obj.find(".stoke-line7"), 0.2, { opacity: 0, height:0}, { opacity: 1, height:obj.find(".stoke-line7").height(), 
                                ease: Power0.easeOut,onComplete:function(){
                                    TweenMax.fromTo(obj.find(".stoke-line8"), 0.2, { opacity: 0, width:0}, { opacity: 1, width:obj.find(".stoke-line8").width(), 
                                    ease: Power0.easeOut,onComplete:function(){

                                        TweenMax.fromTo(obj.find(".stoke-line9"), 0.2, { opacity: 0, height:0}, { opacity: 1, height:obj.find(".stoke-line9").height(), 
                                        ease: Power0.easeOut,onComplete:function(){
                                            gameEnd(0);
                                        }});
                                    }});
                                }});
                            }});
                        }});
                    }});
                }});

            }});
        }});
    }   
   
}

function scrollEvent(){
    var st = $(window).scrollTop();
    var sh = $(window).height() / 1.2;
    var section = $('.section');

    section.each(function(i){
        if( st > section.eq(i).offset().top - sh){
            $(this).addClass('active');
        }
        //  else {
        //     $(this).removeClass('active');
        // }
    });
   
}


function resizeEvent(){
    _wid = _w.width();

    $('.responsive').each(function() {
        var $src = $(this).attr("src");
        var val = (_wid > _breakpoint) ? $src.replace('mobile', 'pc') : $src.replace('pc', 'mobile');

        $(this).attr("src", val);
    });

    if(_playing == true){
        location.reload();
    }
}

function pageMove($selector, $position){
	if($position == undefined) $position = 0;

	var selector = $selector;
	$(selector).on('click', function (e) {
		e.preventDefault();

		var _top = $($(this).attr('href'));
		var $target = _top.offset().top;

		$('html,body').animate({
			scrollTop: $target+$position
		}, 500);


	});
}


function popupClose($dimName, $idName){
    var dimName = $dimName;
    var $popupLayer = $("#"+$idName);
    $(dimName).hide();
    $popupLayer.hide();
}

function popupOpen($dimName, $idName){
    var dimName = $dimName;
    var $popupLayer = $("#"+$idName);
    $(dimName).show();
    $popupLayer.show();
    popupPosition($popupLayer);
}


function popupPosition($popupLayer) {
    var st = $(window).scrollTop();
    var winHeight = $(window).height();
    var popupHeight = $popupLayer.outerHeight();

    var topValue = (st + ( winHeight / 2 - popupHeight / 2 ));
    if($(window).height() < popupHeight){
        topValue = st;
    }

    $popupLayer.css({top:topValue});
}


