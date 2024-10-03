import { createStore } from 'vuex';

const store = createStore({
  state: {
    projects: [] // 初始化项目数组
  },
  mutations: {
    addProject(state, project) {
      state.projects.push(project); // 添加项目
    }
  },
  actions: {
    addProject({ commit }, project) {
      commit('addProject', project); // 提交添加项目的 mutation
    }
  },
  getters: {
    allProjects(state) {
      return state.projects; // 获取所有项目
    }
  }
});

export default store; // 导出 store
