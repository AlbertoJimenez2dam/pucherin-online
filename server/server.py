import asyncio
from net import listener

print('Server v0.1')

asyncio.run(listener.start())