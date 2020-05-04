#!/usr/bin/env python3
import random

import numpy as np
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
# push_to_gateway(hostname, job='batchB', registry=registry)
print("num:", num)

temperature = 31
cpu_load = np.random.lognormal(mean=3, sigma=.4)
mem_load = np.random.lognormal(mean=3, sigma=.4)
metrics = [(temperature, "temperature", "Device temperature"),
           (cpu_load, "cpu_load", "CPU load"),
           (mem_load, "mem_load", "Memory load")]
for metric in metrics:
    # registry = CollectorRegistry()
    g = Gauge(metric[1], metric[2], registry=registry)
    g.set(metric[0])
    print(metric[1], metric[0])
push_to_gateway(hostname, job='batchB', registry=registry)
