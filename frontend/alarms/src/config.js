
const defaults = {
  userName: ["Инженер", "Петров И.У."],
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
