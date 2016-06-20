/**
 * Created by tommy on 2016/6/19.
 */

import base from './base';

module.exports = {
    goTo(url){
        window.location.href= base.local_url + url;
        return false;//prevent navigation to that link
    }
};