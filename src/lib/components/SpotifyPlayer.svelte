<script lang="ts">
  export let url: string;
  const defaultPlaylistID = '1uUHti2X6KkpUFcOr4FJ8v';
  $: playlistID = getPlaylistID();
  function getPlaylistID() {
    if (/^(spotify:|https:\/\/[a-z]+\.spotify\.com\/)/.test(url) === false) {
      return defaultPlaylistID;
    }
    return (
      url.match(
        /^(https:\/\/open.spotify.com\/playlist\/|spotify:user:spotify:playlist:)([a-zA-Z0-9]+)(.*)$/
      )?.[2] ?? defaultPlaylistID
    );
  }
</script>

<iframe
  title="Spotify Player"
  src={`https://open.spotify.com/embed/playlist/${playlistID}`}
  width="100%"
  height="100%"
  frameborder="0"
  allowtransparency={true}
  allow="encrypted-media"
/>
