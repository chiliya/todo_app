<template>
  <div class="home">
      <AppBar title="TODO" left="bars" right="search"></AppBar>
      <Avatar></Avatar>
      <Gradient></Gradient>
      <TodoList></TodoList>
      <TodoDetail></TodoDetail>
      <TodoEditing></TodoEditing>
      <FloatingButton></FloatingButton>
  </div>
</template>

<script>
import AppBar from '../components/AppBar.vue'
import Avatar from '../components/Avatar.vue'
import FloatingButton from '../components/FloatingButton.vue'
import Gradient from '../components/Gradient.vue'
import TodoList from '../components/TodoList.vue'
import TodoDetail from '../components/TodoDetail.vue'
import TodoEditing from '../components/TodoEditing.vue'
export default {
    data () {
    return {

    }
  },
  components: {
      AppBar,
      Avatar,
      FloatingButton,
      Gradient,
      TodoList,
      TodoDetail,
      TodoEditing
    
  }
}

</script>

<style>
.home {
    height: 100%;
    width: 100%;
    overflow: hidden;
    color: white;
}
</style>
