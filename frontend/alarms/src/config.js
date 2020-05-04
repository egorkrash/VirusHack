
const defaults = {
  userName: ["Инженер", "Петров И.У."],
  hour_textHour: {
    "0": '2020-04-30 00:00',
    "1": '2020-04-30 01:00',
    "2": '2020-04-30 02:00',
    "3": '2020-04-30 03:00',
    "4": '2020-04-30 04:00',
    "5": '2020-04-30 05:00',
    "6": '2020-04-30 06:00',
    "7": '2020-04-30 07:00',
    "8": '2020-04-30 08:00',
    '9': '2020-04-30 09:00',
    "10": '2020-04-30 10:00',
    "11": '2020-04-30 11:00',
    "12": '2020-04-30 12:00',
    "13": '2020-04-30 13:00',
    "14": '2020-04-30 14:00',
    "15": '2020-04-30 15:00',
    "16": '2020-04-30 16:00',
    "17": '2020-04-30 17:00',
    "18": '2020-04-30 18:00',
    "19": '2020-04-30 19:00',
    "20": '2020-04-30 20:00',
    "21": '2020-04-30 21:00',
    "22": '2020-04-30 22:00',
    "23": '2020-04-30 23:00',
    "24": '2020-04-30 24:00',
  },
  typeAlarm_to_color: {
    "incident": "danger",
    "high probability incident": "warning",
    "probability incident": "info"
  },
  targets_get_real_and_pred_data: [
    'start_stop_alige_count_', 'start_stop_alige_count_Alive',
    'start_stop_alige_count_Start', 'start_stop_alige_count_Stop',
    'type__count_Billing-Accounting', 'type__count_Billing-Authentication',
    'mean_delay', 'mean_input_trafic', 'mean_output_trafic',
    'count_failed'
  ]
};

export default defaults;
