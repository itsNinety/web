<?php

namespace app\portal\controller;

use cmf\controller\HomeBaseController;
use app\portal\service\PostService;
use think\Db;
use think\Model;

class IndexController extends HomeBaseController
{
    public function index()
    { 
        $params=$this->request->param();
        // 查询状态为1的用户数据 并且每页显示19条数据
        $condition['id'] = array('gt',1); 
        $posts = Db::name('portal_post')->where($condition)->paginate(19);
        // 把分页数据赋值给模板变量users
        $this->assign('portal_post', $posts);

        // 在 render 前，使用appends方法保持分页条件
        $posts->appends($params);
        $this->assign('page', $posts->render());//单独提取分页出来

        // 渲染模板输出
        return $this->fetch(':index');
    }

    //文章页
    public function article()
    {
        $id = $this->request->param('id', 1, 'intval');
        $cid = $this->request->param('cid', 1, 'intval');
        return $this->fetch(':article');
    }

    //新闻页
    public function news()
    {
        $params=$this->request->param();
        $condition1['category_id'] = "2";
        $condition1['status'] = "1";//已发布
        $catelists = Db::name('portal_category_post')->where($condition1)->select();
        $count = $catelists->count();
        $postsArray = array();
        for($i=0 ;$i < $count; ++$i){ 
            array_push($postsArray,$catelists[$i]['post_id']);
        }

        $condition2['id'] = array('in',$postsArray);
        $posts = Db::name('portal_post')->where($condition2)->order('update_time','DESC')->paginate(9); //根据发布时间倒序排序
        $this->assign('portal_post', $posts);

        // 在 render 前，使用appends方法保持分页条件
        $posts->appends($params);
        $this->assign('page', $posts->render());//单独提取分页出来

        return $this->fetch(':news');
    }

    //公告页
    public function gonggao()
    {
        $params=$this->request->param();
        $condition1['category_id'] = "3";
        $condition1['status'] = "1";//已发布
        $catelists = Db::name('portal_category_post')->where($condition1)->select();
        $count = $catelists->count();
        $postsArray = array();
        for($i=0;$i<$count;++$i){ 
            array_push($postsArray,$catelists[$i]['post_id']);
        }
        $condition2['id'] = array('in',$postsArray);
        $posts = Db::name('portal_post')->where($condition2)->order('update_time','DESC')->paginate(9);
        // 把分页数据赋值给模板变量portal_post
        $this->assign('portal_post', $posts);

        // 在 render 前，使用appends方法保持分页条件
        $posts->appends($params);
        $this->assign('page', $posts->render());//单独提取分页出来

        return $this->fetch(':gonggao');
    }

    //活动页
    public function active()
    {
        $params=$this->request->param();
        $condition1['category_id'] = "4";
        $condition1['status'] = "1";//已发布
        $catelists = Db::name('portal_category_post')->where($condition1)->select();
        $count = $catelists->count();
        $postsArray = array();
        for($i=0;$i<$count;++$i){ 
            array_push($postsArray,$catelists[$i]['post_id']);
        }
        $condition2['id'] = array('in',$postsArray);
        $posts = Db::name('portal_post')->where($condition2)->order('update_time','DESC')->paginate(9);
        // 把分页数据赋值给模板变量portal_post
        $this->assign('portal_post', $posts);

        // 在 render 前，使用appends方法保持分页条件
        $posts->appends($params);
        $this->assign('page', $posts->render());//单独提取分页出来

        return $this->fetch(':active');
    }

    //游戏特色页面
    public function feature(){
        return $this->fetch(':feature');
    }

    //活动攻略
    public function strategyActive(){
        $params=$this->request->param();
        // 查询相应数据 并且每页显示9条数据
        $condition1['category_id'] = "5";
        $condition1['status'] = "1";//已发布
        $catelists = Db::name('portal_category_post')->where($condition1)->select();
        $count = $catelists->count();
        $postsArray = array();
        for($i=0;$i<$count;++$i){ 
            array_push($postsArray,$catelists[$i]['post_id']);
        }
        $condition2['id'] = array('in',$postsArray);
        $posts = Db::name('portal_post')->where($condition2)->order('update_time','DESC')->paginate(9);
        // 把分页数据赋值给模板变量portal_post
        $this->assign('portal_post', $posts);

        // 在 render 前，使用appends方法保持分页条件
        $posts->appends($params);
        $this->assign('page', $posts->render());//单独提取分页出来

        return $this->fetch(':strategyActive');
    }

