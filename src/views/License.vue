<template>
  <div class="license">
    <h3 class="title">License</h3>
    <p>All illustrations published on CocoMaterial can be used for free. You can use them for commercial and non-commercial purposes. You do not need to ask permission from or provide credit to CocoMaterial, although it is appreciated when possible. CocoMaterial grants you an irrevocable, nonexclusive, worldwide copyright license to download, copy, modify, distribute, perform, and use creations made on CocoMaterial for free, including for commercial purposes, without permission from or attributing the illustrator.</p>
    <p>This license does not include the right to compile illustrations from CocoMaterial to replicate a similar or competing service.</p>
  </div>
</template>

<script>

export default {
  name: 'License'
}
</script>

<style lang="scss" scoped>
  @import '@/variables';

  .title {
    font-size: 48px;
    font-weight: 700;
    margin-bottom: 90px;
    text-align: center;

    @media (max-width: 768px) {
      font-size: 18px;
      margin-bottom: 30px;
    }
  }

  p {
    text-align: left;
    font-size: 14px;
    line-height: 24px;
    max-width: 500px;
    margin: 0 auto 30px;

    @media (max-width: 768px) {
      padding: 0 20px;
    }
  }

</style>
