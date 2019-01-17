/*******
 * 首页相关js
 ******/


var nowid = 1; //当前侍从编号hero_id
var nowBloodPage = 1; //当前美人图鉴是第几页
var nowClothPage = 1; //当前服装图鉴是第几页
var maxClothPage; //服装图鉴总共多少页

//触碰到tab,切换内容
$(function () {
    $("#tabs1 a").mousemove(function (e) {  
        $(this).tab('show');
    }); 
});
$('#tabs1 a').click(function (e) {
  e.preventDefault();
})


//点击到tab,切换内容
$(function(){
    var btnList = $(".clickbtn");
    var divList = $(".displaypanel");
    for(var i =  0; i <btnList.length; i++){
      btnList[i].index = i;
      btnList[i].onclick = function(){
        for(var j = 0; j < btnList.length; j++) {
        //将所有的按钮样式去掉，块隐藏
        btnList[j].style.color = "";
        btnList[j].style.backgroundColor = "";
        divList[j].style.display = "none";
      }
        //给点击的按钮添加样式，对应的块显示
        this.style.color = "#fff";
        this.style.background = "rgba(192,177,123,1)";
        divList[this.index].style.display = "block";
        if(this.index == 1){
          initBlood();
        }
        if(this.index == 2){
          initCloth();
        }
      }
    }
  })

//侍从图鉴-点击箭头后html更新
function changeAttendant(msg){
    var msg = JSON.parse(msg);
    nowid = msg.id; 
    // $('.tab-attendant-content').fadeOut();

    if(msg.isFirst == 1){
      //说明是数据库中第一个
      $('#scLeftarrow').html('');
    }else if(msg.isLast == 1){
      //说明是数据库最后一个
      $('#scRighttarrow').html('');
    }else {
      $('#scLeftarrow').html('<img src="'+url_prx+'index/leftarrow.png'+'"style="float:left; margin-left: 10px; margin-top: -256px; position: relative; z-index: 99; width: 86px; height: 86px;"></img>');
      $('#scRightarrow').html('<img src="'+url_prx+'index/rightarrow.png'+'"style="float: right;margin-right: 10px; margin-top: -256px; position: relative; z-index: 99; width: 86px; height: 86px;">');
    }
    $('#name').html(msg.name);
    $('#talant').html(msg.talant+'侍从');
    $('#culture').html(msg.culture);
    $('#origin').html(msg.origin);
    $('#hobby').html(msg.hobby);
    $('#battle_type').html(msg.battle_type);
    $('#biography').html(msg.biography);
    // $('.cdnheropic').fadeOut();
    $('.cdnheropic').attr('src',sclhUrl+msg.skin1+'.png');
    // $('.cdnheropic').fadeIn();
    $('#skill_icons').empty(); //清空之前的图标
    $('#fate_lists').empty();//清空之前的缘分
    // $('.tab-attendant-content').fadeIn();
    for(var i = 0; i< msg.skill_icon_list.length; i++){
      $('#skill_icons').append('<li style="float:left"><img src="'+msg.skill_icon_list[i]+'"class="cdnicon" style=" max-width:60px; max-height:60px; margin-top:12px; margin-left: 13px;"></li>');
      showSkill(i);
    }
    $(".cdnicon").each(function(){
      var ogSrc = $(this).attr("src");
      $(this).attr('src', skillIconUrl + ogSrc+".png");
    });
    //显示缘分
    for(var i = 0; i<msg.fate_list.length; i++){
      $('#fate_lists').append('<span style="float:left;margin-top:8px;font-size:16px;">'+msg.fate_list[i]['name']+': '+msg.fate_list[i]['fate_desc']+'</span>');
    }
}

//侍从图鉴--获取数据
$(function(){
    $('#scRightarrow').click(function(){
      $.ajax({
        url: 'portal/index/changePic', type: "post", data: 'nowid='+nowid+'&arrow='+'right', success: function (msg) {
          changeAttendant(msg);
        }
      });
    });
    $('#scLeftarrow').click(function(){
      $.ajax({
        url: 'portal/index/changePic', type: "post", data: 'nowid='+nowid+'&arrow='+'left', success: function (msg) {
          changeAttendant(msg);
        }
      });
    })
})


