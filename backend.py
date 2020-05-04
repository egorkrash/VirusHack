import json
import pandas as pd
import numpy as np
import pickle as pkl
from flask import Flask, request, Response, send_file


DATA_PATH = 'data/'

time_series = pd.read_csv(DATA_PATH + 'final_data.csv')
time_series_pred = pd.read_csv(DATA_PATH + 'pred_data.csv')

ts_targets = time_series.columns[1:]


snmp_data = pd.read_csv(DATA_PATH + 'snmp_data.csv', parse_dates=['time'])

snmp_data = snmp_data[snmp_data['time'] >= pd.to_datetime('2020-04-29 22:59:45')]
snmp_targets = snmp_data.columns[1:]


app = Flask(__name__)

@app.route('/get_real_and_pred_data', methods=['GET'])
def get_real_and_pred_data():
    """
    Get data of time series and forecasting of given target.
    """
    if request.method == 'GET':
        entry = json.loads(request.data)
        
        res = {}
        
        
        for target in ts_targets:
      
            target_val = list(time_series[target])
            target_pred_val = list(time_series_pred[target])
            res[target] = target_val
            res[target + '_pred'] = target_pred_val
        
        xticks = list(time_series_pred['date'])
        
 
        
        res['xticks'] = xticks
        
        json_data = json.dumps(res)
        resp = Response(json_data, status=200, mimetype='application/json')
        resp.headers = {'Access-Control-Allow-Origin': '*'}
        
        print(res)
        
        return resp
        
    else:
        return 'only post request is allowed'
    
    
@app.route('/get_snmp_data', methods=['GET'])
def get_snmp_data():
    """
    Get data of time series of snmp.
    """
    if request.method == 'GET':
        entry = json.loads(request.data)
        
        
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
        return 'only post request is allowed'

if __name__ == '__main__':
    app.run(debug=True, port=4500)
