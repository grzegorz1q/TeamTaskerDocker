# Bazowy obraz SDK do kompilacji
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS base
USER app
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /source

# Użyj odpowiednich ścieżek
COPY ["TeamTasker/Server/TeamTasker.Server.API/TeamTasker.Server.API.csproj", "TeamTasker.Server.API/"]
COPY ["TeamTasker/Server/TeamTasker.Server.Application/TeamTasker.Server.Application.csproj", "TeamTasker.Server.Application/"]
COPY ["TeamTasker/Server/TeamTasker.Server.ApplicationTests/TeamTasker.Server.ApplicationTests.csproj", "TeamTasker.Server.ApplicationTests/"]
COPY ["TeamTasker/Server/TeamTasker.Server.Domain/TeamTasker.Server.Domain.csproj", "TeamTasker.Server.Domain/"]
COPY ["TeamTasker/Server/TeamTasker.Server.Infrastructure/TeamTasker.Server.Infrastructure.csproj", "TeamTasker.Server.Infrastructure/"]

RUN dotnet restore "TeamTasker.Server.API/TeamTasker.Server.API.csproj"
COPY . . 
WORKDIR "/source/TeamTasker.Server.API"
RUN dotnet build "TeamTasker.Server.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
RUN dotnet publish "TeamTasker.Server.API.csproj" -c $BUILD_CONFIGURATION -o /app/build /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT [ "dotnet", "TeamTasker.Server.API.dll" ]
