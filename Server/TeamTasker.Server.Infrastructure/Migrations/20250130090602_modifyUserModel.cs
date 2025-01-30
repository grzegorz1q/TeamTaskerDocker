using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TeamTasker.Server.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class modifyUserModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsFinished",
                table: "Users",
                newName: "IsArchived");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsArchived",
                table: "Users",
                newName: "IsFinished");
        }
    }
}
