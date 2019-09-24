import qs from 'querystring'
import {Http} from "../../src/submod/core/http";
import {Util} from "../../src/submod/core/utils";
import uuid from 'uuid/v4';

const Sa = require('string-random');
export module Oasis {

    export class Api {
        public static async request(config: any) {
            config.headers = {
                ...(config.headers || {}),
                "User-Agent": "okhttp/4.1.0",
            };
            const res = await Http.Api.request(config);
            res.ok = (res.ok && res.data.code === 0);
            return res;
        }

    }

    export class UrlContainer {

    }

    export class UrlType {

    }

    export enum UrlPath {
        timeline_user = "timeline/user",
        timeline_discovery = "timeline/discovery",
        following_recommend = "user/following_recommend",
        friendship_create = "friendship/create",
        friendship_destroy = "friendship/destroy",
        like_users = "like/users",
    }

    export class Account {
        public cuid: string = "0";
        public accessToken: string = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1NjgxNjY0MTQsIm5iZiI6MTU2ODE2NjQxNCwianRpIjoiOWQ5NjZiM2QtYjM5Zi00MDVjLTg5ZjktNGFkZmRiNTMxY2IzIiwiZXhwIjoxNTY5ODk0NDE0LCJpZGVudGl0eSI6NzMwMzg2NzU5NywiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.9vLKxzkZhSU9FJ0JiXL1HQ6JEl_5quZK_b5c9i6iYWc";
        private host: string = "https://oasis.chengdu.weibo.cn";
        public _form = {
            ua: 'Xiaomi-MI 5_oasis_1.4.2_Android_7.0',
            device_id: '',//系统生成的设备ID
            version: '1.4.2',//
            channel: 'ViVo',//手机平拍
            platform: 'ANDROID'
        };


        public randDevice() {
            this._form.device_id = Util.Coder.md5_encode(uuid());
        }

        /**
         * 获取我的关注的用户
         * @param cursor
         * @param ouid
         * @param count
         */
        public async friendShipFollowings(ouid: string, cursor: number = -1, count: number = 20) {
            const param: any = {
                ...this.form(),
                count: count,
                cursor: cursor,
                ouid: ouid,
            };
            param.sign = Sign.sign(param);
            return await this.request({
                url: this.host + '/v1/friendship/followings?' + qs.stringify(param),
                method: 'GET',
            })
        }

        /**
         * 关注
         * @param ouids
         */
        public async friendShipCreate(ouids: string) {
            const param: any = {
                ...this.form(),
                ouids: ouids,
            };
            param.sign = Sign.sign(param);
            return await this.request({
                url: this.host + '/v1/friendship/create?' + qs.stringify(param),
                method: 'GET',
            })
        }

        /**
         * 不关注
         * @param  ouid
         */
        public async friendShipDestroy(ouid: string) {
            const param: any = {
                ...this.form(),
                ouid: ouid,
            };
            param.sign = Sign.sign(param);
            return await this.request({
                url: this.host + '/v1/friendship/destroy?' + qs.stringify(param),
                method: 'GET',
            })
        }

        /**
         * following_recommend
         *
         * @param action
         * @param params
         */
        public async action(action: string, params: any = {}) {
            const param: any = {
                ...this.form(),
                ...params
            };
            param.sign = Sign.sign(param);
            return await this.request({
                url: this.host + `/v1/${action}?` + qs.stringify(param),
                method: 'GET',
            })
        }

        /**
         * 喜欢 和 不喜欢
         * @param  sid
         * @param type=create|destroy
         */
        public async like(sid: string, type: string = "create") {
            const param: any = {
                ...this.form(),
                sid: sid,
            };
            param.sign = Sign.sign(param);
            return await this.request({
                url: this.host + `/v1/like/${type}?` + qs.stringify(param),
                method: 'GET',
            })
        }

        /**
         * 喜欢的操作
         * @param action
         * @param params
         */
        public async likes(action: string, params: any = {}) {
            const param: any = {
                ...this.form(),
                ...params
            };
            param.sign = Sign.sign(param);
            return await this.request({
                url: this.host + `/v1/like/${action}?` + qs.stringify(param),
                method: 'GET',
            })
        }

