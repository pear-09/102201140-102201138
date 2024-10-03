<template>
  <div class="hello">
    <h3>发现页面</h3>
    <button @double-click="count += 1">点击:count={{ count }}</button>
    <button @click = "clickhandle">按钮</button>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import { ReactiveFlags } from 'vue';

export default {
  name: 'HelloWorld',
  data(){
    return{
      count:1,
      message:"xiaoxi111111"
      }
    },
  methods:{
    clickhandle(){
      this.message = "xiaoxi22222"
      console.log(event);
      event.target.innerHTML = "点击之后"
    }
  }
  }
</script>
