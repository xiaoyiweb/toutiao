import Vue from 'vue'
import moment from "moment";

moment.locale('zh-cn');

Vue.filter('formatTime', function (val) {
    return moment(val).fromNow();
})