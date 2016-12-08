# msg-system-with-vue

> 一个简单的消息管理系统

## 命名空间
```
//摘自官网

// types.js

// 定义 getter、action、和 mutation 的名称为常量，以模块名 `todos` 为前缀
export const DONE_COUNT = 'todos/DONE_COUNT'
export const FETCH_ALL = 'todos/FETCH_ALL'
export const TOGGLE_DONE = 'todos/TOGGLE_DONE'
// modules/todos.js
import * as types from '../types'

// 使用添加了前缀的名称定义 getter、action 和 mutation
const todosModule = {
  state: { todos: [] },

  getters: {
    [types.DONE_COUNT] (state) {
      // ...
    }
  },

  actions: {
    [types.FETCH_ALL] (context, payload) {
      // ...
    }
  },

  mutations: {
    [types.TOGGLE_DONE] (state, payload) {
      // ...
    }
  }
}
```
__以及@jxlarrea的命名空间方法__：

```
// namespace.js helper utility

function mapValues (obj, f) {
    const res = {}
    Object.keys(obj).forEach(key => {
        res[key] = f(obj[key], key)
    })
    return res
}

export default (module, types) => {
    let newObj = {};

    mapValues(types, (names, type) => {       
        newObj[type] = {};
        types[type].forEach(name=> {
            var newKey = module + ':' + name;             
            newObj[type][name] = newKey;
        });
    })   
    return newObj;
}
```
```
// types.js

import namespace from 'utils/namespace'

export default namespace('auth', {
    getters: [
        'user'
    ],
    actions: [
        'fetchUser'
    ],
    mutations: [
        'receiveUser'     
    ]
})

```
```
//module.js

import * as accountApi from 'api/account'
import types from './types'

const state = {
    user: null
}

const actions = {
    [types.actions.fetchUser]: context => {
        return accountApi.me().then(response => {
            context.commit(types.mutations.receiveUser, response)
        });
    }
}

const getters = {
    [types.getters.user]: state => state.user
}

const mutations = {
    [types.mutations.receiveUser]: (state, apiResponse) => {
        state.user = apiResponse.payload;
    }
}

export default {
  state,
  actions,
  getters,
  mutations
};
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

[教程地址](https://metricloop.com/blog/how-to-use-vuex-to-build-a-feature?utm_campaign=Revue%20newsletter&utm_medium=Newsletter&utm_source=revue)


![demo GIF](https://ooo.0o0.ooo/2016/12/08/58494afc547d1.gif)