        /**
         * 评论
         * @param  sid
         * @param comment
         * @param type=create|destroy
         */
        public async comment(sid: string, comment: string = "[爱你][爱你][爱你]", type: string = "create") {
            const param: any = {
                ...this.form(),
                sid: sid,
                comment: comment,
                source_cid: 0,
                source_uid: 0,
            };
            param.sign = Sign.sign(param);
            return await this.request({
                url: this.host + `/v1/comment/${type}?` + qs.stringify(param),
                method: 'GET',
            })
        }

        /**
         * timeline下面的东西
         * @param action
         * @param params
         */
        public async timeline(action: string, params: any = {}) {
            const param: any = {
                ...this.form(),
                ...params
            };
            param.sign = Sign.sign(param);
            return await this.request({
                url: this.host + `/v1/timeline/${action}?` + qs.stringify(param),
                method: 'GET',
            })
        }

        /**
         * 获取用户信息吧
         * @param cursor
         * @param ouid
         */
        public async timelineUser(ouid: string, cursor: number = -1) {
            //, count: number = 18
            const param: any = {
                ...this.form(),
                count: 18,//其他数字好像不行
                cursor: cursor,
                ouid: ouid,
            };
            param.sign = Sign.sign(param);
            return await this.request({
                url: this.host + '/v1/timeline/user?' + qs.stringify(param),
                method: 'GET',
            })
        }

        /**
         * 获取验证码
         * @param phone
         */
        public async captcha(phone: string) {
            const param: any = {
                ...this.form(),
                phone: phone,
            };
            param.sign = Sign.sign(param);
            return await this.request({
                url: this.host + '/v1/user/captcha?' + qs.stringify(param),
                method: 'GET',
            }, false)

        }

        /**
         * 验证码登录
         * @param phone
         * @param captcha
         */
        public async login(phone: string, captcha: string) {
            //https://oasis.chengdu.weibo.cn/v1/user/captcha
            const param: any = {
                ...this.form(),
                phone: phone,
                captcha: captcha
            };
            param.sign = Sign.sign(param);
            return await this.request({
                url: this.host + '/v1/user/login?' + qs.stringify(param),
                method: 'GET',
            }, false)

        }

        /**
         * 获取默认的设备表单信息
         */
        public form() {
            return {
                timestamp: new Date().getTime(),
                cuid: this.cuid,
                noncestr: Sign.noncestr(),//随机字符串
                ...this._form
            }
        }


        /**
         * 发送请求
         * @param config
         * @param auth 是否需要授权参数
         */
        private async request(config: any, auth: boolean = true) {
            if (auth) {
                config.headers = {
                    ...(config.headers || {}),
                    "Authorization": `Bearer ${this.accessToken}`
                }
            }
            return await Api.request(config);
        }
    }

    export class Sign {
        public static signKey = "mz@>3(0N4ml0NNOM3n";
        // public static signKey = ">Z|w`w9zwxq9Ebd";

        //.data:00029079	00000020	C	w$%\"#$tp&'/\"&&&trr.!u s&% #w/&&t

        public static sign(params: any): string {
            //1.排序
            let dt: string[] = [];
            Object.keys(params).forEach((k) => {
                dt.push(`${k}=${params[k] + ''}`);
            });
            dt.sort((a, b) => {
                return a < b ? -1 : a > b ? 1 : 0
            });
            const signStr = `${this.signKey}&${dt.join("&")}`;
            return Util.Coder.md5_encode(signStr);
        }

        //app签名
        public static getAppSign() {

        }

        //随机生成一个字符串
        public static noncestr(len: number = 30) {
            return Sa(len);
        }


    }

    //转化数据库的
    export class Storage {
        public static models: any = {};

        /**
         * 保存post
         * @param statuses
         */
        public static async savePosts(statuses: any[]) {
            const ps = [];
            for (const state of statuses) {
                const user = state.user;
                const conv = await this.models.posts.findOneAndUpdate({id: state.id}, {
                    $set: {...state, uid: user.uid,},
                }, {upsert: true});
                ps.push(conv);
            }
            return await Promise.all(ps);
        }

        /**
         * 保存用户列表
         * @param users
         */
        public static async saveUsers(users: any[]) {
            const ps = [];
            for (const user of users) {
                const conv = await this.models.users.findOneAndUpdate({uid: user.uid}, {
                    $set: {...user},
                }, {upsert: true});
                ps.push(conv);
            }
            return await Promise.all(ps);
        }
    }
}