    //女皇成长攻略
    public function strategyGrow(){
        $params=$this->request->param();
        $condition1['category_id'] = "6";
        $condition1['status'] = "1";//已发布
        $catelists = Db::name('portal_category_post')->where($condition1)->select();
        $count = $catelists->count();
        $postsArray = array();
        for($i=0;$i<$count;++$i){ 
            array_push($postsArray,$catelists[$i]['post_id']);
        }
        $condition2['id'] = array('in',$postsArray);
        $posts = Db::name('portal_post')->where($condition2)->order('update_time','DESC')->paginate(9);
        // 把分页数据赋值给模板变量portal_post
        $this->assign('portal_post', $posts);

        // 在 render 前，使用appends方法保持分页条件
        $posts->appends($params);
        $this->assign('page', $posts->render());//单独提取分页出来
        
        return $this->fetch(':strategyGrow');
    }

    //兑换礼包
    public function gift() {
        return $this->fetch(':gift');
    }

    //切换侍从图片
    public function changePic(){
        $id = addslashes(trim($_POST['nowid']));
        $arrow = addslashes(trim($_POST['arrow']));
        //数据库排序
        $db = db('portal_attendant');
        $info = $db -> order('hero_id','ACS');

        //判断是上个侍从还是下个侍从
        if($arrow == 'right'){
            //构建查询数组
            $condition['hero_id'] = array('gt',$id); //比当前侍从id大的数组
            $Info = $info->where($condition)->find(); //选取下一条数据
            $id = $Info['hero_id']; //更新侍从id
        }else{
            // 构建查询数组
            $condition['hero_id'] = array('lt',$id); //比当前侍从id小的数组
            $Info = $info->where($condition)->order('hero_id','DESC')->find(); //选取下一条数据，注意倒序
            $id = $Info['hero_id']; //更新侍从id
        }

        $first = 0;
        $last = 0;
        //判断是否是第一个或最后一个
        if($id == 1){
            $first = 1;
        }else if(array('lt',$id) == null){
            $last = 1;
        }

        //查找相应数据并传输
        $value = Db::name('portal_attendant')->find($id);
        $culture_data = Db::name('attendant_culture')->find($value['culture']); //取血统
        //取该侍从的技能信息，获取技能数据库
        $dbdataSkill = Db::name('attendant_skill');
        //构造查询条件
        $conditionSkill['hero_id'] = $id;
        //查询数据，获得技能数组
        $listSkill = $dbdataSkill->where($conditionSkill)->select();
        $skill_icon_list = array();
        $numSkill = count($listSkill);
        for($i=0;$i<$numSkill;++$i){ 
            array_push($skill_icon_list,$listSkill[$i]['icon']);
        }
        //取该侍从的缘分信息,获取缘分数据库
        $dbdataFate = Db::name('attendant_fate');
        //构造查询条件
        $conditionFate['hero_id'] = $id;
        //查询数据，获得缘分数组
        $listFate = $dbdataFate->where($conditionFate)->select();
        $fate_list = array();
        $numFate = count($listFate);
        for($i=0;$i<$numFate;++$i){ 
            array_push($fate_list,$listFate[$i]);
        }
        $data = array(
            'isFirst' => $first,
            'isLast' => $last,
            'id' => $value['hero_id'], 
            'name' => $value['name'], 
            'talant' => $value['talant'], 
            'culture' => $culture_data['name'], //血统，从血统表中取血统名
            'origin' => $value['origin'],
            'hobby' => $value['hobby'],
            'battle_type' => $value['type_2'],
            'biography' => $value['desc'],
            'skill_icon_list' => $skill_icon_list, //技能图标数组
            'fate_list'=> $fate_list, //缘分
            'skin1' => $value['skin1'],
            'skin2' => $value['skin2'],
            'head' => $value['head'],
        );
        echo json_encode((object)$data); 
    }

