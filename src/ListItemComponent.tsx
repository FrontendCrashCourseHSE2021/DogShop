import React from 'react';
import {ShopItem} from "./ShopItem";
import {Button, Card} from "react-bootstrap";
import "./ListItemComponent.scss";
import {Link} from "react-router-dom";
import {cartService} from "./CartService";
import {cartItemFromShopItem} from "./CartItem";

/**
 * Входные параметры компоненты "элемент списка на главной странице"
 */
interface ListItemComponentProps {
    // Товар
    item: ShopItem;
}

/**
 * Элемент списка товаров на главной странице
 * @param props Входные параметры.
 */
export function ListItemComponent(props: ListItemComponentProps) {
    let item = props.item;

    // Функция для обработки нажатия на кнопку "добавить в корзину"
    function addToCart(item: ShopItem) {
        cartService.addCartItem(cartItemFromShopItem(item));
    }

    return (
        <Card className={"list-item"} style={{ width: '18rem' }}>
            <Card.Img style={{height: 242}} variant="top" src={item.imageSrc} />
            <Card.Body>
                <Card.Title>
                    <Link to={"/item/" + item.id}>
                        {item.title}
                    </Link>
                </Card.Title>
                <Card.Text>
                    {item.brief}
                </Card.Text>
                <span><b>${item.price}</b></span>
                <div className="add-to-cart"><Button onClick={() => addToCart(item)} variant="success">Помочь 💸 </Button></div>
            </Card.Body>
        </Card>
    );

}
