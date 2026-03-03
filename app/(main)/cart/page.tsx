'use client'
import showCartItemService from "@/services/cart/showCartItemService"
import showCartServive from "@/services/cart/showCartServive"

export default function Cart() {
    const data = showCartServive()
    console.log(data)
    const dataItem = showCartItemService();
    console.log(dataItem)
    return(
        <>
        
        </>
    )
};
