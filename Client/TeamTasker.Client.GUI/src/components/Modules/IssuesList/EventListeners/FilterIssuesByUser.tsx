export default function FilterIssuesByUser(selectedIssuesGroup: string, setSelectedIssuesGroup: React.Dispatch<React.SetStateAction<string>>)
{
    const handleStorageChange = () => 
    {
        const storedGroup = sessionStorage.getItem('issuesOptions');
        if (storedGroup && storedGroup !== selectedIssuesGroup) 
        {
            setSelectedIssuesGroup(storedGroup);
        }
    };

    window.addEventListener('storage', handleStorageChange);

    return handleStorageChange;
}