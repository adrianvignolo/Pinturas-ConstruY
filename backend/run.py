import uvicorn
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

if __name__ == "__main__":
    print("Iniciando API Pinturas ConstruY en http://localhost:8002 con MariaDB 3307...")
    uvicorn.run("app.main:app", host="0.0.0.0", port=8002, reload=True)
