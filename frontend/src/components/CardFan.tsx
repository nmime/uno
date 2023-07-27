import Card, { CardProps } from "@components/Card"
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult
} from "react-beautiful-dnd"
import { Component } from "react"
import type { CardDataClass } from "common"

type CardFanProps = {
  cards: CardDataClass[]
}

const angle = 90

export default class CardFan extends Component<CardFanProps> {
  cards: CardProps["card"][]

  constructor(props: CardFanProps) {
    super(props)

    this.cards = props.cards

    this.onDragEnd = this.onDragEnd.bind(this)
  }

  onDragEnd(result: DropResult) {
    console.log(result)

    if (!result.destination) return

    /*const items = reorder(
      this.cards,
      result.source.index,
      result.destination.index
    )*/
  }

  render() {
    return (
      <div className="fixed bottom-10 w-screen w-screen">
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {this.cards.map((card, index) => {
                  const rotateAngle =
                    -angle / 2 + (angle / (this.cards.length + 1)) * (index + 1)

                  return (
                    <Draggable
                      key={index}
                      draggableId={`${String(index)}_${card.cardColor}_${
                        card.cardType
                      }`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div
                            key={index}
                            style={{
                              position: "absolute",
                              left: "50%",
                              transformOrigin: "bottom",
                              transform: `translate(${
                                snapshot.isDragging ? "0%" : "-50%"
                              }, ${
                                snapshot.isDragging ? "0%" : "-50%"
                              }) rotate(${
                                snapshot.isDragging ? 0 : rotateAngle
                              }deg)`
                            }}
                          >
                            <Card card={card} />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  )
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    )
  }
}
