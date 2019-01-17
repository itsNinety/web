/*******
 * 图鉴相关js
 ******/
var skin1Show = false;
var heroMsg;


//根据侍从属性确定底板颜色
$(function(){
    $('.普通').attr('src', url_prx+'pictures/baseplate-common.jpg')
    $('.优秀').attr('src', url_prx+'pictures/baseplate-outstanding.jpg')
    $('.珍稀').attr('src', url_prx+'pictures/baseplate-rare.jpg')
    $('.国士').attr('src', url_prx+'pictures/baseplate-nation.jpg')
})


function query(id){
    $.ajax({
        url: 'scPopDetail', 
        type: "post", 
        data:"id="+id,  
        success: showQuery,
    });
}

// 侍从详情弹窗
function showQuery(msg){
    msg = JSON.parse(msg);
    heroMsg = msg; 
    popHeroID = msg.hero_id; //当前弹窗的英雄id
    //判断有无皮肤，若有，优先显示皮肤
    if(msg.skin2 == ''){
        $('.heroSkin1')[0].style.display = "block";
        $('.heroSkin2')[0].style.display = "none";
        $('.heroSkin2')[0].style.width = "420px";
        $('.popHeroPic1').attr('src',sclhUrl+msg.skin1+'.png');
    }else{
        skin1Show = false; //优先显示皮肤
        $('.heroSkin1')[0].style.display = "none";
        $('.heroSkin2')[0].style.display = "block";
        $('.heroSkin2')[0].style.width = "620px";
        $('.popHeroPic2').attr('src',sclhUrl+msg.skin2+'.png');
        $('.skinDesc').html(msg.name+'皮肤');
    }
    $('#popname').html(msg.name);
    $('#poptalant').html(msg.talant+'侍从');
    $('#popculture').html(msg.culture);
    $('#poporigin').html(msg.origin);
    $('#pophobby').html(msg.hobby);
    $('#popbattle_type').html(msg.battle_type);
    $('#popbiography').html(msg.biography);
    $('#hero-head').attr('src','')//先清除
    $('#hero-head').attr('src',sctxUrl+msg.hero_id+'.png')
    $('#popskill_icons').html('');
    for(var i = 0; i< msg.skill_icon_list.length; i++){
        $('#popskill_icons').append('<li style="float:left"><img src="'+skillIconUrl+msg.skill_icon_list[i]+'.png" class="cdnicon" style=" max-width:60px; max-height:60px; margin-top:20px; margin-left: 13px;"></li>');
        showSkill(i);
    }
    $('#popfate_lists').html('');
    for(var i = 0; i<msg.fate_list.length; i++){
        $('#popfate_lists').append('<span style="float: left;margin-top:18px;height:16px; font-size:16px;">'+msg.fate_list[i]['name']+': '+msg.fate_list[i]['fate_desc']+'</span>');
    } 
    $('#scPopModal').modal('show');
}

// 弹窗中获取技能详情
var skillNamePOP = '';
var skillDescPOP = '';
var popHeroID;
function getSkillDetail(i){  
    skillNamePOP = ''
    skillDescPOP = '';    
    $.ajax({
        cache: false,
        async: false,
        type: "POST",
        data: {
            heroid: popHeroID,
            skillid: i,
        },
        url: "skillDetail",
        success: function (msg) {
            var msg = JSON.parse(msg);
            skillDescPOP += "<div style='float:left; margin-top:-30px; margin-left:-220px;'><img src='"+skillIconUrl+msg.icon+".png' class='skill-icon cdnicon'><div class='skill-name'>【"+msg.name+"】</div><div class='skill-desc'>"+msg.skill_desc+"</div></div>";
        }
    });
    return skillDescPOP;
}
function showSkill(i) {
    $(".cdnicon").popover({
        trigger: 'hover',
        placement: 'top',
        html: 'true',
        content: getSkillDetail(i),
    })
};

//触碰到箭头停止动画，移开开始动画
$('.heroSkin2').on('mousemove','.skinLeftarrow', stopAnim)
$('.heroSkin2').on('mousemove','.skinRightarrow',stopAnim)
$('.heroSkin2').on('mouseleave','.skinLeftarrow', startAnim)
$('.heroSkin2').on('mouseleave','.skinRightarrow', startAnim)
function stopAnim(){
    $('.skinLeftarrow').css('animation-play-state','paused');
    $('.skinRightarrow').css('animation-play-state','paused'); 
}
function startAnim() {
    $('.skinLeftarrow').css('animation','leftmove 1s infinite');
    $('.skinRightarrow').css('animation','rightmove 1s infinite');
}
//弹窗中，若有皮肤，箭头点击切换皮肤和原画
$('.heroSkin2').on('click','.skinLeftarrow', changeSkin)
$('.heroSkin2').on('click','.skinRightarrow', changeSkin)
function changeSkin(){
    if(skin1Show == true){
        //当前显示的是原画，切换到皮肤
        skin1Show = false;
        $('.popHeroPic2').attr('src',sclhUrl+heroMsg.skin2+'.png');
        $('.popHeroPic2')[0].style.width = "620px";
        $('.popHeroPic2')[0].style.marginLeft = "0px";
        $('.skinDesc')[0].style.display = "block";
    }else{
        //当前显示的是皮肤，切换到原画
        skin1Show = true;
        $('.popHeroPic2').attr('src',sclhUrl+heroMsg.skin1+'.png');
        $('.popHeroPic2')[0].style.width = "420px";
        $('.popHeroPic2')[0].style.marginLeft = "132px";
        $('.skinDesc')[0].style.display = "none";
    }
}

//血统详情弹窗
function queryBlood(id){
    $.ajax({
        url: 'bloodPopDetail', 
        type: "post", 
        data:"id="+id, 
        success: showBloodQuery,
    });
}

function showBloodQuery(msg) {
    msg = JSON.parse(msg);
    //alert(msg.znData[0].id);
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
            $('.znList').append('<li style="width:136px;height:216px; float:left; margin-left:'+marleft+'px; position:absolute;display:flex;justify-content:center;align-items:center;text-align: center;"><img src="'+znMsg[i].res+'" class="cdnznlh" style="position:absolute; bottom:0; display:none;"><div style="width:120px;background:rgba(170,141,99,1);position:absolute; left:12px; bottom:-13px; text-align:center;"><span style="height:16px;font-size:16px;font-weight:400;color:rgba(255,255,255,1);">魅力'+precharm+'-'+backcharm+'</span></div></li>') 
        }else{
            //第二行
            let marleft = 56+192*(i-start-6);
            let precharm = znMsg[i].charm.split(':')[0];
            let backcharm = znMsg[i].charm.split(':')[1];
            $('.znList').append('<li style="width:136px;height:216px; float:left;margin-left:'+marleft+'px;margin-top:242px;position:absolute;display:flex;justify-content:center;align-items:center;text-align: center;"><img src="'+znMsg[i].res+'" class="cdnznlh" style="position:absolute; bottom:0; display:none;"><div style="width:120px;background:rgba(170,141,99,1);position:absolute; left:12px; bottom:-13px; text-align:center;"><span style="height:16px;font-size:16px;font-weight:400;color:rgba(255,255,255,1);">魅力'+precharm+'-'+backcharm+'</span></div></li>')
        }
    }
    znlhCDN(); //子女立绘加域名
    scaleFunc(".cdnznlh",0.2);
}


//服装图鉴详情弹窗
function queryCloth(id){
    $.ajax({
        url: 'clothPopDetail', 
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
        //scaleFunc(".partpic",0.5); //放缩到0.5
    }
    $('#clothPopModal').modal('show');
}