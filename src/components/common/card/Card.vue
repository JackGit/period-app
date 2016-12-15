<style>
  .c-card {
    position: relative;
    background-color: #fff;
    margin-bottom: 10px;
    padding: 20px;
    /*box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12);
    border-radius: 2px;*/
  }

  .c-card.no-padding {
    padding: 0;
  }

  .c-card__header h1,
  .c-card__header h2,
  .c-card__header h3,
  .c-card__header h4  {
    margin: 0;
    font-weight: 200;
    line-height: 48px;
    font-size: 24px;
  }

  .c-card__content {
    overflow: hidden;
  }

  .c-card__content p {
    margin: 0;
    font-size: 14px;
    line-height: 1.5;
  }
</style>

<template>
  <div :class="{'c-card': true, 'no-padding': noPadding}">
    <div class="c-card__header">
      <slot name="header"></slot>
    </div>
    <div class="c-card__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      noPadding: Boolean
    }
  }
</script>