//初始化侍从信息
  $(function(){
    $.ajax({
      url: 'portal/index/initAttendant', type: "post", data: 'nowid='+nowid, success: function (msg) {
          var msg = JSON.parse(msg);
          nowid = msg.hero_id; //重置当前侍从id
          $('#name').html(msg.name);
          $('#talant').html(msg.talant+'侍从');
          $('#culture').html(msg.culture);
          $('#origin').html(msg.origin);
          $('#hobby').html(msg.hobby);
          $('#battle_type').html(msg.battle_type);
          $('#biography').html(msg.biography);
          $('.cdnheropic').attr('src',sclhUrl+msg.skin1+'.png');
          //显示技能图标
          for(var i = 0; i< msg.skill_icon_list.length; i++){
            $('#skill_icons').append('<li style="float:left"><img src="'+msg.skill_icon_list[i]+'"class="cdnicon" style=" max-width:60px; max-height:60px; margin-top:12px; margin-left: 13px;"></li>');
            showSkill(i);
          }
          $(".cdnicon").each(function(){
            var ogSrc = $(this).attr("src");
            $(this).attr('src', skillIconUrl + ogSrc+".png");
          });
          //显示缘分
          for(var i = 0; i<msg.fate_list.length; i++){
            $('#fate_lists').append('<span style="float:left;margin-top:8px;font-size:16px;">'+msg.fate_list[i]['name']+': '+msg.fate_list[i]['fate_desc']+'</span>');
          }
        }
    });
  })


  //popover获取技能详情
  var skillName = '';
  var skillDesc = '';
  function getSkillDetail(i){ 
    skillName = ''
    skillDesc = '';
    $.ajax({
      cache: false,
      async: false,
      type: "POST",
      data: {
        heroid: nowid,
        skillid: i,
      },
      url: "portal/index/skillDetail",
      success: function (msg) {
          var msg = JSON.parse(msg);
          skillDesc += "<div style='float:left; margin-top:-30px; margin-left:-220px;'><img src='"+skillIconUrl+msg.icon+".png' class='skill-icon cdnicon'><div class='skill-name'>【"+msg.name+"】</div><div class='skill-desc'>"+msg.skill_desc+"</div></div>";
        }
    });
    return skillDesc;
  }
  function showSkill(i) {
    $(".cdnicon").popover({
      trigger: 'hover',
      placement: 'top',
      html: 'true',
      content: getSkillDetail(i),
    })
  };


//初始化美人血统
function initBlood(){
  $.ajax({
    url: 'portal/index/initBlood', type: "post", data: 'nowBloodPage='+nowBloodPage,dataType:'JSON', success: function (msg) {
      changeBlood(msg);
    }
  });
}

//美人血统图鉴--获取数据
$(function(){
  $('#xtRightarrow').click(function(){
    nowBloodPage += 1;
    $.ajax({
      url: 'portal/index/changeBlood', type: "post",data: 'nowBloodPage='+nowBloodPage,dataType:'JSON', success: function (msg) {
        changeBlood(msg);
        $('#xtLeftarrow').html('<img src="'+url_prx+'index/leftarrow.png'+'"style="float:left; margin-left: 10px; margin-top: -256px; position: relative; z-index: 99; width: 86px; height: 86px;"></img>');
        $('#xtRightarrow').html('');
      }
    });
  });
  $('#xtLeftarrow').click(function(){
    nowBloodPage -= 1;
    $.ajax({
      url: 'portal/index/changeBlood', type: "post", data: 'nowBloodPage='+nowBloodPage,dataType:'JSON', success: function (msg) {
        changeBlood(msg);
        $('#xtLeftarrow').html('');
        $('#xtRightarrow').html('<img src="'+url_prx+'index/rightarrow.png'+'"style="float:right; margin-right: 10px; margin-top: -256px; position: relative; z-index: 99; width: 86px; height: 86px;">');
      }
    });
  })
})

