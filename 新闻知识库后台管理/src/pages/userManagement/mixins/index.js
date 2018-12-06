export const userMixins = {
    data() {
        return {
            windowHeight: {         // 浏览器的工作区高度
                height: ""
            }
        }
    },
    mounted() {
        // 组件加载后获取 当前浏览器的高度
        this.windowHeight.height = document.body.clientHeight - '80';
        // 监听浏览器窗口大小改变 高度
        window.onresize = () => {
            this.windowHeight.height = document.body.clientHeight - '80';
        };
    },
    computed: {
        contentHeight(){
            return this.$store.state.storeCommon.contentHeight;
        }
    }
}