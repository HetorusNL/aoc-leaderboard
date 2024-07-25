import time
from dataclasses import dataclass

CACHE_DURATION: int = 5 * 60  # time in seconds


@dataclass
class CacheEntry:
    fetch_time: float
    data: dict


class Cache:
    def __init__(self):
        self.cache_dict: dict[str, CacheEntry] = {}

    def clear(self):
        """clear all entries from the cache"""
        self.cache_dict.clear()

    def get(self, name: str) -> dict | None:
        """get an entry from the cache if it hasn't expired yet"""
        if entry := self.cache_dict.get(name):
            print(f"found entry with name {name} in cache")
            # if the cache has expired, delete the item
            if time.time() > entry.fetch_time + CACHE_DURATION:
                print(f"cache duration expired, deleting entry with name {name}")
                try:
                    del self.cache_dict[name]
                except:
                    # we can have simultanuous fetches
                    # so this function can be called multiple times
                    # meaning a different invocation already deleted the entry
                    pass
            # otherwise return the cache entry
            else:
                return entry.data

        # when the entry is not present, or is expired and deleted, return None
        return None

    def add(self, name: str, data: dict) -> None:
        """add an entry to the cache and store it for CACHE_DURATION seconds"""
        print(f"adding entry with name {name} to cache")
        self.cache_dict[name] = CacheEntry(fetch_time=time.time(), data=data)
