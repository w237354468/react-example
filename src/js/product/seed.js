import {ThemeContext} from "./ProductList";
import React from "react";

export const products = [
]

let count = 1;

export default function generateNextProduct() {
    return {
        id:  ++count,
        vote: 0,
        title: 'title' + count,
        description: 'desc' + count,
        url: '#' + count
    };
}

for (let i = 0; i < 4; i++) {
    products.push(generateNextProduct());
}