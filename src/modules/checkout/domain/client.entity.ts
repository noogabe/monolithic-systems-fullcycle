import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

type ClientProps = {
  id?: Id;
  name: string;
  email: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
};

export class Client extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _email: string;
  private _street: string;
  private _number: string;
  private _complement: string;
  private _city: string;
  private _state: string;
  private _zipCode: string;

  constructor(props: ClientProps) {
    super(props.id);
    this._name = props.name;
    this._email = props.email;
    this._street = props.street;
    this._number = props.number;
    this._complement = props.complement;
    this._city = props.city;
    this._state = props.state;
    this._zipCode = props.zipCode;
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }

  get street() {
    return this._street;
  }

  get number() {
    return this._number;
  }

  get complement() {
    return this._complement;
  }

  get city() {
    return this._city;
  }

  get state() {
    return this._state;
  }

  get zipCode() {
    return this._zipCode;
  }
}