import React, {useEffect, useState} from 'react';
import {ItemKind, ShopItem} from "./ShopItem";
import {Col, Container, Form, Row} from "react-bootstrap";
import {ListItemComponent} from "./ListItemComponent";
import {DataServiceInstance} from "./DataService";
import "./MainComponent.scss";

/**
 * Состояние компоненты главная страница
 */
interface MainComponentState {
    items: ShopItem[];
    kind: string | null;
}

/**
 * Главная страница
 */
export function MainComponent() {
    let [state, changeState] = useState<MainComponentState>({
        items: [],
        kind: null
    });

    useEffect(() => {
        // Один раз загружаем все товары
        DataServiceInstance.getData(state.kind).then(value => {
            changeState({
                items: value,
                kind: state.kind
            });
        });
    }, [state.kind]);

    function onColorInputChange(event: React.ChangeEvent<HTMLSelectElement>) {
        let value: string = event.target.value;

        changeState({
            ...state,
            kind: value
        });
    }

    let items = state.items;

    return (
      <Container>
          <Row>
              <Col xs={3}>
                  <Form.Select defaultValue={""} className="color-select" onChange={event => onColorInputChange(event)}>
                      {
                          Object.keys(ItemKind).map(kind => {
                            // @ts-ignore
                              let humanReadable = ItemKind[kind]

                            return (
                                <option key={kind} value={kind}>
                                    {humanReadable}
                                </option>
                            );
                          })
                      }
                      <option value="">Всё</option>
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
