from collections import defaultdict
import pandas as pd

def get_alert_dict(data, hour,
                   thrld_failed=2, thrld_stops=5,
                   thrld_tr_inp_zero=5, thrld_tr_out_zero=5,
                   thrld_tr_in_max=3e10, thrld_tr_out_max=8e10):
    
    data_last_hour = data[data['day-hour'] == hour]
    
    mask_failed = (data_last_hour.failed > thrld_failed).values
    mask_stops = (data_last_hour.stop > thrld_stops).values
    mask_tr_inp_zero = (data_last_hour.trafic_input_zero > thrld_tr_inp_zero).values
    mask_tr_out_zero = (data_last_hour.trafic_output_zero > thrld_tr_out_zero).values
    mask_tr_in_max = (data_last_hour.input_trafic > thrld_tr_in_max).values
    mask_tr_out_max = (data_last_hour.output_trafic > thrld_tr_out_max).values
    
    logins = data_last_hour.логин_абонента.values
    failed = data_last_hour.failed.values
    stops = data_last_hour.stop.values
    trafic_input_zero = data_last_hour.trafic_input_zero.values
    trafic_output_zero = data_last_hour.trafic_output_zero.values
    input_trafic = data_last_hour.input_trafic.values
    output_trafic = data_last_hour.output_trafic.values
    del data, data_last_hour
    
    resdict = defaultdict(lambda: [[], []])
    resdict['failed_alert']
    resdict['stops_alert']
    resdict['tr_inp_zero_alert']
    resdict['tr_out_zero_alert']
    resdict['tr_in_max_alert']
    resdict['tr_out_max_alert']

    for i in range(len(logins)):
        if mask_failed[i]:
            resdict['failed_alert'][0].append(logins[i])
            resdict['failed_alert'][1].append(int(failed[i]))

        if mask_stops[i]:
            resdict['stops_alert'][0].append(logins[i])
            resdict['stops_alert'][1].append(int(stops[i]))
        if mask_tr_inp_zero[i]:
            resdict['tr_inp_zero_alert'][0].append(logins[i])
            resdict['tr_inp_zero_alert'][1].append(int(trafic_input_zero[i]))

        if mask_tr_out_zero[i]:
            resdict['tr_out_zero_alert'][0].append(logins[i])
            resdict['tr_out_zero_alert'][1].append(int(trafic_output_zero[i]))
            
        if mask_tr_in_max[i]: 
            resdict['tr_in_max_alert'][0].append(logins[i])
            resdict['tr_in_max_alert'][1].append(int(input_trafic[i]))
            
        if mask_tr_out_max[i]:
            resdict['tr_out_max_alert'][0].append(logins[i])
            resdict['tr_out_max_alert'][1].append(int(output_trafic[i]))
            
    # sorting
    for key, value in resdict.items():
        if len(value[0]) == 0:
            continue
        resdict[key] = list(zip(*sorted(zip(value[0], value[1]), key=lambda x: x[1], reverse=True)))
            
    return resdict
