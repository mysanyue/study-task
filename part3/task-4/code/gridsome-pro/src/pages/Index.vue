<template>
  <Layout>
    <div class="container">
      <div class="hero">
        <h1 class="hero-title">Simplicity. Aesthetics. Value.</h1>
        <h2 class="hero-subtitle">Hi there, I'm an independent Digital Designer &amp; Art Director focused on digital design for brands that like to have fun.</h2>
      </div>
      <div class="projects">
        <div class="project">
          <a href="/projects/chelsea-landmark/" class="project-link">
            <img alt="Banana" src="/img/d4.jpg" width="2560" class="thumbnail g-image g-image--lazy g-image--loading" />
            <h3 class="project-title">Banana</h3>
            <div class="categories"><span class="category">photography</span><span class="category">pink</span></div>
          </a>
        </div>
        <div class="project">
          <a href="/projects/sunk/" class="project-link">
            <img alt="Pineapple" src="/img/d1.jpg" width="2560" class="thumbnail g-image g-image--lazy g-image--loading" />
            <h3 class="project-title">Pineapple</h3>
            <div class="categories"><span class="category">photography</span><span class="category">blue</span></div></a
          >
        </div>
        <div class="project">
          <a href="/projects/3d-graff/" class="project-link"
            ><img alt="Ice Cream" src="/img/d2.jpg" width="2560" class="thumbnail g-image g-image--lazy g-image--loading" />
            <h3 class="project-title">Ice Cream</h3>
            <div class="categories"><span class="category">photography</span><span class="category">yellow</span></div>
          </a>
        </div>
        <div class="project">
          <a href="/projects/ios-concept/" class="project-link">
            <img alt="Porta400" src="/img/d4.jpg" width="2560" class="thumbnail g-image g-image--lazy g-image--loading" />
            <h3 class="project-title">Porta400</h3>
            <div class="categories"><span class="category">photography</span><span class="category">yellow</span></div>
          </a>
        </div>
      </div>
    </div>
    <div>
      <div class="latest-journals-heading container"><span class="label">Latest and greatest</span></div>
      <div class="latest-journals">
        <div class="container">
          <a href="/journal/gridsome-forestry-cms/" class="journal"><h3 class="journal-title">Gridsome with Forestry CMS</h3></a><a href="/journal/use-gridsome-vuejs/" class="journal"><h3 class="journal-title">VueJS for your next project</h3></a><a href="/journal/macos-development-environment/" class="journal"><h3 class="journal-title">macOS development environment</h3></a
          ><a href="/journal/a-journal-entry/" class="journal"><h3 class="journal-title">About Typography</h3></a>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
export default {
  name: 'IndexPage',
  metaInfo: {
    title: 'Hello, world!'
  }
}
</script>

<style></style>
