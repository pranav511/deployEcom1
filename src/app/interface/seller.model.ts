export class SignUp {
    name!: string;
    email!: String;
    password!: String;
}

export class Login {
    email!: string;
    password!: string;
}
export class Product {
    id!: number
    name!: string;
    price!: number;
    category!: string;
    color!: string;
    description!: string;
    image!: string;
    quantity: undefined | number;
    productId: undefined | number;
}
export class Cart {
    id!: number | undefined;
    name!: string;
    price!: number;
    category!: string;
    color!: string;
    description!: string;
    image!: string;
    quantity: undefined | number;
    userId: number | undefined;
    productId: number | undefined;
}
export class summaryPrice {
    price: number | undefined;
    discount: number | undefined;
    delivery: number | undefined;
    tax: number | undefined;
    total: number | undefined;
}
export class order {
    email: string | undefined;
    address: string | undefined;
    contact: string | undefined;
    totalPrice:number |undefined;
    userId:number | undefined;
    id:number | undefined;

}