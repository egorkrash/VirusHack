import json
import pandas as pd
import numpy as np
import pickle as pkl
from utils import get_alert_dict
from flask import Flask, request, Response, send_file

from time_series_forecasting.forecasting import make_predictions, load_models

FORECASTING_TARGETS = [
    "start_stop_alige_count_Start",
    "start_stop_alige_count_Stop",
    "type__count_Billing-Accounting",
    "type__count_Billing-Authentication",
    "mean_delay",
    "mean_input_trafic",
    "mean_output_trafic",
    "count_failed"
   ]


# ML models
forecasting_models = load_models(FORECASTING_TARGETS, path='time_series_forecasting/models/')

# additional data

DATA_PATH = 'data/'

time_series_logs = pd.read_csv(DATA_PATH + 'gb_total.csv')
time_series_logs['date'] = pd.to_datetime(time_series_logs['date'])

data_alert = pd.read_csv(DATA_PATH + 'gb_userlogin_hour.csv')
data_alert = data_alert[~((data_alert.input_trafic == 0) & (data_alert.output_trafic == 0))]


snmp_data = pd.read_csv(DATA_PATH + 'snmp_data.csv', parse_dates=['time'])

snmp_data = snmp_data[snmp_data['time'] >= pd.to_datetime('2020-04-29 22:59:45')]
snmp_targets = snmp_data.columns[1:]


app = Flask(__name__)

@app.route('/get_real_and_pred_data', methods=['POST'])
def get_real_and_pred_data():
    """
    Get data of time series and forecasting of given target.
    """
    if request.method == 'POST':
        
        entry = json.loads(request.data)
        
        date = entry['date']

        res = {}

        time_series, time_series_pred = make_predictions(time_series_logs, forecasting_models, 
                                                         FORECASTING_TARGETS, date)
        
        for target in FORECASTING_TARGETS:
      
            target_val = list(time_series[target])
            target_pred_val = list(time_series_pred[target])
            res[target] = target_val
            res[target + '_pred'] = target_pred_val
        
        xticks = list(map(str, time_series_pred['date']))
        
 
        
        res['xticks'] = xticks
        
        json_data = json.dumps(res)
        resp = Response(json_data, status=200, mimetype='application/json')
        resp.headers = {'Access-Control-Allow-Origin': '*'}

        return resp
        
    else:
        return 'only get request is allowed'
    
    
@app.route('/get_snmp_data', methods=['GET'])
def get_snmp_data():
    """
    Get data of time series of snmp.
    """
    if request.method == 'GET':
        
        xticks = list(map(str, snmp_data['time']))
        
        res = {}
        
        for target in snmp_targets:
            
            res[target] = list(snmp_data[target])
            
            
        xticks = list(map(str, snmp_data['time']))
        res['xticks'] = xticks
        
        json_data = json.dumps(res)
        resp = Response(json_data, status=200, mimetype='application/json')
        resp.headers = {'Access-Control-Allow-Origin': '*'}
        
        return resp
        
    else:
        return 'only get request is allowed'

    
@app.route('/get_alert_users', methods=['POST'])
def get_alert_users():
    """
    Get data of alert users.
    """
    if request.method == 'POST':
        entry = json.loads(request.data)
        
        hour = entry['hour']
        
        
        alerts = get_alert_dict(data_alert, hour)
        
        
        json_data = json.dumps(alerts)
        resp = Response(json_data, status=200, mimetype='application/json')
        resp.headers = {'Access-Control-Allow-Origin': '*'}
        
        return resp
        
    else:
        return 'only post request is allowed'
    
    
if __name__ == '__main__':
    app.run(debug=True, port=4500)
