# %%
import numpy as np
import pandas as pd

ind = pd.date_range(start="2020-04-29", end="2020-04-30", freq="5S")
temperature = [31] * len(ind)
cpu_load = np.random.lognormal(mean=3, sigma=.4, size = len(ind))
mem_load = np.random.lognormal(mean=3, sigma=.4, size = len(ind))
mem_load

# %%
min(cpu_load), max(cpu_load), min(mem_load), max(mem_load)

# %%
pd.Series(mem_load).hist()

# %%
df = pd.DataFrame({"temp": temperature, "cpu": cpu_load, "mem": mem_load}, index=ind)
df

# %%
df.to_csv("snmp_data.csv", index_label="time")

# %%
