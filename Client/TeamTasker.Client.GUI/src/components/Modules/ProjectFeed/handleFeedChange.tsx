export const handleFeedChange = (option: string) => {
    sessionStorage.setItem('feedChange', option);
    window.dispatchEvent(new Event('feedChange'));
  }