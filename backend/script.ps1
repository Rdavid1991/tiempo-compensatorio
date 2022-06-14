
if(Test-Path -Path .\views\){
    Remove-Item -Path .\views\ -Recurse
}

cd ..\frontend; npm run build; cd ..\backend
Copy-Item -Path .\..\frontend\build -Destination ".\views\" -Recurse -PassThru