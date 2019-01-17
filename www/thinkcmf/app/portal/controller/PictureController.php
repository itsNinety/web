<?php
//print_r($_SERVER);

namespace app\portal\controller;

use cmf\controller\HomeBaseController;
use app\admin\model\ThemeModel;
use think\Controller;
use think\Db;
use think\Model;

class PictureController extends HomeBaseController {

    //侍从图鉴
    public function attendant()
    {
        $params=$this->request->param();
        $condition['hero_id'] = array('egt',1); 
        $attendants = Db::name('portal_attendant')->where($condition)->paginate(16);
        // 把分页数据赋值给模板变量heros
        $this->assign('heros', $attendants);

        // 在 render 前，使用appends方法保持分页条件
        $attendants->appends($params);
        $this->assign('page', $attendants->render());//单独提取分页出来
        
        return $this->fetch(':attendant');
    }

    //血统图鉴
    public function blood()
    {
        $count = Db::name('attendant_culture')->count();
        $cultures = Db::name('attendant_culture')->paginate(19);
        $this->assign('bloods', $cultures);
        return $this->fetch(':blood');
    }

    //服装图鉴
    public function clothing()
    {
        $params=$this->request->param();
        $condition['id'] = array('egt',1); 
        $suits = Db::name('suit')->where($condition)->paginate(20);
        // 把分页数据赋值给模板变量heros
        $this->assign('suits', $suits);

        // 在 render 前，使用appends方法保持分页条件
        $suits->appends($params);
        $this->assign('page', $suits->render());//单独提取分页出来

        return $this->fetch(':clothing');
    }
    

    // 侍从详情弹窗
    public function scPopDetail(){
        $id = addslashes(trim($_POST['id']));
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

    //血统详情弹窗
    public function bloodPopDetail() {
        $id = addslashes(trim($_POST['id']));
        $condition['culture'] = $id;
        $znData = Db::name('son')->where($condition)->select(); //选取血统id匹配的所有子女
        $bloodData = Db::name('attendant_culture')->where('id',$id)->select(); //选取血统项
        $data = array(
            'znData' => $znData,
            'bloodData' => $bloodData,
        );
        echo json_encode((object)$data);
    }

    //服装详情弹窗
    public function clothPopDetail(){
        $id = addslashes(trim($_POST['id']));
        $condition['group'] = $id;
        $clothList = Db::name('cloth')->where($condition)->select();
        
        echo json_encode((object)$clothList);
    }
    
}