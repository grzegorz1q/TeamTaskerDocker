export const handleIssueChange = (option: string) => {
    sessionStorage.setItem('issuesChange', option);
    window.dispatchEvent(new Event('issuesChange'));
  };