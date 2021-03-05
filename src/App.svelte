<script lang="ts">
    import Header from '~/components/Header.svelte';
    import Footer from '~/components/Footer.svelte';
    import routes from '~/routes'
    import Router from 'svelte-spa-router'
</script>

<Header/>
<Router routes={routes}/>
<Footer/>