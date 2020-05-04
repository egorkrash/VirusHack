import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from catboost import CatBoostRegressor
from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, mean_absolute_error
from sklearn.model_selection import train_test_split


def make_time_features(data, timestamps=[24, 12, 6, 5, 4, 3, 2, 1], target='mean_delay'):
    targets = []
    features = []
    features_mean = []
    for i in range(data.shape[0]):
        
        # prev values
        temp_arr = []
        for s in timestamps:
            temp = data.shift(s)[target].loc[i]
            temp_arr.append(temp)
            
        # mean
        for s in timestamps:
            temp = np.mean(data[target].loc[i-s:i-1])
            temp_arr.append(temp)
            
        targets.append(data[target].loc[i])
        features.append(temp_arr)
    
    res_df = pd.DataFrame(features)
    res_df['target_{}'.format(target)] = targets
    
    rename_dict = {}
    for i in range(len(timestamps)*2):
        if i < len(timestamps):
            rename_dict[i] = 'lag_{}_hours'.format(timestamps[i])
        else:
            rename_dict[i] = 'mean_{}_hours'.format(timestamps[len(timestamps) - i])
            
            
    res_df = res_df.rename(columns=rename_dict)
    res_df = res_df.dropna()
    
    return res_df.drop('target_{}'.format(target), axis=1), res_df['target_{}'.format(target)]



class TargetForecasting():
    def __init__(self, load_model=False, target=None, path='models/', **params):
        self.estimator = CatBoostRegressor(silent=True, iterations=15, **params)
        
        if load_model:
            try:
                self.estimator.load_model(f'{path}{target}')
            except FileNotFoundError:
                print('model {} was not found'.format(target))
        
        
    def fit(self, X, y, save_model=False, target=None, **fit_params):
        self.estimator.fit(X, y, **fit_params)
        
        if save_model:
            self.estimator.save_model('models/{}'.format(target))
        
        
    def predict(self, X):
        return self.estimator.predict(X)
    
    
def test_model(data_target):
    X, y = data_target
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
    model = TargetForecasting()
    model.fit(X_train, y_train)
    print('MAE (train):', mean_absolute_error(y_train, model.predict(X_train)))
    print('MAE:', mean_absolute_error(y_test, model.predict(X_test)))
    
    
    
def fit_models(data, targets):
    
    for target in targets:
        X, y = make_time_features(data, target=target)
        
        model = TargetForecasting()
        model.fit(X, y, save_model=True, target=target)
        print('{} has been fitted and saved'.format(target))

        
def load_models(targets, path='models/'):
    models = {}
    for target in targets:
        model = TargetForecasting(load_model=True, target=target, path=path)
        models[target] = model
    
    return models


def make_predictions(data, models, targets, date='2020-05-01 00:00:00'):
    """Make predictions for the last hour using last days' data and fitted models."""
    
    data = data[data['date'] <= pd.to_datetime(date)]
    
    pred_df = pd.DataFrame({'date': data.iloc[-24:]['date']})
    
    
    for target in targets:
        X, _ = make_time_features(data, target=target)

        X_pred = X.values[-24:]
        
        preds = models[target].predict(X_pred)
        pred_df[target] = preds
    
    return data.iloc[-24:-1], pred_df

