<template>
  <!--  <div>-->
  <!--    <h1>SKU管理</h1>-->
  <!--  </div>-->
  <div class="panel">
    <div class="row">
      <span class="item"></span>
      <span class="item"></span>
    </div>
    <div class="row">
      <span class="item"></span>
    </div>
    <div class="row">
      <span class="item"></span>
      <span class="item"></span>
    </div>
  </div>
  <div class="icon-search"></div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.panel {
  width: 300px;
  height: 300px;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.row {
  display: flex;
  justify-content: space-between;
}
.row:nth-child(2) {
  align-self: center;
}
.item {
  width: 30px;
  height: 30px;
  border-radius: 50px;
  border: 1px solid #000000;
}
.icon-search {
  width: 12px;
  height: 12px;
  border-radius: 100%;
  border: 2px solid #000000;
  position: relative;
  margin: 30px auto;
}

.icon-search:after {
  content: '';
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  transform: rotate(45deg);
  width: 8px;
  height: 2px;
  position: absolute;
  top: 10px;
  left: 9px;
  background-color: #000000;
}
</style>
