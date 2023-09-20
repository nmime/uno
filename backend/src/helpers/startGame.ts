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
import { shuffle } from "common/utils"
import { updateUser } from "@helpers/updateUser"
import { updateMetadata } from "@helpers/updateMetadata"

export async function startGame(room: MyRoom): Promise<void> {
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
    player.cardsCount = player.cards.length
    player.ready = false
    player.winAmount = undefined
    player.points = undefined
  })

  let fit = false
  while (!fit) {
    const firstCard = room.state.getAvailableCards(1).at(0)

    if (
      firstCard.cardColor === "black" ||
      firstCard.cardType === "reverse" ||
      firstCard.cardType === "block" ||
      firstCard.cardType === "take-2"
    )
      fit = false
    else {
      fit = true

      room.state.currentCardParams = firstCard
    }
  }

  room.state.status = "playing"
  await room.lock()
  updateMetadata(room)

  const playersArray = Array.from(room.state.players.values())

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
  await Promise.all(
    playersArray.map((player) =>
      updateUser(player.info.id, {
        $inc: { balance: -room.state.bet }
      })
    )
  )
}
