start-process powershell -WorkingDirectory "Worry" -ArgumentList '-noexit -command npm run dev'
start-process powershell -WorkingDirectory "API" -ArgumentList '-noexit -command dotnet run'
#start-process powershell -WorkingDirectory "GolfTrackerExpress" -ArgumentList '-noexit -command npm run dev'
cd Worry
code .