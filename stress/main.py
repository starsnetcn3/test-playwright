import requests
import threading
import time
import random

link = 'https://laravel.com/'
link = 'http://localhost:8880/api/admin/tests/health-check'
link = 'http://192.168.0.137:8880/api/customer/stores/default-main-store/product-management/products/filter?per_page=12'
# link = 'http://192.168.0.137:8880/api/admin/tests/health-check'
link = 'https://www.charmingfashion.com.hk/shop/main/product/64084038a328d1d2910a4b1c/women-s-oakmont-chunky-sneakers'

# COUNT = 1

def apiCall():
    start = time.perf_counter()
    res = requests.get(link)
    request_time = time.perf_counter() - start
    print(request_time)

def main():
    threads = []
    COUNT = 30

    print(f"Threads: {COUNT}")
    for i in range(COUNT):
        threads.append(threading.Thread(target=apiCall))
    for thread in threads:
        thread.start()
    for thread in threads:
        thread.join()
    print(f"Threads: {COUNT}")


        
    
if __name__ == '__main__':
    main()