//血统图鉴更新html
function changeBlood(msg) {
  $(".tab-blood-content").empty();
  for(var i = 0; i<msg.length; i++) {
    data = JSON.stringify(msg[i]);
    $(".tab-blood-content").append('<li class="oneblood" onclick="queryBlood('+msg[i].id+')"><div class="circularmask"><img src="'+msg[i].res+'"class="cdntujian" style="margin-top:10px; position:relative; width:112px;"></div><div class="bloodframe" style="position:absolute; margin-left:-8px; z-index:10;"></div><div class="oneblood-name">'+msg[i].name+'</div></li>');
  }
  $(".cdntujian").each(function(){
    var ogSrc = $(this).attr("src");
    if(ogSrc == '') return;
    if(ogSrc.indexOf(tujianUrl) == -1){
      $(this).attr('src', tujianUrl + ogSrc+".png");
    }
  });
}

//血统详情弹窗
function queryBlood(id){
  $.ajax({
      url: 'portal/picture/bloodPopDetail',
      type: "post", 
      data:"id="+id, 
      success: showBloodQuery,
  });
}

function showBloodQuery(msg) {
  msg = JSON.parse(msg);
  $('.bloodPopHead').attr('src',msg.bloodData[0].res);
  $(".bloodPopHead").each(function(){
      var ogSrc = $(this).attr("src");
      $(this).attr('src', tujianUrl + ogSrc+".png");
  });
  $('.bloodPopTitle').html(msg.bloodData[0].name+'血统');
  $('.bloodPopDesc').html(msg.bloodData[0].culture_desc);
  recentZnPage = 1; //重置当前页
  if(msg.znData.length%12 == 0){
      maxZnPage = parseInt(msg.znData.length/12); //总页数
  }else{
      maxZnPage = parseInt(msg.znData.length/12)+1; //总页数
  }
  znMsg = msg.znData; 
  changeZnPage(0); //处理箭头,并显示当前页信息
  $('#bloodPopModal').modal('show');
}

var recentZnPage = 1; //当前页面
var maxZnPage; //最多子女页面
var znMsg; 

//点击箭头切换子女页面
function changeZnPage(num){
  $('.znList').html(''); //清空
  recentZnPage += num;
  if(maxZnPage == 1){
      $('.znList-leftarrow')[0].style.display = "none";
      $('.znList-rightarrow')[0].style.display = "none";
  }else if(recentZnPage == 1){
      //当前是第一页,隐藏左箭头
      $('.znList-leftarrow')[0].style.display = "none";
      $('.znList-rightarrow')[0].style.display = "block";
  }else if(recentZnPage == maxZnPage){
      //当前是最后一页，隐藏右箭头
      $('.znList-leftarrow')[0].style.display = "block";
      $('.znList-rightarrow')[0].style.display = "none";
  }else{
      $('.znList-leftarrow')[0].style.display = "block";
      $('.znList-rightarrow')[0].style.display = "block";
  }
  let start = 12*(recentZnPage-1);
  let end =  Math.min(start + 12,znMsg.length);
  for(var i = start; i < end; i++){
      if(i-start < 6){
          //第一行
          let marleft = 56+192*(i-start);
          let precharm = znMsg[i].charm.split(':')[0];
          let backcharm = znMsg[i].charm.split(':')[1];
          $('.znList').append('<li style="width:136px;height:216px; float:left; margin-left:'+marleft+'px; position:absolute;"><img src="'+znMsg[i].res+'" class="cdnznlh" style="position:absolute; bottom:0; display:none;"><div style="width:120px;background:rgba(170,141,99,1);position:absolute; left:12px; bottom:-13px; text-align:center;"><span style="height:16px;font-size:16px;font-weight:400;color:rgba(255,255,255,1);">魅力'+precharm+'-'+backcharm+'</span></div></li>') 
      }else{
          //第二行
          let marleft = 56+192*(i-start-6);
          let precharm = znMsg[i].charm.split(':')[0];
          let backcharm = znMsg[i].charm.split(':')[1];
          $('.znList').append('<li style="width:136px;height:216px; float:left;margin-left:'+marleft+'px;margin-top:242px;position:absolute;"><img src="'+znMsg[i].res+'" class="cdnznlh" style="position:absolute; bottom:0; display:none;"><div style="width:120px;background:rgba(170,141,99,1);position:absolute; left:12px; bottom:-13px; text-align:center;"><span style="height:16px;font-size:16px;font-weight:400;color:rgba(255,255,255,1);">魅力'+precharm+'-'+backcharm+'</span></div></li>')
      }
  }
  znlhCDN(); //子女立绘加域名
  scaleFunc(".cdnznlh",0.2);
}


