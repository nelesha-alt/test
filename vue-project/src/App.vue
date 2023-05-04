<script>
export default {
  data() {
    return {
      answer: ''
    }
  },
  methods: {
    Click() {
      let randomnumber=Math.floor(Math.random() * 100);
      this.answer = randomnumber;
    }}};

</script>
<template>
   <div class="container">
          <button class="button" @click="Click">Random</button>
          <p>Число</p>
          <p class="answer">{{ answer }}</p>
         </div>
</template>

<style scoped>
.container {
  width:80px;
  height:100px;
  border-radius:50px;
  padding:20px;
  text-align:center;
  color:rgb(49, 12, 73);
  background:rgb(60, 132, 199);
}
.container p {
  margin-top:20px;
}
.answer {
  color:rgb(231, 203, 203);
  width:80px;
  height:100px;
}
</style>
