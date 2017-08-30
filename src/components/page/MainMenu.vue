<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <router-link :to="{name: 'home'}"><span class="navbar-brand">ABHT</span></router-link>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
          <router-link :to="{name: 'constructions-select'}" tag="li" active-class="active" exact><a >Selectie lucrări <span class="sr-only">(current)</span></a></router-link>
          <li  class="dropdown"  v-toggle-menu>
            <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Adaugă lucrare <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <router-link :to="{name: 'new-transversal-construction'}" tag="li" active-class="active"><a>Transversală</a></router-link>
              <router-link :to="{name: 'new-longitudinal-construction'}" tag="li" active-class="active"><a>Longitudinală</a></router-link>
            </ul>
          </li>
          <li  class="dropdown" v-toggle-menu>
            <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><a >Action</a></li>
              <li><a href="#">Another action</a></li>
              <li><a href="#">Something else here</a></li>
              <li role="separator" class="divider"></li>
              <li><a href="#">Separated link</a></li>
              <li role="separator" class="divider"></li>
              <li><a href="#">One more separated link</a></li>
            </ul>
          </li>
        </ul>
        <form class="navbar-form navbar-left">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Search">
          </div>
          <button type="submit" class="btn btn-default">Submit</button>
        </form>
        <ul class="nav navbar-nav navbar-right">
          <li><a href="#">Login</a></li>
          <li class="dropdown" v-toggle-menu>
            <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Account <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><a href="#">My constructions</a></li>
              <li><a href="#">My account</a></li>
              <li><a href="#">Something else here</a></li>
              <li role="separator" class="divider"></li>
              <li><a href="#">Separated link</a></li>
            </ul>
          </li>
        </ul>
      </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
  </nav>
</template>

<script>

export default {
  data(){
    return {

    }
  },

  methods:{
    toggleSideMenu(){
      this.$emit('toggle')
    }

  },

  directives: {
    toggleMenu: {
      bind(el, binding, vnode){
        el.addEventListener("click", function(){
          el.classList.toggle('open')
        })

        el.addEventListener("mouseleave", function(){
          el.classList.remove('open')
        })

      }
    }
  }

}
</script>


<style>

</style>
