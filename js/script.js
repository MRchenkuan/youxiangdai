/**
 * Created by chenkuan on 2017/3/25.
 */
mui.init({
    swipeBack:true //启用右滑关闭功能
});
var showBirthDay = GetQueryString("is") == "full";

// 初始化弹出框
var completeBox = document.getElementById("completeBox");
var winHeight = window.innerHeight;
var winWidth = window.innerWidth;
completeBox.style.position = "fixed";
var $completeBox = mui("#completeBox");
// 绑定单选框
var company = document.getElementById("company");
company.addEventListener('selected',function(e){
    var value = e.detail.el.getAttribute("data-value");
    company.setAttribute("data-company-type",value);
});
var houseBondage = document.getElementById("houseBondage");
houseBondage.addEventListener('selected',function(e){
    var value = e.detail.el.getAttribute("data-value");
    houseBondage.setAttribute("data-hasHouseBondage",value);
});
var province = document.getElementById("province");
province.addEventListener('selected',function(e){
    var value = e.detail.el.getAttribute("data-value");
    province.setAttribute("data-province",value);
});

// 选项初始化 - 组件
var positionLeverPicker = new mui.PopPicker();
var marriagePicker = new mui.PopPicker();
var birthMouthPicker = new mui.DtPicker({type:'month',beginYear:1935,endYear:1999});
var workDatePicker = new mui.DtPicker({type:'month',beginYear:1949,endYear:2017});
// 选项初始化 - 点击数据
positionLeverPicker.setData([
    {value:'1',text:'普通员工'},
    {value:'2',text:'中层管理'},
    {value:'3',text:'高层管理'}
]);
marriagePicker.setData([
    {value:'1',text:'未婚'},
    {value:'2',text:'已婚'}
]);


// 选项初始化 - 目标对象
var workDate = document.getElementById("workDate");
var positionLevel = document.getElementById("positionLever");
var marriage = document.getElementById("marriage");
var birthMouth = document.getElementById("birthMouth");

// 日期点击事件
birthMouth.addEventListener("tap",function () {birthMouthPicker.show(function (selectItems) {
    birthMouth.setAttribute("data-date-year",selectItems.y.value);
    birthMouth.setAttribute("data-date-month",selectItems.m.value);
    birthMouth.querySelector(".valueText").innerText=selectItems.y.text+"年"+selectItems.m.text+"月";
})});
workDate.addEventListener("tap",function () {workDatePicker.show(function (selectItems) {
    workDate.setAttribute("data-date-year",selectItems.y.value);
    workDate.setAttribute("data-date-month",selectItems.m.value);
    workDate.setAttribute("data-value",selectItems);
    workDate.querySelector(".valueText").innerText=selectItems.y.text+"年"+selectItems.m.text+"月";
})});
// 固定选项点击事件
positionLevel.addEventListener("tap",function () {positionLeverPicker.show(function (selectItems) {
    positionLevel.setAttribute("data-value",selectItems[0].value);
    positionLevel.querySelector(".valueText").innerText=selectItems[0].text;
})});
marriage.addEventListener("tap",function () {marriagePicker.show(function (selectItems) {
    marriage.setAttribute("data-value",selectItems[0].value);
    marriage.querySelector(".valueText").innerText=selectItems[0].text;
})});

// 金额增减控件
var salaryCtrl = document.querySelector("#salary .mui-cus-btn-group");
var houseBondageFeeCtrl = document.querySelector("#houseBondageFee .mui-cus-btn-group");
var otherBondageFeeCtrl = document.querySelector("#otherBondageFee .mui-cus-btn-group");

// 金额增减事件
bindMoneyCtrl(salaryCtrl,100000,1000,1000);
bindMoneyCtrl(houseBondageFeeCtrl,50000,0,1000);
bindMoneyCtrl(otherBondageFeeCtrl,50000,0,1000);


//页面差异化处理
if(!showBirthDay){
    birthMouth.parentNode.removeChild(birthMouth);
}


// 工具函数
function bindMoneyCtrl(ctrl,max,min,pace) {
    var btns = ctrl.children;
    var btnMinus = btns[0];
    var display = btns[1];
    var btnPlus = btns[2];
    var totle = display.innerText *1;
    var primaryAmount = totle;

    btnMinus.addEventListener("tap",function () {
        totle=Math.max(min,totle-pace);
        display.setAttribute("data-amount",totle);
        display.innerText=totle;
    });

    btnPlus.addEventListener("tap",function () {
        totle=Math.min(max,totle + pace);
        display.setAttribute("data-amount",totle);
        display.innerText = totle >= max?">"+max:totle;
    });

    // 颜色事件
    ctrl.addEventListener("tap",function () {
        if(totle!=primaryAmount){
            display.classList.remove("defaultColor")
            display.classList.add("activeColor")
        }else{
            display.classList.remove("activeColor")
            display.classList.add("defaultColor")
        }
    })
}

function doCalculate() {

    // var boxHeight = completeBox.offsetHeight;
    // var boxWidth = completeBox.offsetWidth;
    // completeBox.style.left = (winWidth-boxWidth)/2 + "px";
    // completeBox.style.top = (winHeight-boxHeight)/2 + "px";

    var _company = company.getAttribute('data-company-type');
    var _birthMouth = showBirthDay?{
        y:birthMouth.getAttribute("data-date-year"),
        m:birthMouth.getAttribute("data-date-month")
        }:null;
    var _houseBondage = houseBondage.getAttribute("data-hasHouseBondage");
    var _workDate = {
        y:workDate.getAttribute("data-date-year"),
        m:workDate.getAttribute("data-date-month")
    };
    var _positionLevel = positionLevel.getAttribute("data-value");
    var _marriage = marriage.getAttribute("data-value");
    var _province = province.getAttribute("data-province");
    var _salary = salaryCtrl.children[1].getAttribute("data-amount");
    var _houseBondageFee = houseBondageFeeCtrl.children[1].getAttribute("data-amount");
    var _otherBondageFee = otherBondageFeeCtrl.children[1].getAttribute("data-amount");

    // 校验输入
    if(_company<=0){mui.toast("请选择工作单位");return false}
    if(showBirthDay&&!(_birthMouth.y&&_birthMouth.m)){mui.toast("请选择出生年月");return false}
    if(!(_workDate.y&&_workDate.m)){mui.toast("请选择首次参加工作的时间");return false}
    if(!_province){mui.toast("请选择是否是青岛籍");return false}
    if(!_houseBondage){mui.toast("请选择是否有房贷或透支");return false}

    console.log("_company",_company)
    console.log("_birthMouth",_birthMouth)
    console.log("_houseBondage",_houseBondage)
    console.log("_workDate",_workDate)
    console.log("_positionLevel",_positionLevel)
    console.log("_marriage",_marriage)
    console.log("_province",_province)
    console.log("_salary",_salary)
    console.log("_houseBondageFee",_houseBondageFee)
    console.log("_otherBondageFee",_otherBondageFee)

    $completeBox.popover("toggle");
}

function cancelSubmit() {
    $completeBox.popover('hide');
}
function doJoin() {
    mui.openWindow({url:'./personForm.html',id:'personForm'});
}


// 取url参数
function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = location.search.substr(1).match(reg);
    if(r!=null)return  decodeURI(r[2]); return null;
}
