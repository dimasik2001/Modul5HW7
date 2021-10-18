using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeamServer.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Team.Data;
using Team.Data.Models;

namespace TeamServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamsController : ControllerBase
    {
        private readonly AppDbContext _db;
        public TeamsController(AppDbContext db)
        {
            _db = db;
        }
        [HttpGet]
         public IEnumerable<TeamViewModel> ReadTeams()
        {
           var teams = _db.Teams;
           var viewModel = teams.Select(t => new TeamViewModel { Id = t.Id, Country = t.Country, Name = t.Name }).ToList();
           return viewModel;
        }

        [HttpPost]
        public void CreateTeam([FromBody] TeamViewModel team)
        {
            var dbTeam = new TeamModel
            {
                Country = team.Country,
                Name = team.Name
            };
                _db.Teams.Add(dbTeam);
            _db.SaveChanges();
        }
        [HttpPut]
        public void UpdateTeam([FromBody] TeamViewModel team)
        {
                var current = _db.Teams.FirstOrDefault(t => t.Id == team.Id);
                if (current == null)
                {
                    return;
                }
                current.Name = team.Name;
                current.Country = team.Country;
            _db.SaveChanges();
        }

        [HttpDelete]
        [Route("{id}")]
        public void DeleteTeam(int id)
        {

                _db.Teams.Remove(_db.Teams.FirstOrDefault(t => t.Id == id));
            _db.SaveChanges();

        }

        [HttpGet]
        [Route("{teamId}/players")]
        public IEnumerable<PlayerViewModel> ReadPlayers(int teamId)
        {
                var res = _db.Players.Where(p => p.TeamId == teamId);
                return res.Select(p => new PlayerViewModel { FirstName = p.FirstName, Id = p.Id, LastName = p.LastName, TeamId = p.TeamId});
        }
        [HttpDelete]
        [Route("players/{Id}")]
        public void DeletePlayer(int Id)
        {
                _db.Players.Remove(_db.Players.FirstOrDefault(p => p.Id == Id));
            _db.SaveChanges();
        }

        [HttpPost]
        [Route("players")]
        public void CreatePlayer([FromBody] PlayerViewModel player)
        {
            var dbModel = new PlayerModel
            {
                FirstName = player.FirstName,
                LastName = player.LastName,
                TeamId = player.TeamId
            };
                _db.Players.Add(dbModel);
            _db.SaveChanges();
        }

        [HttpPut]
        [Route("players")]
        public void UpdatePlayer([FromBody] PlayerViewModel player)
        {
            var current = _db.Players.FirstOrDefault(t => t.Id == player.Id);
                if (current == null)
                {
                    return;
                }
                current.FirstName = player.FirstName;
                current.LastName = player.LastName;
            _db.SaveChanges();
        }
    }
}
