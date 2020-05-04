#!/usr/bin/env python3
import random
from prometheus_client import CollectorRegistry, Gauge, push_to_gateway
hostname = "localhost:9091"
# num from 1-10
num = random.randint(1, 10)
registry = CollectorRegistry()
g = Gauge(
    'fur_removal_seconds_total',
    'how long it to to remove fur from my cat',
    registry=registry)
# g.set_to_current_time()
g.set(num)
push_to_gateway(hostname, job='batchB', registry=registry)
print(num)
