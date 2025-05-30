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

const api = new AppApi(API_URL);
const productsModel = new ProductsModel();
const basketModel = new BasketModel();

const page = new Page(document.querySelector('.page'));
const modal = new Modal(document.querySelector('#modal-container'));
const basket = new Basket(cloneTemplate('#basket'));

api.getProductList()
  .then(data => {
    productsModel.products = data.items;

    const test = productsModel.getProduct('c101ab44-ed99-4a54-990d-47aa2bb4e7d9');

    const cards = productsModel.products.map(item => new GalleryItem(cloneTemplate('#card-catalog'), item).render());
    page.renderGallery(cards);
    page.renderBasket(0);

    const testPrev = new CardPreview(cloneTemplate('#card-preview'), test);
    modal.content = testPrev.render();

    productsModel.products.forEach(item => basketModel.addProduct(item));
    page.renderBasket(basketModel.products.length);

    const basketCards = basketModel.products.map(item => new BasketItem(cloneTemplate('#card-basket'), item).render());
    basket.products = basketCards;
    basket.setTotalPrice(basketModel.getTotal());

    modal.content = basket.render();

    modal.open();
    page.lock(true);
  })
  .catch(err => console.error(err))
