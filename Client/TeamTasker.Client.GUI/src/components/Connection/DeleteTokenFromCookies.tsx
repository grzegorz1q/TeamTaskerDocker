export default function DeleteTokenFromCookies()
{
    document.cookie = "JwtToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    location.href = "/login";
}