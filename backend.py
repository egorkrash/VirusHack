import json
import pandas as pd
import numpy as np
import pickle as pkl
from flask import Flask, request, Response, send_file


DATA_PATH = 'data/'

time_series = pd.read_csv(DATA_PATH + 'final_data.csv')
time_series_pred = pd.read_csv(DATA_PATH + 'pred_data.csv')


snmp_data = pd.read_csv(DATA_PATH + 'snmp_data.csv', parse_dates=['time'])

snmp_data = snmp_data[snmp_data['time'] >= pd.to_datetime('2020-04-29 22:59:45')]


app = Flask(__name__)

@app.route('/get_real_and_pred_data', methods=['POST'])
def get_real_and_pred_data():
    """
    Get data of time series and forecasting of given target.
    """
    if request.method == 'POST':
        entry = json.loads(request.data)
        
        target = entry['target']
        
        target_val = list(time_series[target])
        target_pred_val = list(time_series_pred[target])
        xticks = list(time_series_pred['date'])
        
        res = {}
        
        res['target'] = target_val
        res['target_pred'] = target_pred_val
        res['xticks'] = xticks
        
        json_data = json.dumps(res)
        resp = Response(json_data, status=200, mimetype='application/json')
        resp.headers = {'Access-Control-Allow-Origin': '*'}
        
        print(res)
        
        return resp
        
    else:
        return 'only post request is allowed'
    
    
@app.route('/get_snmp_data', methods=['POST'])
def get_snmp_data():
    """
    Get data of time series of snmp.
    """
    if request.method == 'POST':
        entry = json.loads(request.data)
        
        target = entry['target']
        
        target_val = list(snmp_data[target])
        xticks = list(map(str, snmp_data['time']))
        
        res = {}
        
        res['target'] = target_val
        res['xticks'] = xticks
        
        json_data = json.dumps(res)
        resp = Response(json_data, status=200, mimetype='application/json')
        resp.headers = {'Access-Control-Allow-Origin': '*'}
        
        return resp
        
    else:
        return 'only post request is allowed'

if __name__ == '__main__':
    app.run(debug=True, port=4500)
