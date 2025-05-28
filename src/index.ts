import { AppApi } from './components/base/AppApi';
import { BasketModel } from './components/model/BasketModel';
import { ProductsModel } from './components/model/ProductsModel';
import './scss/styles.scss';
import { API_URL } from './utils/constants';

const api = new AppApi(API_URL);
const productsModel = new ProductsModel();
const basketModel = new BasketModel();

api.getProductList()
  .then(data => {
    productsModel.products = data.items;
    console.log(productsModel.products)

    const test = productsModel.getProduct('c101ab44-ed99-4a54-990d-47aa2bb4e7d9');
    basketModel.addProduct(test);
    console.log(basketModel.isInBasket(test.id));
  })
  .catch(err => console.log(err))



