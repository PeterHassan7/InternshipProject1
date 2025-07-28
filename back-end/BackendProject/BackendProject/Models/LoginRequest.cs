namespace BackendProject.Models
{
    public class LoginRequest
    {
        public string username { get; set; }
        public string password { get; set; }
        public bool RememberMe { get; set; }
    }
}
