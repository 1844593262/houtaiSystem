import _ from 'lodash';
import $ from "jquery";
/**
 * 搜索或者重置方法
 *
 * @param {any} tableParams 列表请求参数
 * @param {any} queryParams 搜索请求参数
 * @param {any} type searchOrRest
 * @returns tableParams queryParams _params
 */

export function searchOrReset(tableParams, queryParams, type) {
    if (type == 'reset') {

        for (var key in queryParams) {
            queryParams[key] = '';
        }
    }
    _.extend(tableParams,{limit: 10,page: 1});
    let _params = _.extend({}, tableParams, queryParams);
    _.forEach(_params, (v, k) => {  //去除空的参数
        if (!v) {
            delete _params[k];
        }
    });
    return {
        tableParams,
        queryParams,
        _params
    };
}

export var mixin = {
    mounted(){
        if(this.$route.query.page){
            this.queryParams  = this.hasValue(this.$route.query,this.queryParams);
            this.getList(this.$route.query)
        }else {
            this.getList(this.tableParams);
        }
    },
    data(){
        return{
            tableParams: {
                limit: 10,
                page:Number(this.$route.query.page)?Number(this.$route.query.page):1
            },
        }
    },
    methods:{
        handleCurrentChange(val){
            // console.log(this.tableParams.page)
            // if (this.tableParams.page == 0){
            //     this.tableParams.page = Number(this.$route.query.page)
            //     return
            // }
            this.tableParams.page = val


            // if (val!=this.$route.query.page&&this.$route.query.page){
            //     this.tableParams.page = this.$route.query.page
            //
            // }
            //else {
            //     this.tableParams.page = Number(this.$route.query.page);
            // }
            // if (this.$route.query.page==1&&this.$route.query.page){
            //     this.tableParams.page =  Number(this.$route.query.page);
            //     console.log('-----'+this.$route.query.page+'------')
            //     // debugger;
            // }

            let _params = _.merge(this.tableParams, this.queryParams);
            _.forEach(_params, (v, k) => {
                if (!v) {
                    delete _params[k];
                }
            });
            _params.limit = 10;
            // debugger;
            // if(this.$route.curentpage&&this.$route.curentpage!=1){
            //     _params.page = Number(this.$route.query.page)
            //     this.tableParams.page =   _params.page
            // }

            this.$router.push({query:_params,path:this.$route.path});
            this.getList(_params);
        },
        search() {
            let {
                tableParams,
                queryParams,
                _params
            } = searchOrReset(this.tableParams, this.queryParams, 'search');
            this.tableParams = tableParams;
            this.$router.push({path:this.$route.path,query:_params});
            this.getList(_params);

        },
        hasValue(data,rule){
            $.each(rule,function (k,v) {
                $.each(data,function (key,value) {
                    if (k==key){
                        rule[k] = value;
                    }else {
                        rule[k] =''
                    }
                })
            })
            return rule
        },
        reset() {
            let {
                tableParams,
                queryParams,
                _params
            } = searchOrReset(this.tableParams, this.queryParams, 'reset');
            this.tableParams = tableParams;
            this.queryParams = queryParams;
            this.$router.push({path:this.$route.path,query:{}});
            this.getList({limit:10,page:1});
        },
    }
}
