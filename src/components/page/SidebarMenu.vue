<template>
  <div id="sidebar-wrapper">
              <ul class="sidebar-nav nav-pills nav-stacked" id="menu">

                <router-link :to="{name: 'constructions-select'}" tag="li" active-class="active" exact><a ><span class="fa-stack fa-lg pull-left"><i class="fa fa-filter  fa-stack-1x "></i></span>Selectie lucrări <span class="sr-only">(current)</span></a></router-link>

                <router-link :to="{name: 'constructions-list', query: currentConstructionsSelectionListPage }" tag="li" active-class="active"><a ><span class="fa-stack fa-lg pull-left"><i class="fa fa-list fa-stack-1x "></i></span>Listă lucrări <span class="sr-only">(current)</span></a></router-link>

                <router-link :to="{name: 'ys-distribution-condition'}" tag="li" active-class="active" exact><a><span class="fa-stack fa-lg pull-left"><i class="fa fa-pie-chart fa-stack-1x "></i></span>Distr. Ys categ. stare</a><span class="sr-only">(current)</span></a></router-link>

                <router-link :to="{name: 'ys-distribution-age'}" tag="li" active-class="active" exact><a><span class="fa-stack fa-lg pull-left"><i class="fa fa-area-chart fa-stack-1x "></i></span>Distr. medie Ys fcţ. varsta</a><span class="sr-only">(current)</span></a></router-link>

                <router-link :to="{name: 'ys-distribution-decade'}" tag="li" active-class="active" exact><a><span class="fa-stack fa-lg pull-left"><i class="fa fa-area-chart fa-stack-1x "></i></span>Distr. medie Ys pe decade</a><span class="sr-only">(current)</span></a></router-link>

                  <router-link :to="{name: 'ys-distribution-basin'}" tag="li" active-class="active" exact><a><span class="fa-stack fa-lg pull-left"><i class="fa fa-list fa-stack-1x "></i></span>Distr. medie Ys pe bazine</a><span class="sr-only">(current)</span></a></router-link>

                <router-link :to="{name: 'ys-distribution-ye'}" tag="li" active-class="active" exact><a><span class="fa-stack fa-lg pull-left"><i class="fa fa-area-chart fa-stack-1x "></i></span>Distr. medie  Ys fcţ. Ye</a><span class="sr-only">(current)</span></a></router-link>

                <router-link :to="{name: 'ys-distribution-materials'}" tag="li" active-class="active" exact><a><span class="fa-stack fa-lg pull-left"><i class="fa fa-bar-chart fa-stack-1x "></i></span>Distr. medie Ys fcţ. mat. de constr. corp transversale</a><span class="sr-only">(current)</span></a></router-link>


                  <li>
                      <a href="#"><span class="fa-stack fa-lg pull-left"><i class="fa fa-plus-square  fa-stack-1x "></i></span> Adaugă lucrare</a>
                         <ul class="nav-pills nav-stacked" style="list-style-type:none;">
                           <router-link :to="{name: 'new-transversal-construction'}" tag="li" active-class="active"><a><span class="fa-stack fa-lg pull-left"><i class="fa fa-file fa-stack-1x "></i></span>Transversală</a></router-link>
                           <router-link :to="{name: 'new-longitudinal-construction'}" tag="li" active-class="active"><a><span class="fa-stack fa-lg pull-left"><i class="fa fa-file fa-stack-1x "></i></span>Longitudinală</a></router-link>
                      </ul>
                  </li>
              </ul>
          </div><!-- /#sidebar-wrapper -->

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import generalMixin from './../../mixins/general'

export default {
  mixins: [ generalMixin],

  data(){
    return {

    }
  },

  methods:{
    toggleMenu(){
      alert('toggle')
    },
  },

  computed: {
    ...mapGetters([ 'constrFilters' ]),

    currentConstructionsSelectionListPage(){
      let query = this.jsonCopy(this.constrFilters)
      query.page = 1
      return query
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
  },


}
</script>


<style>

</style>
