using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Team.Data.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Team.Data.ModelConfigurations
{
    class PlayerModelConfiguration : IEntityTypeConfiguration<PlayerModel>
    {
        public void Configure(EntityTypeBuilder<PlayerModel> builder)
        {
            builder.HasData(new PlayerModel
            {
                Id = 1,
                FirstName = "Ihor",
                LastName = "Serdiuk",
                TeamId = 1
            },
              new PlayerModel
              {
                  Id = 2,
                  FirstName = "Gulnara",
                  LastName = "Serdiuk",
                  TeamId = 1
              },
              new PlayerModel
              {
                  Id = 3,
                  FirstName = "Uri",
                  LastName = "Serdiuk",
                  TeamId = 1
              },
              new PlayerModel
              {
                  Id = 4,
                  FirstName = "Sergey",
                  LastName = "Serdiuk",
                  TeamId = 2
              },
              new PlayerModel
              {
                  Id = 5,
                  FirstName = "Alyona",
                  LastName = "Serdiuk",
                  TeamId = 2
              },
              new PlayerModel
              {
                  Id = 6,
                  FirstName = "Maria",
                  LastName = "Serdiuk",
                  TeamId = 3,
              },
              new PlayerModel
              {
                  Id = 7,
                  FirstName = "Solomia",
                  LastName = "Serdiuk",
                  TeamId = 3
              }) ;
        }
    }
}
