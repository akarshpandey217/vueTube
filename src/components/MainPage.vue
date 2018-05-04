<template>
<div>
  <page-header></page-header>
  <page-body></page-body>
</div>
</template>

<script>

import PageHeader from './subComponents/PageHeader'
import PageBody from './subComponents/PageBody'
import PageFooter from './subComponents/PageFooter'
export default {
  name: 'MainPage',
  components: { 
    'page-header' : PageHeader,
    'page-body' : PageBody ,
    'page-footer' : PageFooter 
    },
    data(){
        return{
          name:'',
        }
    }
}

</script>
<style>
</style>

