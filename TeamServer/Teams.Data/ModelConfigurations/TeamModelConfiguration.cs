using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Team.Data.Models;
namespace Team.Data.ModelConfigurations
{
    internal class TeamModelConfiguration : IEntityTypeConfiguration<TeamModel>
    {
        public void Configure(EntityTypeBuilder<TeamModel> builder)
        {
            builder.HasData(
           new TeamModel()
           {
               Id = 1,
               Country = "Ukraine",
               Name = "God's Team",

           },

            new TeamModel()
            {
                Id = 2,
                Country = "USA",
                Name = "Stars",
            },
            new TeamModel()
            {
                Id = 3,
                Country = "Italy",
                Name = "Spagetti",
            });
        }
    }
}