import { IOrderData } from "../../types";
import { IOrderModel } from "../../types/model/types";
import { IEvents } from "../base/events";

export class OrderModel implements IOrderModel {
  protected _order: IOrderData = {
    payment: 'card',
    address: '',
    email: '',
    phone: '',
  };

  constructor(protected events: IEvents) { }

  get order(): IOrderData {
    return this._order;
  }

  setPayment(data: Pick<IOrderData, "payment" | "address">): void {
    this._order.payment = data.payment;
    this._order.address = data.address;

    this.events.emit('order:changed');
  }

  setContacts(data: Pick<IOrderData, "email" | "phone">): void {
    this._order.email = data.email;
    this._order.phone = data.phone;

    this.events.emit('order:changed');
  }
}
