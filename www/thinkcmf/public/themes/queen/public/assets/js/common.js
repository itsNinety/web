var clothIconUrl = "https://cdnh5.nibaguai.com/gong3/guanwang/clothes_icon/" //服装配件
var sclhUrl = "https://cdnh5.nibaguai.com/gong3/guanwang/lh181205/"; //侍从立绘
var sctxUrl = "https://cdnh5.nibaguai.com/gong3/xiaoer/sctx/sctx";  //侍从头像
var skillIconUrl = "https://cdnh5.nibaguai.com/gong3/xiaoer/skill_icon/"; //侍从技能图标
var touxiangUrl = "https://cdnh5.nibaguai.com/gong3/xiaoer/touxiang/"; //头像
var tujianUrl = "https://cdnh5.nibaguai.com/gong3/guanwang/zntx/"; //美人图鉴头像(子女代表)
var suitUrl = "https://cdnh5.nibaguai.com/gong3/guanwang/suit/"; //服装套装资源
var znlhUrl = "https://cdnh5.nibaguai.com/gong3/guanwang/znlh181205/"; //子女立绘


//__CDN__

//侍从立绘
$(function (){
    $(".cdnheropic").each(function(){
      var ogSrc = $(this).attr("src");
      if(ogSrc == '') return;
      if(ogSrc.indexOf(sclhUrl) == -1){
        $(this).attr('src', sclhUrl + ogSrc + ".png");
      }
    }); 
});

//侍从技能图标
$(function (){
    $(".cdnicon").each(function(){
      var ogSrc = $(this).attr("src");
      if(ogSrc == '') return;
      if(ogSrc.indexOf(skillIconUrl) == -1){
        $(this).attr('src', skillIconUrl + ogSrc+".png");
      }
    });
});

//侍从头像
$(function (){
  $(".sctx").each(function(){
    var ogSrc = $(this).attr("src");
    if(ogSrc == '') return;
    if(ogSrc.indexOf(sctxUrl) == -1){
      $(this).attr('src', sctxUrl + ogSrc+".png");
    }
  });
});

//美人图鉴头像
$(function (){
  $(".cdntujian").each(function(){
    var ogSrc = $(this).attr("src");
    if(ogSrc == '') return;
    if(ogSrc.indexOf(tujianUrl) == -1){
      $(this).attr('src', tujianUrl + ogSrc+".png");
    }
  });
})

//服装套装
$(function(){
  $(".cdnsuit").each(function(){
    var ogSrc = $(this).attr("src");
    if(ogSrc == '') return;
    if(ogSrc.indexOf(suitUrl) == -1){
      $(this).attr('src', suitUrl + ogSrc+".png");
    }
  });
})

//服装套装
function suitCDN(){
  $(".cdnsuit").each(function(){
    var ogSrc = $(this).attr("src");
    if(ogSrc == '') return;
    if(ogSrc.indexOf(suitUrl) == -1){
      $(this).attr('src', suitUrl + ogSrc+".png");
    }
  });
}

/**
 * 给子女立绘加上cdn域名
 * cb为回调函数，如放缩操作
 */
function znlhCDN(){
  $(".cdnznlh").each(function(){
    var ogSrc = $(this).attr("src");
    if(ogSrc.indexOf(znlhUrl) == -1){
      $(this).attr('src', znlhUrl + ogSrc+".png");
    }
  });
}

//技能图标
function skillIconCDN(){
  $(".cdnicon").each(function(){
    var ogSrc = $(this).attr("src");
    if(ogSrc.indexOf(skillIconUrl) == -1){
      $(this).attr('src', skillIconUrl + ogSrc+".png");
    }
  });
}

//服装配件
function clothIconCDN(res){
  switch(res.split('_')[1].charAt(0)){
    case('1'):{
      $(".partpic").each(function(){
          var ogSrc = $(this).attr("src");
          if(ogSrc.indexOf(clothIconUrl) == -1){
            $(this).attr('src', clothIconUrl +'1/'+ ogSrc + ".png");
          }
      });
    }
    case('2'):{
        $(".partpic").each(function(){
            var ogSrc = $(this).attr("src");
            if(ogSrc.indexOf(clothIconUrl) == -1){
              $(this).attr('src', clothIconUrl +'2/'+ ogSrc + ".png");
            }
        });
    }
    case('3'):{
      $(".partpic").each(function(){
        var ogSrc = $(this).attr("src");
        if(ogSrc.indexOf(clothIconUrl) == -1){
          $(this).attr('src', clothIconUrl +'3/'+ ogSrc + ".png");
        }
      });
    }
    case('4'):{
      $(".partpic").each(function(){
        var ogSrc = $(this).attr("src");
        if(ogSrc.indexOf(clothIconUrl) == -1){
          $(this).attr('src', clothIconUrl +'4/'+ ogSrc + ".png");
        }
      });
    }
    case('5'):{
      $(".partpic").each(function(){
        var ogSrc = $(this).attr("src");
        if(ogSrc.indexOf(clothIconUrl) == -1){
          $(this).attr('src', clothIconUrl +'5/'+ ogSrc + ".png");
        }
      });
    }
    case('6'):{
      $(".partpic").each(function(){
        var ogSrc = $(this).attr("src");
        if(ogSrc.indexOf(clothIconUrl) == -1){
          $(this).attr('src', clothIconUrl +'6/'+ ogSrc + ".png");
        }
      });
    }
  }
}

/**
 * 等比放缩子女立绘图片
 * 参数：类，放缩比例。如scaleFunc(".cdnznlh",0.2)
 */
function scaleFunc(ob,scale){
  setTimeout(function(){
    $(ob).each(function(){
      var originalWidth = $(this).width();
      if(originalWidth != 0){
        afterWidth = originalWidth * scale;
        var originalHeight = $(this).height();
        afterHeight = originalHeight * scale;
        $(this).css("width", afterWidth);
        $(this).css("height", afterHeight);
        $(this).css("display", "block");
        if(ob==".cdnznlh"){
          let that = $(this);
          medZnlh(that,afterWidth);
        }
      }else {
        $(this).css("max-height", '90%');
        $(this).css("display", "block");
      }
    })
  }, 300);
}

//子女立绘图片放缩后根据图片大小居中图片
function medZnlh(that,afterWidth){
  var afterLeft = (136 - afterWidth)/2;
  that.css("left",afterLeft)
}




