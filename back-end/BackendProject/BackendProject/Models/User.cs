﻿namespace BackendProject.Models
{
    public class User
    {
        public int Id { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
