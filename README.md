# INTUS Windows Task

Complete web solution (frontend and backend) for evaluation as per the functional and technical requirements mentioned in the Task for Developer document

## Table of Contents

- [Solution Structure](#solution-structure)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Installing](#installing)
  - [Angular](#angular)
  - [ASP.NET](#aspnet)
- [Configuring](#configuring)
  - [appsettings.json](#appsettingsjson)
  - [app.config.json](#appconfigjson)
- [Running](#running)
  - [Visual Studio Code](#visual-studio-code)
  - [Visual Studio 2022](#visual-studio-2022)

## Solution Structure

### Backend

This backend is built using a two-tier architecture (Business/Presentation) [Note: No need in our case to make the Data layer], .NET 8.0, and ASP.NET with Visual Studio:

- A INTUS.Windows.Task.sln solution consists of the following projects:
  - INTUS.Windows.Task.Api
    - Presentation layer/tier
    - Presentation controllers
    - Serilog for logging
    - Dependency Injection pattern
    - Swagger to test and document the API
    - Folder named `Jsons` contains `rectangle.json` file for case rectangle. (Note: Backend is ready to accept more cases (ex: circle, triangle, ..) with a little changes that do not affect on the current part)
  - INTUS.Windows.Task.Business
    - Business layer/tier using Repository Pattern (This layer is responsible for loading/saving JSON)
  - INTUS.Windows.Task.Model
    - Data models
  - INTUS.Windows.Task.Resource
    - Resource localization for two cultures English (en-US) and French (fr-FR)

### Frontend

This frontend is built using the Angular framework and jQuery:
- Supports two two cultures English (en-US) and French (fr-FR) (language and UI)
- Using open source jQuery-based SVG resize tool available at `https://www.codeproject.com/Articles/609052/Simple-HTML5-SVG-Move-and-Resize-Tool` with my updates to fit in case Angular.
- In assets folder:
  - app.config.json file with configuration related to languages and backend API URL
  - i18n folder with json files for the culture resources

## Installing

- Requirements
  - Visual Studio Code
  - Node.js 20.11.1 and npm 10.2.4
  - Angular CLI 17.3.1
  - Visual Studio 2022
  - .NET 8.0

### Angular

- Open a command prompt (or Terminal on Visual Studio Code) and cd into the intus-windows-task folder
- Run: `npm install`

### ASP.NET

- Open INTUS.Windows.Task.sln solution file by Visual Studio 2022
- Rebuild the solution (which will also restore the nuget packages)

## Configuring

### appsettings.json

- To edit the backend configuration, open _INTUS.Windows.Task.Api/appsettings.json_ file:
  - `Serilog log file`:
  ```Json
  "path": "D:\\{{FOLDER_LOCATION}}\\INTUS-Windows-Task\\INTUS.Windows.Task\\INTUS.Windows.Task.Api\\bin\\Debug\\net8.0\\logs\\log-.txt",
  ```
  
### app.config.json

- To edit the frontend configuration, open _intus-windows-task/src/assets/app.config.json_ file:
  - `Default language`:
  ```Json
  "DefaultLanguage": "en-US"
  ```
  - `Backend API URL`:
  ```Json
  "ApiUrl": "https://localhost:44343/api/"
  ```
  
## Running

- The intus-windows-task Web application will be served on `http://localhost:4200`
- The INTUS.Windows.Task.Api Web API will be served on `https://localhost:44343`

### Visual Studio Code

- Open a command prompt (or Terminal on Visual Studio Code) and cd into the intus-windows-task folder
- Run: `ng serve`

### Visual Studio 2022

- Set INTUS.Windows.Task.Api as a startup project
- Start debugging
- Open Swagger under link `https://localhost:44343/swagger` using a client browser (ex: Chrome)
