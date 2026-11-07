from pydantic import BaseModel, Field
from typing import List, Optional

class ProductBase(BaseModel):
    name: str
    category: str
    description: Optional[str] = None
    price_ves: float
    price_ref: Optional[str] = None
    stock_status: Optional[str] = "Disponible"
    image_url: Optional[str] = None
    local_image: Optional[str] = None

class ProductResponse(ProductBase):
    id: int

class ColorItem(BaseModel):
    id: int
    name: str
    code: str
    hex_code: str
    paint_type: str

class OrderItemCreate(BaseModel):
    product_id: Optional[int] = None
    product_name: str
    unit_price_ves: float
    quantity: int = Field(ge=1)
    total_price_ves: float

class OrderCreate(BaseModel):
    customer_name: str
    customer_document: str
    customer_phone: str
    customer_email: Optional[str] = ""
    delivery_method: str
    delivery_address: Optional[str] = ""
    payment_method: str
    subtotal_ves: float
    total_ves: float
    total_ref: Optional[float] = 0.0
    notes: Optional[str] = ""
    items: List[OrderItemCreate]

class OrderResponse(BaseModel):
    id: int
    order_number: str
    customer_name: str
    customer_document: str
    customer_phone: str
    customer_email: Optional[str] = None
    delivery_method: str
    delivery_address: Optional[str] = None
    payment_method: str
    subtotal_ves: float
    total_ves: float
    total_ref: Optional[float] = None
    status: str
    created_at: str
    items: List[dict] = []

class CompanyInfoResponse(BaseModel):
    name: str
    legal_name: str
    rif: str
    schedule: str
    phone: str
    whatsapp: str
    email: str
    address: str
    instagram: str
    tiktok: str
    store_url: str
    payment_methods: List[dict] = []

class SearchCategoryItem(BaseModel):
    name: str
    description: str

class SearchPageItem(BaseModel):
    title: str
    description: str
    href: Optional[str] = None
    page: Optional[str] = None
    type: str

class SearchResponse(BaseModel):
    query: str
    products: List[ProductResponse] = []
    categories: List[SearchCategoryItem] = []
    pages: List[SearchPageItem] = []
