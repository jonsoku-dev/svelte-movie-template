<script lang='ts'>
    import Header from '~/components/Header.svelte'
    import Footer from '~/components/Footer.svelte'
    import routes from '~/routes'
    import Router, { location } from 'svelte-spa-router'
    import { fade } from 'svelte/transition'
</script>

<Header />
{#key $location}
    <div in:fade>
        <Router routes={routes} />
    </div>
{/key}
<Footer />