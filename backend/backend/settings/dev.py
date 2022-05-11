from .common import *

INTERNAL_IPS = [
    "127.0.0.1",
]

INSTALLED_APPS += [
    'debug_toolbar',
]

MIDDLEWARE += [
    "debug_toolbar.middleware.DebugToolbarMiddleware",
] + MIDDLEWARE

CORS_ORIGIN_WHITELIST = ["http://localhost:3000"]