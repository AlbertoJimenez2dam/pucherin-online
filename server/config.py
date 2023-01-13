from configparser import ConfigParser

config = ConfigParser()

config.read('config.ini')

def getValue(section, key):
    return config.get(section, key)

def getValueInt(section, key):
    return config.getint(section, key)