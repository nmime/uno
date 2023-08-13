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
import { shuffle } from "common/utils/shuffle"

export function startGame(room: MyRoom): void {
  cardColorsDefault.forEach((cardColor) => {
    room.state.availableCards.push(new CardDataClass(cardColor, cardType0))
  })

  for (let i = 0; i < 2; i++) {
    cardColorsDefault.forEach((cardColor) => {
      cardTypeDefault.forEach((cardType) =>
        room.state.availableCards.push(new CardDataClass(cardColor, cardType))
      )
    })

    cardColorsDefault.forEach((cardColor) => {
      cardTypeSpecial.forEach((cardType) =>
        room.state.availableCards.push(new CardDataClass(cardColor, cardType))
      )
    })
  }

  cardTypeBlack.forEach((cardType) => {
    for (let i = 0; i < 4; i++) {
      room.state.availableCards.push(
        new CardDataClass(cardColorBlack, cardType)
      )
    }
  })

  let array = Array.from(room.state.availableCards)
  array = shuffle(array)
  room.state.availableCards.length = 0
  array.forEach((card) => room.state.availableCards.push(card))

  room.state.currentPlayer = Number(
    Array.from(room.state.players.keys())[
      randomInt(
        Array.from(room.state.players.values()).filter((p) => p.ready).length
      )
    ]
  )

  room.state.players.forEach((player) => {
    player.cards = sortCards(room.state.getAvailableCards(7))
  })

  let fit = false
  while (!fit) {
    const firstCard = room.state.getAvailableCards(1).at(0)

    if (firstCard.cardType === "take-4") fit = false
    else {
      fit = true

      room.state.currentCardParams = firstCard
    }
  }

  room.state.status = "playing"
}
