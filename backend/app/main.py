from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings

from app.api.routes import auth
from app.api.routes import users
from app.api.routes import companies
from app.api.routes import branches
from app.api.routes import products
from app.api.routes import sales
from app.api.routes import inventory
from app.api.routes import vectors
from app.api.routes import matrices
from app.api.routes import operations
from app.api.routes import reports

from app.api.routes import audit

from app.api.routes.dashboard import router as dashboard_router


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


API = settings.API_V1_PREFIX


app.include_router(
    auth.router,
    prefix=API,
)

app.include_router(
    users.router,
    prefix=API,
)

app.include_router(
    companies.router,
    prefix=API,
)

app.include_router(
    branches.router,
    prefix=API,
)

app.include_router(
    products.router,
    prefix=API,
)

app.include_router(
    sales.router,
    prefix=API,
)

app.include_router(
    inventory.router,
    prefix=API,
)

app.include_router(
    vectors.router,
    prefix=API,
)

app.include_router(
    matrices.router,
    prefix=API,
)

app.include_router(
    operations.router,
    prefix=API,
)

app.include_router(
    reports.router,
    prefix=API,
)

app.include_router(
    audit.router,
    prefix=API,
)

app.include_router(
    dashboard_router,
    prefix="/api/v1"
)

@app.get("/")
def root():

    return {
        "application": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "online",
    }


@app.get("/health")
def health():

    return {
        "status": "healthy"
    }