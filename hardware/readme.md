# Запуск мониторинга оборудования с эмулятором SNMP Traps
## Запуск докеризованных сервисов
```
docker network create --driver bridge prometheus
docker run --network=prometheus -d -p 9091:9091 prom/pushgateway
```
Запускаем эмулятор SNMP TRAP (этот процесс должен работать постоянно без остановки):
```
while true; do ./push-metrics.py ;  sleep 5 ; done
```
После чего нужно зайти на `localhost:9091` и проверить, что там есть нужные метрики (`temperature`, `cpu_load`, `mem_load`).

После этого нужно узнать ip адрес контейнера пуш шлюза при помощи команды `docker network inspect prometheus` и заменить на него ip адрес в последней строчке файла `prometheus.yml`. После этого можно запускать контейнеры с `Prometheus` и `Grafana`:
```
docker run --network=prometheus -d -p 9090:9090 -v <full path to file>/prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus
docker run --network=prometheus -d -p 3000:3000 grafana/grafana
```
Надо зайти на `localhost:9090` и проверить, что нужные метрики поступают в `Prometheus` из пуш шлюза.
## Работа с Grafana
Заходим в браузере в `Grafana` на `localhost:3000` (логин: admin, пароль: admin) и там подключаем `Prometheus` в качестве источника данных. Адрес сервера `Prometheus` вводим как `http://ip:9090`, где `ip` - это адрес контейнера `Prometheus`, который можно опять же увидеть при помощи команды `docker network inspect prometheus` (не путать с контейнером пуш шлюза).

Далее в `Grafana` создаём дэшборд и добавляем в него три панели с запросом, содержащим только имя метрики. По одной панели на каждую из метрик - `temperature`, `cpu_load`, `mem_load`). Выставляем обновление на 10 секунд, подбираем глубину истории для отображения метрик. Имя панели можно изменить через JSON панели.
## Встраивание дашборда Grafana на фронтенд
```
<iframe 
    src="https://snapshot.raintank.io/dashboard-solo/snapshot/y7zwi2bZ7FcoTlB93WN7yWO4aMiz3pZb?from=1493369923321&to=1493377123321&panelId=4" 
    width="650" height="300" frameborder="0">
</iframe>
```
