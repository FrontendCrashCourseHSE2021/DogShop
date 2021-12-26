import React, {useEffect, useState} from 'react';
import {ItemCatDog, ShopItem} from "./ShopItem";
import {Col, Container, Form, Row} from "react-bootstrap";
import {ListItemComponent} from "./ListItemComponent";
import {DataServiceInstance} from "./DataService";
import "./MainComponent.scss";

/**
 * Состояние компоненты главная страница
 */
interface MainComponentState {
    items: ShopItem[];
    catordog: string | null;
}

/**
 * Главная страница
 */
export function MainComponent() {
    let [state, changeState] = useState<MainComponentState>({
        items: [],
        catordog: null
    });

    useEffect(() => {
        // Один раз загружаем все товары
        DataServiceInstance.getData(state.catordog).then(value => {
            changeState({
                items: value,
                catordog: state.catordog
            });
        });
    }, [state.catordog]);

    function onCatInputChange(event: React.ChangeEvent<HTMLSelectElement>) {
        let value: string = event.target.value;

        changeState({
            ...state,
            catordog: value
        });
    }

    let items = state.items;

    return (
      <Container>
          <Row>
              <Col xs={3}>
                  <Form.Select defaultValue={""} className="catordog-select" onChange={event => onCatInputChange(event)}>
                      {
                          Object.keys(ItemCatDog).map(catordog => {
                            // @ts-ignore
                            let humanReadable = ItemCatDog[catordog]

                            return (
                                <option key={catordog} value={catordog}>
                                    {humanReadable}
                                </option>
                            );
                          })
                      }
                      <option value="">All</option>
                  </Form.Select>
              </Col>
          </Row>
          <Row>
              {
                  items.map((item: ShopItem) => {
                      return (
                          <Col xs={3} key={item.id}>
                              <ListItemComponent item={item}/>
                          </Col>
                      )
                  })
              }
          </Row>
      </Container>
    );
}
