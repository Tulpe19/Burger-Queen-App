export interface Order {
    id?: number,
    userId: number,
    client: string,
    products: ProductOrder[],
    status: 'pending' | 'canceled' | 'delivered' | 'delivering',
    dateEntry?: string,
    dateProcessed?: string,
}

export interface Product {
    id: number,
    name: string,
    price: number,
    image: string,
    type: string,
    dateEntry: string,
}

export interface ProductOrder {
    qty: number,
    product: Product
}
