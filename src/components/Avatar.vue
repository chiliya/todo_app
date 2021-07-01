<template>
  <div class="avatar" :class="{avatar__selected: !!selected }">
      <div class="avatar_face">
          <img src="../assets/face.jpeg" alt="">
      </div>
      <h2 class="avatar_name">HELLO， SEBS</h2>
      <p class="avatar_tips">
        看起来不错<br />你今天有 {{ todayTasks.length }} 个任务还未完成
      </p>
      <p class="avatar_date">日期: {{ today | dataString }}</p>
  </div>
</template>

<script>
// mapState mapGetters  mapmutations辅助函数 
//import mapState(['nickname','age','gender'])  from 'vuex'
//相当于
// nickname(){return this.$store.state.nickname}
// age(){return this.$store.state.age}
// gender(){return this.$store.state.gender}
import {mapState, mapGetters} from 'vuex'
export default {
    data () {
    return {
        today: new Date()
    }
  },
  computed: {
      ...mapState(['selected']),
      ...mapGetters(['todayTasks'])
  },
  filters: {
      dataString (val) {
          return val
          .toDateString()
          .toUpperCase()
          .replace(/(\s\d{4})$/, ', $1')
      }
  }
}

</script>

<style lang="less">
.avatar {
    display: flex;
    padding: 0 40px;
    height: 300px;
    justify-content: flex-end;
    flex-direction: column;
    transition: all 0.5s ease;
}

.avatar__selected {
    transform: translate3d(0, 20px, 0);
    opacity: 0;
}

.avatar_face {
    width: 44px;
    height: 44px;
    border-radius: 100%;
    overflow: hidden;
    box-shadow: 0 5px 10px  rgba(0, 0, 0, 0.2);
    
    img {
        display: block;
        width: 100%;
        height: 100%;
    }
}

.avatar_name {
    margin-top: 32px;
    padding: 0 6px;
    font-size: 32px;
    letter-spacing: 1px;
    font-weight: 300;
}

.avatar_tips {
    margin-top: 16px;
    padding: 0 6px;
    font-size: 13px;
    font-weight: 100;
    opacity: 0,8;
    line-height: 1.6em;
}

.avatar_date {
    margin-top: 44px;
    margin-bottom: 16px;
    padding: 0 6px;
    font-size: 14px;
}
</style>

