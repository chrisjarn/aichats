<template>
<div id="help-view" class="absolute inset-0 flex flex-col">
	<NavBar :showBackButton=true>
		<template #navbar-title>
			<p class="text-2xl font-light justify-self-start mt-6 ml-2"> {{ text.about }}<span style="padding-left:1px; font-size:9px" class="absolute" >v1.2</span></p>
		</template>
	</NavBar>
</div>
</template>
<script>
import NavBar from '../components/NavBar.vue'
import { text } from '../services/language'

export default {
	name:'Help',
	components:{
		NavBar
	},
	setup(){
		return {
			text
		}
	}
}
</script>
<style scoped>
.fade-enter-active{
	opacity: 0;
	transition:  opacity 0.5s ease;
}
.fade-leave-active {
  transition: opacity 0.5s ease;
}


.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>