using System;
using System.Collections.Generic;
using System.Text;

namespace Team.Data.Models
{
    public class TeamModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Country { get; set; }
        public List<PlayerModel> Players { get; set; } = new List<PlayerModel>();
    }
}
