from collections import defaultdict
import pandas as pd
import telebot

bot = telebot.TeleBot('1029001716:AAGHzYsNcN33ZiGqq9Ubn4c5Wee1Qiu9MHA')
path_id_list = 'bot_id_list'
data = pd.read_csv('../../Data/gb_userlogin_hour.csv')
data = data[~((data.input_trafic == 0) & (data.output_trafic == 0))]

def get_alert_dict(data, hour, send_telegram=True,
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

    if send_telegram:
        send_info(resdict, hour)
    return resdict


def send_info(info_dict, date):
    with open(path_id_list, 'r') as f:
        id_list = [int(x.strip()) for x in f.readlines()]
    
    
    num_failed = len(info_dict['failed_alert'][0])
    num_stops = len(info_dict['stops_alert'][0])
    num_zero_in_tr = len(info_dict['tr_inp_zero_alert'][0])
    num_zero_out_tr = len(info_dict['tr_out_zero_alert'][0])
    num_max_in_tr = len(info_dict['tr_in_max_alert'][0])
    num_max_out_tr = len(info_dict['tr_out_max_alert'][0])
    
    
    msg = 'date, hour: {}\nfailed: {}\nstops: {}\nzero input traffic: {}\nzero output traffic: {}\nmaximum input traffic reached: {}\nmaximum output traffic reached: {}'.format(
    date, num_failed, num_stops, num_zero_in_tr, num_zero_out_tr, num_max_in_tr, num_max_out_tr)
    for chat_id in id_list:
        bot.send_message(chat_id, msg)