    //返回技能详情
    public function skillDetail(){
        $heroid = addslashes(trim($_POST['heroid'])); //当前英雄id
        $skillid = addslashes(trim($_POST['skillid'])); //当前技能id[是指当前英雄的第几个技能,不是真正的技能顺序id,0-3]
        $dbdata = Db::name('attendant_skill'); //获取技能数据库
        // 构造查询条件
        $condition['hero_id'] = $heroid;
        // 查询数据
        $list = $dbdata->where($condition)->select();
        $listValue = $dbdata->where($condition)->select()[$skillid];
        $data = array(
            'id' => $listValue['id'], 
            'name' => $listValue['name'], 
            'skill_desc' => $listValue['skill_desc'],
            'icon' => $listValue['icon'],
        );
        echo json_encode((object)$data);
    }

    //返回第一个侍从信息(可通过模板输出)
    public function initAttendant() {
        $id = addslashes(trim($_POST['nowid']));
        $value = Db::name('portal_attendant')->find($id);
        $culture_data = Db::name('attendant_culture')->find($value['culture']); //取血统
        //取该侍从的技能信息，获取技能数据库
        $dbdataSkill = Db::name('attendant_skill');
        //构造查询条件
        $conditionSkill['hero_id'] = $id;
        //查询数据，获得技能数组
        $listSkill = $dbdataSkill->where($conditionSkill)->select();
        $skill_icon_list = array();
        $numSkill = count($listSkill);
        for($i=0;$i<$numSkill;++$i){ 
            array_push($skill_icon_list,$listSkill[$i]['icon']);
        }
        //取该侍从的缘分信息,获取缘分数据库
        $dbdataFate = Db::name('attendant_fate');
        //构造查询条件
        $conditionFate['hero_id'] = $id;
        //查询数据，获得缘分数组
        $listFate = $dbdataFate->where($conditionFate)->select();
        $fate_list = array();
        $numFate = count($listFate);
        for($i=0;$i<$numFate;++$i){ 
            array_push($fate_list,$listFate[$i]);
        }

        $data = array(
            'hero_id' => $value['hero_id'], //侍从id
            'name' => $value['name'], //名称
            'talant' => $value['talant'],  //资质
            'culture' => $culture_data['name'], //血统，从血统表中取数据
            'origin' => $value['origin'], //身世
            'hobby' => $value['hobby'], //爱好
            'battle_type' => $value['type_2'], //战斗类型
            'biography' => $value['desc'], //传记
            'skill_icon_list' => $skill_icon_list, //技能图标数组
            'fate_list'=> $fate_list, //缘分
            'skin1' => $value['skin1'], //原皮
            'skin2' => $value['skin2'], //皮肤资源
            'head' => $value['head'], //头像资源
        );
        echo json_encode((object)$data);
    }

    //返回美人血统图鉴
    public function initBlood() {
        //获取血统数据库
        $dbdataBlood = Db::name('attendant_culture');
        //选取前12条 
        $data = $dbdataBlood->limit(12)->select();
        
        echo json_encode($data);
    }


    //切换美人图鉴
    public function changeBlood() {
        $nowBloodPage = addslashes(trim($_POST['nowBloodPage']));
        //获取血统数据库
        $dbdataBlood = Db::name('attendant_culture');
        //根据多少页选取12条
        $start = ($nowBloodPage-1)*12;
        $data = $dbdataBlood->limit($start,12)->select();

        echo json_encode($data);
    }

    //返回服装图鉴(首页)
    public function showCloth() {
        // $dbdataCloth = Db::name('cloth');
        // $clothCount = $dbdataCloth->group("group")->count(); //总共的套装量
        $dbdataCloth = Db::name('suit');
        $clothCount = $dbdataCloth->count();
        $maxPage = $clothCount/4 + 1; //最大页数

        // $list = Db::name('cloth')->field('group')->group('group')->select();
        $list = Db::name('suit')->select();
        $data = array(
            'maxPage' => $maxPage, //最大页数
            'list' => $list,
        );
        echo json_encode((object)$data);
        
    }


}
