#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER root
WORKDIR /app
EXPOSE 80
EXPOSE 443

RUN mkdir -p /app/data
COPY "Server/TeamTasker.Server.API/data/TeamTasker.db" "/app/data/TeamTasker.db"

COPY "TeamTasker.Server.API.pfx" "/app/TeamTasker.Server.API.pfx"

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Server/TeamTasker.Server.API/TeamTasker.Server.API.csproj", "Server/TeamTasker.Server.API/"]
COPY ["Server/TeamTasker.Server.Application/TeamTasker.Server.Application.csproj", "Server/TeamTasker.Server.Application/"]
COPY ["Server/TeamTasker.Server.Domain/TeamTasker.Server.Domain.csproj", "Server/TeamTasker.Server.Domain/"]
COPY ["Server/TeamTasker.Server.Infrastructure/TeamTasker.Server.Infrastructure.csproj", "Server/TeamTasker.Server.Infrastructure/"]
RUN dotnet restore "./Server/TeamTasker.Server.API/TeamTasker.Server.API.csproj"
COPY . .
WORKDIR "/src/Server/TeamTasker.Server.API"

RUN dotnet build "./TeamTasker.Server.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./TeamTasker.Server.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TeamTasker.Server.API.dll"]