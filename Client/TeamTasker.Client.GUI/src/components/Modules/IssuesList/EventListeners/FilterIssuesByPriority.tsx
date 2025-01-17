export default function FilterIssuesByPriority(selectedPriority: string, setSelectedPriority: React.Dispatch<React.SetStateAction<string>>)
{
    const handleStorageChange = () => 
        {
            const storedPriority = sessionStorage.getItem('priorityOptions');
            if (storedPriority && storedPriority !== selectedPriority)
            {
                setSelectedPriority(storedPriority);
            }
        };
    
        window.addEventListener('storage', handleStorageChange);
    
        return handleStorageChange;
}