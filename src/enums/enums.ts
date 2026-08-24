export enum Role {
    ADMIN = "admin",
    DELIVERY = "delivery",
    CUSTOMER = "customer",
    RESTURANT = "resturant"
}

export enum DELIVERY_STATUS {
    ORDER_PLACED = "placed",
    ORDER_MOVED = "moved",
    ORDER_DELIVERED = "delivered",
    ORDER_CANCELED = "canceled"
}

export enum RESTURANT_ORDER_STATUS {
    ORDER_BOOKED = "booked",
    ORDER_ACCEPTED = "accepted",
    ORDER_PENDING = "pending",
    ORDER_CANCELED = "canceled",
    ORDER_COMPLETED = "completed"
}

export enum RESTURANT_STATUS {
    RESTURANT_OPEN = "open",
    RESTURANT_CLOSE = "close"
}

export enum RESTURANT_IS_APPROVED { 
    RESTURANT_APPROVED = "approved",
    RESTURANT_PENDING = "pending",
    RESTURANT_REJECTED = "rejected"
}

export enum ITEM_TYPE {
    APPETIZER = "APPETIZER",
    MAIN_COURSE = "MAIN_COURSE",
    SNACK = "SNACK",
    DESSERT = "DESSERT",
    BEVERAGE = "BEVERAGE",
    BREAKFAST = "BREAKFAST",
    SALAD = "SALAD",
    SOUP = "SOUP",
    SIDE_DISH = "SIDE_DISH",
    FAST_FOOD = "FAST_FOOD",
    STREET_FOOD = "STREET_FOOD",
    BAKERY = "BAKERY",
    OTHER = "OTHER"
}