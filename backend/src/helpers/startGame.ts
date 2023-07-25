import {
  cardColorBlack,
  cardColorsDefault,
  CardDataClass,
  cardType0,
  cardTypeBlack,
  cardTypeDefault,
  cardTypeSpecial
} from "common"
import { randomInt } from "crypto"
import { MyRoom } from "@typings/room"
import { sortCards } from "@utils/sortCards"

const pushRandom = (array: CardDataClass[], item: CardDataClass): void => {
  const randomIndex = Math.floor(Math.random() * (array.length + 1))

  array.push(item)
}

export function startGame(room: MyRoom) {
  cardColorsDefault.forEach((cardColor) => {
    pushRandom(
      room.state.availableCards,
      new CardDataClass(cardColor, cardType0)
    )
  })

  for (let i = 0; i < 2; i++) {
    cardColorsDefault.forEach((cardColor) => {
      cardTypeDefault.forEach((cardType) =>
        pushRandom(
          room.state.availableCards,
          new CardDataClass(cardColor, cardType)
        )
      )
    })

    cardColorsDefault.forEach((cardColor) => {
      cardTypeSpecial.forEach((cardType) =>
        pushRandom(
          room.state.availableCards,
          new CardDataClass(cardColor, cardType)
        )
      )
    })
  }

  cardTypeBlack.forEach((cardType) => {
    for (let i = 0; i < 4; i++) {
      pushRandom(
        room.state.availableCards,
        new CardDataClass(cardColorBlack, cardType)
      )
    }
  })

  room.state.currentPlayer = Number(
    Array.from(room.state.players.keys())[
      randomInt(
        Array.from(room.state.players.values()).filter((p) => p.ready).length
      )
    ]
  )

  room.state.players.forEach((player) => {
    player.cards = sortCards(room.state.availableCards.splice(0, 7))
  })

  let fit = false
  while (!fit) {
    const firstCard = room.state.availableCards.splice(0, 1)[0]

    if (firstCard.type === "take-4") fit = false
    else {
      fit = true

      room.state.usedCards.push(firstCard)
      room.state.currentCardParams = firstCard
    }
  }

  room.state.isDirectionClockwise = true
  room.state.status = "playing"
}
