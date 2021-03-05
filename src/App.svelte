<script lang="ts">
	import Header from '~/components/Header.svelte';
  import Router from 'svelte-spa-router'
  import routes from '~/routes'
</script>

<Header />
<Router 
  routes={routes}
/>

<style lang="scss">
</style>
