
const data_alarms = {
  history: [
    {
      "id": 1,
      "date_begin": "2020-10-10 09:11:15",
      "date_end": "2020-10-10 09:16:15",
      "alarm_type": "incident",
      "what": "datchik #2",
      "predict": "95%",
      "value": "96%",
      "normal_diapason": "30%-90%",
      "comments": [{
        "author": "Engineer Ivanov A.U.",
        "date": "2020-10-10 09:15:15",
        "comment": "Make some changes"
      }]
    },
    {
      "id": 2,
      "date_begin": "2020-10-10 08:11:15",
      "date_end": "2020-10-10 09:11:15",
      "alarm_type": "high probability incident",
      "what": "datchik #2",
      "predict": "92%",
      "value": "86%",
      "normal_diapason": "30%-90%",
      "comments": [{
        "author": "Engineer Ivanov A.U.",
        "date": "2020-10-10 08:25:15",
        "comment": "watching the situation"
      }]
    },
    {
      "id": 3,
      "date_begin": "2020-10-10 07:11:15",
      "date_end": "2020-10-10 08:11:15",
      "alarm_type": "probability incident",
      "what": "datchik #2",
      "predict": "89%",
      "value": "76%",
      "normal_diapason": "30%-90%",
      "comments": []
    }
  ],
  current: [
    {
      "id": 4,
      "date_begin": "2020-10-11 09:11:15",
      "alarm_type": "incident",
      "what": "datchik #4",
      "predict": "95%",
      "value": "96%",
      "normal_diapason": "30%-90%",
      "comments": [{
        "author": "Engineer Ivanov A.U.",
        "date": "2020-10-10 09:15:15",
        "comment": "Make some changes"
      }]
    },
    {
      "id": 5,
      "date_begin": "2020-10-11 08:11:15",
      "alarm_type": "high probability incident",
      "what": "datchik #5",
      "predict": "92%",
      "value": "86%",
      "normal_diapason": "30%-90%",
      "comments": []
    },
    {
      "id": 6,
      "date_begin": "2020-10-11 07:11:15",
      "alarm_type": "probability incident",
      "what": "datchik #6",
      "predict": "89%",
      "value": "76%",
      "normal_diapason": "30%-90%",
      "comments": []
    }
  ]
};

export default data_alarms;
