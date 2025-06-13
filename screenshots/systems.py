SETTINGS = {
    "logistics": {
        "title": "物流管理系統",
        "keywords": {
            "customer_static": [],
            "admin_static": ["logistics"],
            "customer_api": [],
            "admin_api": ["logistics"],
            "online_flow": [],
            "offline_flow": []}
    },
    "order": {
        "title": "訂單管理系統",
        "keywords": {
            "customer_static": ["|order"],
            "admin_static": ["shop|online|order"],
            "customer_api": ["|order"],
            "admin_api": ["|order"],
            "online_flow": [],
            "offline_flow": []}
    },
    "inventory": {
        "title": "庫存管理系統",
        "keywords": {
            "customer_static": [],
            "admin_static": ["warehouse",
                             "shop|online|category",
                             "fplace-order"
                             ],
            "customer_api": [],
            "admin_api": ["warehouse"],
            "online_flow": [],
            "offline_flow": []}
    },
    "membership": {
        "title": "會員及積分管理系統",
        "keywords": {
            "customer_static": ["authentication", "account"],
            "admin_static": ["membership", "customer", "shop|discount|order"],
            "customer_api": ["auth", "acount"],
            "admin_api": ["membership", "customer", "discount|order"],
            "online_flow": [],
            "offline_flow": []},
    },
    "shop": {
        "title": "網店",
        "keywords": {
            "customer_static": [
                "account",
                "shop|main|category"
                "shop|main|product",
                "shop|main|wishlist",
                "shop|mini|category",
                "shop|mini|product",
                "shop|main|cart",
                "terms-of-service"
            ],
            "admin_static": ["shop|online"],
            "customer_api": ["shop", "tos"],
            "admin_api": ["shop|online"],
            "online_flow": [],
            "offline_flow": []},
    },
    "cashflow": {
        "title": "現金流量管理系統",
        "keywords": {
            "customer_static": [],
            "admin_static": ["|cash-flow"],
            "customer_api": [],
            "admin_api": ['expenses'],
            "online_flow": [],
            "offline_flow": []},
    },
    "app": {
        "title": "原生流動應用程式",
        "keywords": {
            "customer_static": [],
            "admin_static": [],
            "customer_api": [],
            "admin_api": [],
            "online_flow": [],
            "offline_flow": []},
    },
    "statistics": {
        "title": "網站雲端數據分析系統",
        "keywords": {
            "customer_static": [],
            "admin_static": [
                "dashboard",
            ],
            "customer_api": [],
            "admin_api": [],
            "online_flow": [],
            "offline_flow": []},
    },
    "x_in_1": {
        "title": "多合一共同後台",
        "keywords": {
            "customer_static": [],
            "admin_static": [
                "configuration",
                "authentication",
                "staff-roles-and-permission",
                "tos",
                "enquiry",
                "contact-us"
            ],
            "customer_api": [],
            "admin_api": ["config", "auth", "roles", "tos", "enquiry", "contact-us"],
            "online_flow": [],
            "offline_flow": []},
    },
    "online_course": {
        "title": "online_course",
        "keywords": {
            "customer_static": [],
            "admin_static": [],
            "customer_api": [],
            "admin_api": [],
            "online_flow": [],
            "offline_flow": []},
    },
    "hr": {
        "title": "hr",
        "keywords": {
            "customer_static": [],
            "admin_static": [],
            "customer_api": [],
            "admin_api": [],
            "online_flow": [],
            "offline_flow": []},
    },
    "appointment": {
        "title": "預約管理系統",
        "keywords": {
            "customer_static": [],
            "admin_static": [],
            "customer_api": [],
            "admin_api": [],
            "online_flow": [],
            "offline_flow": []},
    },
    "crm": {
        "title": "crm",
        "keywords": {
            "customer_static": [],
            "admin_static": [],
            "customer_api": [],
            "admin_api": [],
            "online_flow": [],
            "offline_flow": []},
    },
    "website": {
        "title": "網頁",
        "keywords": {
            "customer_static": [
                "about-us"
                "contact-us",
                "shop|main|product",
                "shop|main|cart",
            ],
            "admin_static": [],
            "customer_api": [],
            "admin_api": [],
            "online_flow": [],
            "offline_flow": []},
    },
}
