/**
 * Created by chenkuan on 2017/3/25.
 */
mui.init({
    swipeBack:true //启用右滑关闭功能
});
// 控件
var branchArea = document.querySelector("#branchArea");
var branchBank = document.querySelector("#branchBank");
var arrivedDate = document.querySelector("#arrivedDate");

// 选项初始化 - 组件
var branchAreaPicker = new mui.PopPicker();
var branchBankPicker = new mui.PopPicker();
var arrivedDatePicker = new mui.DtPicker({
    "type":"hour",
    "customData":{
        "h":[
            {"text":"上午","value":"上午"},
            {"text":"下午","value":"下午"}
            ]
    },
    "labels":["年", "月", "日", "时段", "分"],
    beginYear:(new Date()).getFullYear()
});

// 选项初始化 - 数据
branchAreaPicker.setData([
    {value:370202,text:'市南区'},
    {value:370203,text:'市北区'},
    {value:370211,text:'黄岛区'},
    {value:370212,text:'崂山区'},
    {value:370213,text:'李沧区'},
    {value:370214,text:'城阳区'},
    {value:370281,text:'胶州市'},
    {value:370282,text:'即墨市'},
    {value:370283,text:'平度市'},
    {value:370285,text:'莱西市'}
])
branchBankPicker.setData([
    {value:1,text:"孙受支行"},
    {value:1,text:"武备支行"},
    {value:1,text:"姜山支行"},
    {value:1,text:"尚庄支行"},
    {value:1,text:"开发区支行"}
]);

// 选项初始化 - 事件监听
branchArea.addEventListener("tap",function () {
    branchAreaPicker.show(function (selectItems) {
        branchArea.setAttribute("data-value",selectItems[0].value);
        branchArea.querySelector(".valueText").innerText=selectItems[0].text;
    })
});
branchBank.addEventListener("tap",function () {
    branchBankPicker.show(function (selectItems) {
        branchBank.setAttribute("data-value",selectItems[0].value);
        branchBank.querySelector(".valueText").innerText=selectItems[0].text;
    })
});

arrivedDate.addEventListener("tap",function () {
    console.log(222)
    arrivedDatePicker.show(function (selectItems) {
        arrivedDate.setAttribute("data-value",selectItems);
        arrivedDate.querySelector(".valueText").innerText=selectItems;
    })
});

function doSubmit() {
    var name = document.querySelector("#name").value;
    var phone = document.querySelector("#phone").value;
    var branchArea = document.querySelector("#branchArea").getAttribute("data-value");
    var branchBank = document.querySelector("#branchBank").getAttribute("data-value");
    var recCode = document.querySelector("#recCode").value;
    var arrivedDate = document.querySelector("#arrivedDate").getAttribute("data-value");

    if(!name){mui.toast("请填写姓名");return false}
    if(!phone&&phone.length!=11){mui.toast("请填写正确的手机号");return false}
    if(!branchArea){mui.toast("请选择经办区域");return false}
    if(!branchBank){mui.toast("请选择经办支行");return false}
    if(!arrivedDate){mui.toast("请填预约时间");return false}

    mui.alert("提交成功!","恭喜",function () {
        console.log(name,phone,branchArea,branchBank,recCode,arrivedDate)
        mui.openWindow({url:'./index.html',id:'personForm'});
    })
}