import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home/index.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    redirect: "/features",
    meta: {
      title: "报修系统",
    },
    children: [
      {
        path: "/features",
        name: "Features",
        component: () => import("../views/home/Features.vue"),
        meta: {
          title: "功能列表",
          loading: false,
        },
      },
      {
        path: "/person",
        name: "Person",
        component: () => import("../views/home/Person.vue"),
        meta: {
          title: "个人中心",
          loading: false,
        },
      },
    ],
  },
  // 微信登录
  {
    path: "/wechat",
    name: "Wechat",
    component: () =>
      import(/* webpackChunkName: "wechat" */ "../views/login/wechat.vue"),
  },
  // 我要报修
  {
    path: "/start",
    name: "Start",
    component: () => import("../views/repair/Start.vue"),
    meta: {
      title: "我要报修",
    },
  },
  // 订单详情
  {
    path: "/task-detail/:id",
    name: "TaskDetail",
    component: () => import("../views/service/TaskDetail.vue"),
    meta: {
      title: "我要报修",
    },
  },
  // 扫码签到
  {
    path: "/sign-in",
    name: "SignIn",
    component: () => import("../views/service/SignIn.vue"),
    meta: {
      title: "扫码签到",
    },
  },
  // 任务分配
  {
    path: "/task-allocate",
    name: "TaskAllocate",
    component: () => import("../views/service/TaskAllocate.vue"),
    meta: {
      title: "任务分配",
    },
  },
  // 待处理任务
  {
    path: "/task-todo",
    name: "TaskTodo",
    component: () => import("../views/service/TaskTodo.vue"),
    meta: {
      title: "待处理任务",
    },
  },
  // 维修中任务
  {
    path: "/task-running",
    name: "TaskRunning",
    component: () => import("../views/service/TaskRunning.vue"),
    meta: {
      title: "维修中任务",
    },
  },
  // 维修记录
  {
    path: "/task-record",
    name: "TaskRecord",
    component: () => import("../views/service/TaskRecord.vue"),
    meta: {
      title: "维修记录",
    },
  },
  // 永久对策任务
  {
    path: "/task-permanent-decision",
    name: "TaskPermanentDecision",
    component: () => import("../views/service/TaskPermanentDecision.vue"),
    meta: {
      title: "永久对策任务",
    },
  },
  // 协助任务
  {
    path: "/task-assist",
    name: "TaskAssist",
    component: () => import("../views/service/TaskAssist.vue"),
    meta: {
      title: "协助任务",
    },
  },
  // 资料查询
  {
    path: "/rep-file/:id",
    name: "RepFile",
    component: () => import("../views/service/RepFile.vue"),
    meta: {
      title: "资料查询",
    },
  },
  // 维修履历
  {
    path: "/rep-record/:id",
    name: "RepRecord",
    component: () => import("../views/service/RepRecord.vue"),
    meta: {
      title: "维修履历",
    },
  },
];

const router = new VueRouter({
  routes,
});

let loadingTimer = "";
let startTime = 0;
let endTime = 0;
let minInterval = 600;

router.beforeEach((to, from, next) => {
  // 修改页面title
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  }

  // 显示返回按钮
  if (to.meta.returnBtn) {
    store.dispatch("handleOpenPageReturn");
  } else {
    store.dispatch("handleClosePageReturn");
  }

  // 计算loading
  if (to.meta.loading !== false) {
    startTime = new Date().getTime();
    clearTimeout(loadingTimer);
    store.dispatch("handleOpenLoading");
  }

  next();
});

router.afterEach((to) => {
  if (to.meta.loading !== false) {
    endTime = new Date().getTime();
    const interval = endTime - startTime;
    if (interval < minInterval) {
      loadingTimer = setTimeout(() => {
        store.dispatch("handleCloseLoading");
      }, minInterval - interval);
    } else {
      store.dispatch("handleCloseLoading");
    }
  }
});

export default router;
