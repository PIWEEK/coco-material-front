<template>
  <div class="team">
    <h3 class="title">The team</h3>
    <div class="bg">
      <p><strong>CocoMaterial</strong> is an idea of Esther Moreno for <a href="https://kaleidos.net/" target="_blank" class="link">Kaleidos’</a> <a class="link" href="https://piweek.com/" target="_blank">PIWEEK </a>.</p>
      <p>The team members are:</p>
      <div class="members">
        <img alt="Team members illustration" src="../assets/team.svg" />
        <div class="group">
          <a :href="member.link" target="_blank" class="person" v-for="(member, index) in members" :key="index">
            <p class="name">{{member.name}}</p>
            <p class="position">{{member.position}}</p>
          </a>
        </div>
      </div>
    </div>
    <p class="contact">Feel free to <a class="highlight" href="mailto:esther.moreno@kaleidos.net">contact us</a></p>
  </div>
</template>

<script>

export default {
  name: 'Team',
  data () {
    return {
      members: [
        { name: 'Marina López', position: 'Front-End Developer', link: 'https://kaleidos.net/ff8a80/' },
        { name: 'Natacha Menjibar', position: 'UX/UI Designer', link: 'https://kaleidos.net/492858/' },
        { name: 'Esther Moreno', position: 'Creator & Illustrator', link: 'https://kaleidos.net/720b34/' },
        { name: 'Yamila Moreno', position: 'Back-End Developer', link: 'https://kaleidos.net/D70A53/' }]
    }
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

    @media (max-width: 768px) {
      font-size: 18px;
    }
  }

  p {
    text-align: center;
    font-size: 14px;
    line-height: 24px;
  }

  img {
    margin: auto;

    @media (max-width: 768px) {
      max-width: 100%;
    }
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

    @media (max-width: 768px) {
      margin: 0 20px;
    }
  }

  .group {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    margin: auto;
    column-gap: 20px;
  }

  .person {
    text-decoration: none;
  }

  .name {
    color: $color-black;
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

  .link {
    text-decoration: none;
    color: $color-black;
    font-size: 14px;
    line-height: 24px;

    &:active {
      color: $color-black;
      font-size: 14px;
      line-height: 24px;
      font-weight: 500;
    }
  }

</style>
