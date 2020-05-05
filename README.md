# VirusHack

## Описание проекта
Проект сделан командой Pegasus в рамках хакатона VirusHack 2020.

Наше решение использует логи Radius'а для прогнозирования нагрузки на сеть.

Фронтенд решения на React содержит визуализацию основных показателей Radius'а и данных с сетевых устройств.

При возникновении подозрительных событий соответствующие уведомления направляются на фронтенд и в бот Telegram.

Показатели с SNMP Traps поступают в онлайн режиме в специализированные сборщик и хранилище, после чего отображаются визуально на дэшборде (используется связка Prometheus-Grafana).

## Structure of product

### Dataflow part

![](dataflow.png)

### Backend part

![](backend_diagram.png)

## Web-server (Flask)

### Install dependencies
Необходимо установить питоновские пакеты из файла `requirements.txt`.

### Download data
Нужно скачать и разархивировать в папку `/data` файлы по ссылке `https://yadi.sk/d/bdZNeshwy2slmQ`.

### Run server

to run server run in root directory (port 4500):

`python backend.py`

or

`python3 backend.py`


### API documentation

#### get time series of given target with forecasting (for the last 24 hours)

#### /get_real_and_pred_data (POST)

##### request

```
json
{
"date": date 
}
```
available 24 hours from '2020-04-30 00:00:00' untill '2020-04-30 23:00:00'

example:

`date = 2020-04-30 16:00:00`

 
##### response

```
json
{ 
"xticks" : [],
"start_stop_alige_count_Start": [],
"start_stop_alige_count_Stop": [],
"type__count_Billing-Accounting": [],
"type__count_Billing-Authentication": [],
"mean_delay": [],
"mean_input_trafic": [],
"mean_output_trafic": [],
"count_failed": [],
"start_stop_alige_count_Start_pred": [],
"start_stop_alige_count_Stop_pred": [],
"type__count_Billing-Accounting_pred": [],
"type__count_Billing-Authentication_pred": [],
"mean_delay_pred": [],
"mean_input_trafic_pred": [],
"mean_output_trafic_pred": [],
"count_failed_pred": [],
}
```

pay attention:

xticks has size of `n` and target_pred has a size of `n`, but target has a size of `n-1` because target has all real values of time series and target_pred has a size of the history of predicted values and forecasting for the next hour



#### get time series of snmp data for the last hour

#### /get_snmp_data (GET)

##### response

```
{ 
"xticks" : [],
"temp" : [],
"mem" : [],
"cpu" : []
}
```

#### Get alert users

#### /get_alert_users (POST)

#### request

```
{
"hour": hour
}
```
sample value:

`"hour": "05-03 00"`




##### response

```
{ 
"failed_alert" : [list_of_users, list_of_values],
"stops_alert" : [list_of_users, list_of_values],
"tr_inp_zero_alert" : [list_of_users, list_of_values],
"tr_out_zero_alert" : [list_of_users, list_of_values]
}
```
## Frontend Instructions
### Подготовка
- Установить `nvm` (перелогиниться после этого): `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash`
- Установить `node`: `nvm install node`
### Запуск
```
cd frontend/alarms
npm install
npm start
```
В браузере `Chrome` откроется страница приложения на `localhost:4000`.
## SNMP Monitoring
См. файл `hardware/readme.md`
