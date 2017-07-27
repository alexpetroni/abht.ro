<template>
  <div>

    <div class="row">
      <div class="col-sm-12">

        <form ref='uploadForm'
        id='uploadForm'
        @submit.prevent="onImageUpload"
        method='post'
        encType="multipart/form-data">

        <div class="form-inline">

          <div class="input-group">
            <label class="input-group-btn">
              <span class="btn btn-primary">
                Browse&hellip;
                <input id="inventoriesImages"
                name="inventoriesImages"
                type="file"
                style="display: none;"
                multiple>
              </span>
            </label>
            <input type="text" class="form-control" readonly>
          </div>
          <input type='submit' value='Upload!' class="form-control btn btn-primary" />
        </div>
      </form>

    </div>
  </div>

  <div class="row">
    <div class="col-12-sm">
    <template v-for="(t, index) in thumbnails">
      <div class="thumb_editor_wrapper">
        <img :src="t" class="thumbImg">
        <div class="trash-wrapper">
        <button type="button" class="btn btn-default btn-sm"  @click="deleteImg(index)">
          <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
        </button>
      </div>


      </div>
    </template>
  </div>
</div>
<br /><br />

<div class="row">
  <div class="col-sm-12 text-center" v-if="!isEdit">
    <button type="button" class="btn btn-primary"  @click="saveInventory">Save</button>
  </div>
</div>

</div>
</template>

<script>
import generalMixin from './../../../mixins/general'
import { EditState } from './../../../models/EditState'

const config = require('./../../../../abht.config.js')

const axios = require('axios').create({
  baseURL: config.apiUrl,
})

export default{
  mixins: [ generalMixin ],
  props: ['editState', 'inventory'],

  data() {
    return {
    }
  },

  methods: {
    onImageUpload(){
      var inventoriesImages = document.getElementById("inventoriesImages")

      const formData = new FormData()

      for(let f of inventoriesImages.files){
        formData.append("inventoriesImages", f)
      }

      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }

      axios.post('/upload', formData, config)
      .then( res => {
        // console.log('after image upload')
        // console.log(res.data)
        if(this.editState == EditState.EDIT){ // if is edit, save changes
          this.appendImages(res.data)
        }else{
          this.inventory.images.push(...res.data)
        }

      })
      .catch( error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          alert(error.response.data);

        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          alert('Error '+ error.message);
        }
        //  console.log(error.config);
      })
    },

    saveInventory(){
      this.$emit('saveInventory', JSON.stringify(this.images));
    },

    deleteImage(imgData){
      this.$emit('deleteImage', JSON.stringify(imgData));
    },

    appendImages(imgArr){
      this.$emit('appendImages', JSON.stringify(imgArr));
    },

    deleteImg(index){
      if(confirm("Dorești să ștergi imaginea?")) {
        const imgToDelete = this.jsonCopy(this.images[index])
        this.deleteImage(imgToDelete)

        if(this.editState == EditState.NEW){
          this.images.splice(index, 1)
        }
      }
    },


  },

  computed: {
    images: function(){
      return this.inventory.images
    },

    thumbnails: function(){
      let thumbArr = []
      this.images.forEach(i => {
        thumbArr.push(config.uploadDir + '/' + i.resize.small.relPath + '/' + i.resize.small.fileName)
      })
      return thumbArr
    },

    isEdit: function (){
      return this.editState == EditState.EDIT
    }
  },



  components: {

  },

  watch: {

  },


}
</script>

<style>
.thumb_editor_wrapper{
  float: left;
  padding:20px;
  display: block;
  text-align: center;
  height: 170px;
  overflow: hidden;
  position:relative;
}

.thumb_editor_wrapper .thumbImg{
  display: block;
  padding: 0 0 1em;
}

.thumb_editor_wrapper button{
  visibility: hidden;
}

.thumb_editor_wrapper:hover button{
  visibility: visible;
}

.thumb_editor_wrapper .trash-wrapper{
  position:absolute;
  top:1em;
  right:1em;
}
</style>
