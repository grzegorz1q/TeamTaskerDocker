export default function FilterIssuesByStatus(selectedStatus: string, setSelectedStatus: React.Dispatch<React.SetStateAction<string>>)
{
    const handleStorageChange = () => 
        {
            const storedStatus = sessionStorage.getItem('statusOptions');
            if (storedStatus && storedStatus !== selectedStatus) 
            {
                setSelectedStatus(storedStatus);
            }
        };
    
        window.addEventListener('storage', handleStorageChange);
    
        return handleStorageChange;
}