<footer>
    <div>
        <a href="https://github.com/jonsoku2/svelte-movie-template">Github Repo.</a>
    </div>
    <div>
        <a href="https://github.com/jonsoku2">@{new Date().getFullYear()} TAMASTUDY</a>
    </div>
</footer>

<style lang="scss">
  footer {
    padding: 70px;
    text-align: center;

    a {
      color: $color--white-10;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>