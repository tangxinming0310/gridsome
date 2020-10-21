<template>
    <div>
        <el-card shadow="never">
            <el-menu :default-active="active" @select="onSelect">
                <el-menu-item v-for="item in constantRouterMap" 
                    :key="item.path" :index="item.path">
                    <i :class="item.icon"></i>
                    <span slot="title">{{item.title}}</span>
                </el-menu-item>
            </el-menu>
        </el-card>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                active: "/new",
                parentUrl: "",
                menuList: [],
                constantRouterMap:[
                    {
                        path:'/new',
                        icon:'el-icon-star-off',
                        title: '最新动态'

                    },{
                        path:'/social',
                        icon:'el-icon-mobile-phone',
                        title: '社交圈'
                    },{
                        path:'/blog',
                        icon:'el-icon-edit-outline',
                        title: '博客列表'
                    },{
                        path:'/project',
                        icon:'el-icon-service',
                        title: '开源项目'
                    }
                ]
            }
        },
        computed: {
        
        },
        mounted() {
            let arr = this.$route.path.split("/")
            this.active = "/" + arr[1] 
        },
        methods: {
            onSelect(index) {
                this.$router.push(index)
            },
            openTokenDialog() {
                this.$refs.tokenDialog.open(() => {
           
                })
            },
            cancellation() {
                this.$store.dispatch("Cancellation")
            }
        }
    }
</script>