//初始化服装图鉴
function initCloth (){
  $.ajax({
    url: 'portal/index/showCloth', type: "post", dataType:"JSON", success: function (msg) {
      showCloth(msg);
    }
  });
}

//服装图鉴--动态加载数据
$(function(){
  $('#clothRightarrow').click(function(){
    nowClothPage += 1;
    if(nowClothPage == maxClothPage){
      //隐藏右箭头
      $('#clothLeftarrow').html('<img src="'+url_prx+'index/leftarrow.png'+'"style="float:left; margin-left: 10px; margin-top: -256px; position: relative; z-index: 99; width: 86px; height: 86px;"></img>');
      $('#clothRightarrow').html('');
    }else{
      $('#clothLeftarrow').html('<img src="'+url_prx+'index/leftarrow.png'+'"style="float:left; margin-left: 10px; margin-top: -256px; position: relative; z-index: 99; width: 86px; height: 86px;"></img>');
      $('#clothRightarrow').html('<img src="'+url_prx+'index/rightarrow.png'+'"style="float: right;margin-right: 10px; margin-top: -256px; position: relative; z-index: 99; width: 86px; height: 86px;">');
    }
    $.ajax({
      url: 'portal/index/showCloth', type: "post", dataType:"json", success: function (msg) {
        showCloth(msg);
      }
    });
  });
  $('#clothLeftarrow').click(function(){
    nowClothPage -= 1;
    if(nowClothPage == 1){
      //隐藏左箭头
      $('#clothLeftarrow').html('');
      $('#clothRightarrow').html('<img src="'+url_prx+'index/rightarrow.png'+'"style="float: right;margin-right: 10px; margin-top: -256px; position: relative; z-index: 99; width: 86px; height: 86px;">');
    }else{
      $('#clothLeftarrow').html('<img src="'+url_prx+'index/leftarrow.png'+'"style="float:left; margin-left: 10px; margin-top: -256px; position: relative; z-index: 99; width: 86px; height: 86px;"></img>');
      $('#clothRightarrow').html('<img src="'+url_prx+'index/rightarrow.png'+'"style="float: right;margin-right: 10px; margin-top: -256px; position: relative; z-index: 99; width: 86px; height: 86px;">');
    }
    $.ajax({
      url: 'portal/index/showCloth', type: "post", dataType:"json", success: function (msg) {
        showCloth(msg);
      }
    });
  })
})

//服装图鉴-更新html
function showCloth(msg) {
  $(".tab-clothing-content").empty();
  //msgList = JSON.stringify(msg.list);
  maxClothPage = parseInt(JSON.parse(msg.maxPage));
  for(let i = (nowClothPage-1)*4; i<Math.min((nowClothPage-1)*4+4,msg.list.length); i++){
    let leftIndex = i - (nowClothPage-1)*4;
    left = leftIndex * 300;
    $(".tab-clothing-content").append('<li  onclick="queryCloth('+msg.list[i].id+')" style="width:300px; float:left;position:absolute;display:flex; justify-content:center;align-items:center;  left:'+left+'px;"><img src="'+msg.list[i].id+'" class="cdnsuit" style="height:398px;bottom:-360px;display:inline-block;position:absolute;"></li>');
  }
  suitCDN();
}

//服装图鉴详情弹窗
function queryCloth(id){
  $.ajax({
      url: 'portal/picture/clothPopDetail', 
      type: "post", 
      data:"id="+id,
      dataType:"json",
      success: showClothQuery,
  });
}

function showClothQuery(msg) {
  $('.popSuit').attr('src',msg[0].group);
  $(".popSuit").each(function(){
      var ogSrc = $(this).attr("src");
      if(ogSrc.indexOf(suitUrl) == -1){
        $(this).attr('src', suitUrl + ogSrc+".png");
      }
  })
  $('.cloth-container-content').html(''); //清空
  for(let i = 0; i<msg.length; i++){
      $('.cloth-container-content').append('<li class="clothPart"><div class="partname"><div class="nametext">'+msg[i].name+'</div></div><img src="'+msg[i].res+'"class="partpic" style="max-width:50%; margin-left:20px;"></li>')
      clothIconCDN(msg[i].res);
  }
  $('#clothPopModal').modal('show');
}



    
    