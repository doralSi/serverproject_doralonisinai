import { generateBizNumber } from "../helpers/generateBizNumber.js";
import { validateCard } from "../validation/cardValidationService.js";
import {
  createCard,
  deleteCardInDb,
  getAllCardsFromDb,
  getCardByIdFromDb,
  updateCardInDb,
} from "./cardsDataService.js";

//get all
export const getAllCards = async () => {
  const cards = await getAllCardsFromDb();
  return cards;
};

//get one by id
export const getCardById = async (id) => {
  const card = await getCardByIdFromDb(id);
  return card;
};

//create
export const createNewCard = async (card, userId) => {
  try {
    //generate biznumber for the card
    card.bizNumber = await generateBizNumber();
    card.user_id = userId;
    
    const { error } = validateCard(card);
    if (error) {
      return null;
    }
    
    const newCard = await createCard(card);
    return newCard;
  } catch (error) {
    return null;
  }
};

//update
export const updateCard = async (id, newCard) => {
  const modifiedCard = await updateCardInDb(id, newCard);
  return modifiedCard;
};

//delete
export const deleteCard = async (id) => {
  const idOfDeletedCard = await deleteCardInDb(id);
  return idOfDeletedCard;
};

//toggleLike

//changeBizNumber
