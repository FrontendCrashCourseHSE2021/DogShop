import React, {useEffect, useState} from 'react';
import {ItemColor, ShopItem} from "./ShopItem";
import {Col, Container, Form, Row} from "react-bootstrap";
import {ListItemComponent} from "./ListItemComponent";
import {DataServiceInstance} from "./DataService";
import "./MainComponent.scss";

/**
 * Состояние компоненты главная страница
 */
interface MainComponentState {
    items: ShopItem[];
    artist: string | null;
}

/**
 * Главная страница
 */
export function MainComponent() {
    let [state, changeState] = useState<MainComponentState>({
        items: [],
        artist: null
    });

    useEffect(() => {
        // Один раз загружаем все товары
        DataServiceInstance.getData(state.artist).then(value => {
            changeState({
                items: value,
                artist: state.artist
            });
        });
    }, [state.artist]);

    function onColorInputChange(event: React.ChangeEvent<HTMLSelectElement>) {
        let value: string = event.target.value;

        changeState({
            ...state,
            artist: value
        });
    }

    let items = state.items;

    return (
      <Container>
          <Row>
              <Col xs={3}>
                  <Form.Select defaultValue={""} className="color-select" onChange={event => onColorInputChange(event)}>
                      {
                          Object.keys(ItemColor).map(artist => {
                            // @ts-ignore
                            let humanReadable = ItemColor[artist]

                            return (
                                <option key={artist} value={artist}>
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
