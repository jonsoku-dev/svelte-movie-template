<script>
    import { querystring } from 'svelte-spa-router'
    import qs from 'qs'

    console.log(qs.parse($querystring))

    $: query = qs.parse($querystring)
    console.log(query)
    $: name = query.name || 'Jonsoku'
    $: email = query.email || 'the2792@gmail.com'
    $: blog = query.blog || 'https://jonsoku.blog'
    $: phone = query.phone || '+81+80-7708-2222'
    $: image = query.image || 'https://blogimgs.pstatic.net/sticker/xhdpi/brown_special/original/30.png'

</script>

<div class='user-profile'>
    <div class='photos'>
        <div class='photo'>
            <img src='/assets/svelte.png' alt='User' />
        </div>
        <div class='photo'>
            <img src={image} />
        </div>
    </div>
    <div class='details'>
        <div class='name'>{name}</div>
        <div class='email'>{email}</div>
        <div class='blog'>{blog}</div>
        <div class='phone'>{phone}</div>
    </div>
</div>

<style lang='scss'>
  .user-profile {
    padding: 80px 0;

    .photos {
      display: flex;
      justify-content: center;

      .photo {
        flex-shrink: 0;
        width: 230px;
        height: 230px;
        padding: 30px;
        box-sizing: border-box;
        background-color: $color--area;
        border-radius: 50%;
        border: 12px solid $color--area;

        &:first-child {
          margin-right: -80px
        }

        img {
          width: 100%;
        }
      }
    }

    .details {
      margin-top: 20px;
      text-align: center;

      .name {
        font-size: 40px;
        font-family: 'Oswald', 'sans-serif';
        margin-bottom: 20px;
      }
    }
  }
</style>