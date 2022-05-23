// components/mybutton/mybutton.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        color:{
            type:String,
            value:'orange'
        },
        text:{
            type:String,
            value:'按钮'
        },
        type:{
            type:String,
            value:'rect'
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        tapTime:new Date().getTime()
    },

    /**
     * 组件的方法列表
     */
    methods: {
        tapEvent(){ //双击事件
            let d=new Date();
            let now=d.getTime();
            let diff=now-this.data.tapTime;
            if(diff<350){
                console.log('触发双击事件')
            }
            this.data.tapTime=now;
        }
    }
})
