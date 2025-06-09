import { AppApi } from './components/base/AppApi';
import { BasketModel } from './components/model/BasketModel';
import { ProductsModel } from './components/model/ProductsModel';
import { Basket } from './components/view/Basket';
import { BasketItem } from './components/view/BasketItem';
import { CardPreview } from './components/view/CardPreview';
import { GalleryItem } from './components/view/GalleryItem';
import { Modal } from './components/view/Modal';
import { Page } from './components/view/Page';
import './scss/styles.scss';
import { API_URL } from './utils/constants';
import { cloneTemplate } from './utils/utils';
import { PaymentForm } from './components/view/PaymentForm';
import { ContactsForm } from './components/view/ContactsForm';
import { Success } from './components/view/Success';
import { EventEmitter } from './components/base/events';
import { PaymentMethod } from './types';
import { OrderModel } from './components/model/OrderModel';

const events = new EventEmitter();

const api = new AppApi(API_URL);
const productsModel = new ProductsModel(events);
const basketModel = new BasketModel(events);
const orderModel = new OrderModel(events);

const page = new Page(document.querySelector('.page'), events);
const modal = new Modal(document.querySelector('#modal-container'), events);
const basket = new Basket(cloneTemplate('#basket'), events);

const paymentForm = new PaymentForm(cloneTemplate('#order'), events);
const contactsForm = new ContactsForm(cloneTemplate('#contacts'), events);

const success = new Success(cloneTemplate('#success'), events);

api.getProductList()
  .then(data => {
    productsModel.products = data.items;
  })
  .catch(err => console.error(err))

events.on('products:changed', () => {
  // console.log('products:changed');

  const cards = productsModel.products.map(item => new GalleryItem(cloneTemplate('#card-catalog'), item, events).render());
  page.renderGallery(cards);
  page.renderBasket(0);
});

events.on('basket:changed', () => {
  // console.log('basket:changed');

  page.renderBasket(basketModel.products.length);
  const basketCards = basketModel.products.map((item, index) => new BasketItem(cloneTemplate('#card-basket'), item, index + 1, events).render());
  basket.products = basketCards;
  basket.setTotalPrice(basketModel.getTotal());
  basket.render();
});

events.on('order:changed', () => {
  // console.log('order:changed');
});

events.on('modal:opened', () => {
  // console.log('modal:opened');

  page.lock(true);
});

events.on('modal:closed', () => {
  // console.log('modal:closed');

  page.lock(false);
});

events.on('modal:close-request', () => {
  // console.log('modal:close-request');

  modal.close();
});

events.on('card-preview:opened', ({ id }: { id: string }) => {
  // console.log('card-preview:opened');

  const card = productsModel.getProduct(id);
  const cardPreview = new CardPreview(cloneTemplate('#card-preview'), card, basketModel.isInBasket(id), events);
  modal.content = cardPreview.render();
  modal.open();
});

events.on('basket:opened', () => {
  // console.log('basket:opened');

  modal.content = basket.render();
  modal.open();
});

events.on('product:added', ({ id }: { id: string }) => {
  // console.log('product:added');

  const product = productsModel.getProduct(id);
  basketModel.addProduct(product);
});

events.on('product:removed', ({ id }: { id: string }) => {
  // console.log('product:removed');

  basketModel.removeProduct(id);
});

events.on('order:opened', () => {
  // console.log('order:opened');

  paymentForm.clearForm();
  modal.content = paymentForm.render();
});

events.on('order:payment-updated', ({ payment, address }: { payment: PaymentMethod, address: string }) => {
  // console.log('order:payment-updated');

  orderModel.setPayment({ payment, address });
  contactsForm.clearForm();
  modal.content = contactsForm.render();
});

events.on('order:contacts-updated', ({ email, phone }: { email: string, phone: string }) => {
  // console.log('order:constants-updated');

  orderModel.setContacts({ email, phone });

  api.postOrder({
    ...orderModel.order,
    items: basketModel.getOrderItemsIDs(),
    total: basketModel.getTotal()
  })
    .then(data => {
      success.setDescription(data.total);
      modal.content = success.render();
      basketModel.clearBasket();
    })
    .catch(err => console.error(err));
});

