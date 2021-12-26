import React from 'react';
import './App.css';
import {MainComponent} from "./MainComponent";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {SingleItemComponent} from "./SingleItemComponent";
import {CartComponent} from "./CartComponent";
import {Button, Container, Nav, Navbar,Alert} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {faOpencart} from "@fortawesome/free-brands-svg-icons";
import { faPaw } from '@fortawesome/free-solid-svg-icons'
/**
 * Главная компонента приложения.
 */
export function App() {

    return (
        // В корне приложения -- роутер, который "отрисовывает" нужную компоненту в зависимости от URL
        <BrowserRouter>
            {/*Часть, которая рисуется всегда -- хедер страницы*/}
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Передержка хвостиков 🐈🐕❤ </Navbar.Brand>
                    <Nav className="me-auto">
                        {/*Ссылка перехода на главную страницу*/}
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav>
                    <Nav className="justify-content-end">
                        {/*Ссылка для перехода в корзину*/}
                        <Link to={"/cart"}>
                            {/*Кнопка корзины*/}
                            <Button variant={"primary"}>
                                {/*Иконка с корзиной*/}
                                <Navbar.Brand href="/">Корзина помощи </Navbar.Brand>
                                <FontAwesomeIcon icon={faPaw} />
                            </Button>
                        </Link>
                    </Nav>
                </Container>
            </Navbar>

            <Alert variant="success">
                <Alert.Heading>Привет,мы рады, что ты решил помочь милым хвостикам</Alert.Heading>
                <p>
                    Если ты сам хочешь приютить животное, то просто жми на карточку питомца, там вся контактная информация
                </p>
                <hr />
                <p className="mb-0">
                   Если ты хочешь помочь денежкой, то жми на кнопочку помочь, на карточке указана минимальная сумма необходимая для помощи и восстановления питомца 💕
                </p>
            </Alert>

            <Routes>
                {/*Три пути:*/}
                {/*1. / - главная страница*/}
                {/*2. /item/:itemId - конкретный элемент из "ассортимента"*/}
                {/*3. /cart - корзина*/}
                <Route path={""} element={<MainComponent/>}/>
                <Route path={"item/:itemId"} element={<SingleItemComponent/>}/>
                <Route path={"cart"} element={<CartComponent/>}/>
            </Routes>

        </BrowserRouter>
    );
}

export default App;
