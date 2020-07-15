<template>
  <div class="team">
    <h3 class="title">The team</h3>
    <div class="bg">
      <p><strong>CocoMaterial</strong> is an idea of Esther Moreno for Kaleidos’ PIWEEK.</p>
      <p>The team members are:</p>
      <div class="members">
        <img alt="Team members illustration" src="../assets/team.svg" />
        <div class="group">
          <div class="person" v-for="(member, index) in members" :key="index">
            <p class="name">{{member.name}}</p>
            <p class="position">{{member.position}}</p>
          </div>
        </div>
      </div>
    </div>
    <p class="contact">Feel free to <a class="highlight" href="mailto:esther.moreno@kaleidos.net">contact us</a></p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Team',
  data () {
    return {
      info: null,
      members: [
        { name: 'Marina López', position: 'Front-End Developer' },
        { name: 'Natacha Menjibar', position: 'UX/UI Designer' },
        { name: 'Esther Moreno', position: 'Creator & Illustrator' },
        { name: 'Yamila Moreno', position: 'Back-End Developer' }]
    }
  },
  mounted () {
    axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => (this.info = response))
  }
}
</script>

<style lang="scss" scoped>
  @import '@/variables';

  .title {
    font-size: 48px;
    font-weight: 700;
    margin-bottom: 30px;
    text-align: center;
  }

  p {
    text-align: center;
    font-size: 14px;
    line-height: 24px;
  }

  img {
    margin: auto;
  }

  .bg {
    background-image: url('../assets/team-bg.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    padding-top: 30px;
    margin-bottom: 90px;
  }

  .members {
    display: grid;
  }

  .group {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    margin: auto;
    column-gap: 20px;
  }

  .name {
    font-weight: 500;
    font-size: 18px;
  }

  .position {
    color: $color-grey;
    font-size: 14px;
  }

  .contact {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 60px;
    text-align: center;
  }

  .highlight {
    color: $color-turquoise;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
  }

</style>
