@echo off
echo Building frontend...
cd frontend
call npm run build
cd ..

echo Starting unified backend server...
cd backend
call pip install -r requirements.txt
call uvicorn main:app --host 127.0.0.1 --port 8080 --reload
cd ..
