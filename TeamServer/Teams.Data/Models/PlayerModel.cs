using System;
using System.Collections.Generic;
using System.Text;

namespace Team.Data.Models
{
    public class PlayerModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int TeamId { get; set; }
        public TeamModel Team { get; set; }
    }
}
