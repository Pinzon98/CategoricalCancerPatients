from typing import Optional
from fastapi import FastAPI
from DataModel import DataModel
import pandas as pd
import joblib
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI() 

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.post("/predict")
def make_predictions(dataModel: DataModel):    
    df = pd.DataFrame(dataModel.dict(), columns=dataModel.dict().keys(), index=[0])
    df.columns = dataModel.columns()
    if(df["study_and_condition"][0].strip() == ""):
        return {"score":float(-1)}
    df = df["study_and_condition"]    
    model = joblib.load("modelo.joblib")
    result = model.predict(df)
    result = result[0]
    return {"score":float(result)}
