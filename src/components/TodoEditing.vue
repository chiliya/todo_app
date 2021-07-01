<template>
 <transition name="edit">
     <div class="todo_editing" v-if="!!editing">
          <AppBar title="New Tasks" left="close" @left="toggleEditing"></AppBar>
          <div class="todo_editing_head">
              <p>你想计划做什么事？</p>
          </div>
          <div class="todo_editing_body">
              <textarea rows="3" v-model="editing.text"></textarea>
              <p class="todo_editing_meta">
                  <i class="['fa',`fa-${selected.todo.icon}`]"></i>
                  {{ selected.todo.name }}
              </p>
              <p class="todo_editing_meta">
                  <i class="fa fa-calendar"></i>
                  Today
              </p>
          </div>
     </div>   
 </transition>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import AppBar from './AppBar.vue'
export default {
    components: {
    AppBar
  },
  computed: {
    ...mapState(['selected', 'editing'])
  },
  methods: {
    ...mapMutations(['toggleEditing'])
  }
}
</script>

<style lang="less">
.todo_editing {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 0;
    background-color: white;
    color: #666;
    will-change: transform;
}

.todo_editing textarea {
    margin: 6px 0;
    padding-left: 40px;
    border: none;
    outline: none;
    width: 80%;
    //不允许用户缩放
    resize: none;
    color: #666;
    font-size: 24px;
    line-height: 1.2em;
}

.todo_editing_head {
    padding: 40px 40px 0;
    color: #999;
}

.todo_editing_meta {
    display: flex;
    height: 44px;
    align-items: center;
    border-bottom: 1px solid #eee;
    color: #999;
    i {
        padding-right: 10px;
    }
}

.edit-leave-to,
.edit-enter {
    transform: translateY(100%);
}

.edit-enter-to,
.edit-leave {
  transform: translateY(0);
}

.edit-enter-active {
  transition: all 0.5s ease;
}
.edit-leave-active {
  transition: all 0.5s ease;
}
</style>
