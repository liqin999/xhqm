<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>
<script>
    export default {
        data (){
            return {
            }
        },
        components: {},
        mounted(){},
        methods: {}
}
</script>

<style>
    @import url("assets/icon/iconfont.css");
    html, body{
		/* height: 100%; */
	}
    /*css reset*/
    html,body, h1, h2, h3, h4, h5, h6, hr, p, dl, dt, dd, ul, ol, th, td, pre, blockquote, fieldset, lengend, input, button, textarea, form{margin: 0; padding: 0;}
    body, input, button, textarea, select{/*font-family:"\5FAE\8F6F\96C5\9ED1","Microsoft YaHei", Helvetica, Tahoma, Arial, sans-serif;*/}
    h1, h2, h3, i, th, caption, code, address,b,cite,dfn,em,var{font-style: normal; font-weight: normal;}
    ul,ol,li{list-style: none;}
    img, fieldset, button, input{border:none;}
    input, textarea, button,img{outline:none;}
    hr{border:none; height:1px;}
    button, input, select, textarea {font-size: 100%;}
    code,kbd,pre,samp,tt{font-family:courier new,courier,monospace}
    small{font-size:12px}
    table{border-collapse:collapse; border-spacing:0;}
    button, input, select, label{vertical-align:middle;}
    body{ background:#fff; font-family: "微软雅黑" !important;font-size:14px !important;line-height:1.5em !important;color:#434343 !important;}
    sup{vertical-align:text-top}
    sub{vertical-align:text-bottom}
    legend{color:#000}
    a{outline:none; text-decoration:none !important;}
    a:focus{outline:none;}
    /* 让链接在 hover 状态下显示下划线 */
	a:link{
		text-decoration:none;
	}
	a:visited{
		text-decoration:none;
	}
    a:hover{
		text-decoration:none;
	}
    a:active{
		text-decoration:none;
	}
    .clearfix{_zoom:1;}
    .clearfix:after{content:""; clear: both; display:block;}
    header, hgroup, nav, menu, main, section, article, summary, details, aside, figure, figcaption, footer{display: block;}

    /*gq*/
    button{background: none;}
    [ng\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide{display:none !important;}ng\:form{display:block;}.ng-animate-start{clip:rect(0,auto,auto,0);-ms-zoom:1.0001;}.ng-animate-active{clip:rect(-1px,auto,auto,0);-ms-zoom:1;}
    body {
        font-family: Arial, Helvetica, sans-serif;
        overflow-x: hidden
    }

    table {
        font-size: 1em;
    }

    .ui-draggable, .ui-droppable {
        background-position: top;
    }
</style>

