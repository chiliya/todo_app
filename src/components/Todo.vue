<template>
    <div class="todo" :class="{ todo__selected: selected }" @click="handleClick">
      <div class="todo_head" >
        <div class="todo_icon" :style="{ color }">
          <i :class="['fa', `fa-${todo.icon}`]"></i>
        </div>
        <div class="todo_menu"><i class="fa fa-ellipsis-v"></i></div>
      </div>
      <!-- todo_body -->
      <div class="todo_body">
        <p class="todo_tips">{{ todo.tasks.length }} Tasks</p>
        <h3 class="todo_title">{{ todo.name }}</h3>
        <!-- todo_progress -->
        <div class="todo_progress">
          <span class="todo_progress_line">
            <i :style="{ width: progress, backgroundImage: progressColor }"></i>
          </span>
          <!-- 进度条百分百 -->
          <span class="todo_progress_num">已完成{{ progress }}</span>
        </div>
        <!-- todo_tasks -->
        <div class="todo_tasks">
          <h4 class="todo_subtitle" v-if="todayTasks.length">今日</h4>
          <ul>
            <li v-for="task in todayTasks" :key="task.id">
              <Task :todo="todo" :task="task"></Task>
            </li>
          </ul>
          <h4 class="todo_subtitle" v-if="tomorrowTasks.length">明日</h4>
          <ul>
            <li v-for="task in tomorrowTasks" :key="task.id">
              <Task :todo="todo" :task="task"></Task>
            </li>
          </ul>
          <h4 class="todo_subtitle" v-if="outdatedTasks.length">
            已过期
          </h4>
          <ul>
            <li v-for="task in outdatedTasks" :key="task.id">
              <Task :todo="todo" :task="task"></Task>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
import Task from "./Task.vue";
import { today, tomorrow } from "../store/index.js";
export default {
  components: {
    Task,
  },
  props: {
    todo: {
      type: Object,
      required: true,
    },
    selected: {
      type: Boolean,
    },
  },
  computed: {
    color() {
      return this.todo.colors[0];
    },
    progress() {
      const totalCount = this.todo.tasks.filter((t) => !t.deleted).length;
      const doneCount = this.todo.tasks.filter((t) => !t.deleted && t.done).length;
      
      //console.log('总任务:'+totalCount+'    已完成:'+doneCount);
      return `${Math.round((doneCount / totalCount) * 100)}%`;
    },
    progressColor() {
      const colorLeft = `color-stop(30%, ${this.todo.colors[0]})`;
      const colorRight = `to(${this.todo.colors[1]})`;
      return `-webkit-gradient(linear, left bottom, right bottom, ${colorLeft}, ${colorRight})`;
    },
    //今日计划
    todayTasks() {
      return this.todo.tasks.filter((task) => {
        return task.date >= today && task.date < tomorrow;
      });
    },
    //明日计划
    tomorrowTasks() {
      return this.todo.tasks.filter((task) => {
        return task.date >= tomorrow;
      });
    },
    // 过期任务
    outdatedTasks() {
      return this.todo.tasks.filter((task) => {
        return task.date < today;
      });
    },
  },
  methods: {
    //提交select 到 TodoLIst
    handleClick() {
      const appRect = document.querySelector("#app").getBoundingClientRect();
      const elRect = this.$el.getBoundingClientRect();
      const todo = this.todo;
      const rect = {};
      rect.top = elRect.top - appRect.top;
      rect.left = elRect.left - appRect.left;
      rect.width = elRect.width - appRect.width;
      rect.height = elRect.height - appRect.height;
      rect.appWidth = elRect.appWidth - appRect.appWidth;
      rect.appHeight = elRect.appHeight - appRect.appHeight;
      this.$emit("select", { rect, todo });
    },
  },
};
</script>

<style lang="less">
.todo {
  flex: 1;
  margin: 0 8px;
  overflow: hidden;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
  color: #666;
}

.todo__selected {
  visibility: hidden;
}

.todo_head {
  display: flex;
  padding: 20px;
  height: 44px;
  justify-content: space-between;
  align-items: flex-start;
  transform: translate3d(0, 0, 0);
  will-change: transform;
}

.todo_body {
  padding: 0 20px;
  transform: translate3d(0, 189px, 0);
  will-change: transform;
}

.todo_icon {
  display: flex;
  width: 44px;
  height: 44px;
  border: 1px solid #eee;
  border-radius: 100%;
  justify-content: center;
  align-items: center;
  font-size: 18px;
}

.todo_menu {
  color: #eee;
}

.todo_tips {
  opacity: 0.6;
  font-size: 13px;
  font-weight: 600;
}
.todo_title {
  margin-top: 6px;
  font-size: 32px;
}

.todo_progress {
  display: flex;
  align-items: center;
  margin-top: 30px;
}

.todo_progress_line {
  margin-right: 10px;
  flex: 1;
  height: 3px;
  background-color: #eee;

  i {
    display: block;
    height: 100%;
    transition: all 0.3s ease;
  }
}

.todo_progress_num {
  font-size: 12px;
}

.todo_tasks {
  opacity: 0;
  transform: scale3d(1, 0, 1);
  transform-origin: top;
  will-change: transform opacity;
}

.todo_subtitle {
  margin-top: 32px;
  margin-bottom: 8px;
  color: #999;
}
</style>
