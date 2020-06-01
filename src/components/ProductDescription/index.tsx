import "./scss/index.scss";

import isEqual from "lodash/isEqual";
import * as React from "react";

import { ProductVariantPicker } from "@components/organisms";
import {
  ProductDetails_product_pricing,
  ProductDetails_product_variants,
  ProductDetails_product_variants_pricing,
} from "@sdk/queries/gqlTypes/ProductDetails";
import { IProductVariantsAttributesSelectedValues, ITaxedMoney } from "@types";

import { ICheckoutModelLine } from "@sdk/helpers";
import { TaxedMoney } from "../../@next/components/containers";
import AddToCart from "./AddToCart";
import { QuantityTextField } from "./QuantityTextField";

const LOW_STOCK_QUANTITY = 5;
interface ProductDescriptionProps {
  productId: string;
  productVariants: ProductDetails_product_variants[];
  name: string;
  pricing: ProductDetails_product_pricing;
  items: ICheckoutModelLine[];
  queryAttributes: Record<string, string>;
  addToCart(varinatId: string, quantity?: number): void;
  setVariantId(variantId: string);
  onAttributeChangeHandler(slug: string | null, value: string): void;
}

interface ProductDescriptionState {
  quantity: number;
  variant: string;
  variantStock: number;
  variantPricing: ProductDetails_product_variants_pricing;
  variantPricingRange: {
    min: ITaxedMoney;
    max: ITaxedMoney;
  };
}

class ProductDescription extends React.Component<
  ProductDescriptionProps,
  ProductDescriptionState
> {
  constructor(props: ProductDescriptionProps) {
    super(props);

    this.state = {
      quantity: 1,
      variant: "",
      variantPricing: null,
      variantPricingRange: {
        max: props.pricing.priceRange.stop,
        min: props.pricing.priceRange.start,
      },
      variantStock: null,
    };
  }

  getProductPrice = () => {
    const { variantPricingRange, variantPricing } = this.state;

    const { min, max } = variantPricingRange;
    if (variantPricing) {
      if (isEqual(variantPricing.priceUndiscounted, variantPricing.price)) {
        return <TaxedMoney taxedMoney={variantPricing.price} />;
      } else {
        return (
          <>
            <span className="product-description__undiscounted_price">
              <TaxedMoney taxedMoney={variantPricing.priceUndiscounted} />
            </span>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <TaxedMoney taxedMoney={variantPricing.price} />
          </>
        );
      }
    }
    if (isEqual(min, max)) {
      return <TaxedMoney taxedMoney={min} />;
    } else {
      return (
        <>
          <TaxedMoney taxedMoney={min} /> - <TaxedMoney taxedMoney={max} />
        </>
      );
    }
  };

  onVariantPickerChange = (
    _selectedAttributesValues?: IProductVariantsAttributesSelectedValues,
    selectedVariant?: ProductDetails_product_variants
  ) => {
    if (selectedVariant) {
      this.setState({
        variant: selectedVariant.id,
        variantPricing: selectedVariant.pricing,
        variantStock: selectedVariant.quantityAvailable,
      });
      this.props.setVariantId(selectedVariant.id);
    } else {
      this.setState({ variant: "", variantPricing: null });
      this.props.setVariantId("");
    }
  };

  canAddToCart = () => {
    const { items } = this.props;
    const { variant, quantity, variantStock } = this.state;

    const cartItem = items?.find(item => item.variant.id === variant);
    const syncedQuantityWithCart = cartItem
      ? quantity + (cartItem?.quantity || 0)
      : quantity;
    return quantity !== 0 && variant && variantStock >= syncedQuantityWithCart;
  };

  handleSubmit = () => {
    this.props.addToCart(this.state.variant, this.state.quantity);
    this.setState({ quantity: 0 });
  };

  getAvailableQuantity = () => {
    const { items } = this.props;
    const { variant, variantStock } = this.state;

    const cartItem = items?.find(item => item.variant.id === variant);
    const quantityInCart = cartItem?.quantity || 0;
    return variantStock - quantityInCart;
  };

  handleQuantityChange = (quantity: number) => {
    this.setState({
      quantity,
    });
  };

  renderErrorMessage = (message: string) => (
    <p className="product-description__error-message">{message}</p>
  );

  render() {
    const { name } = this.props;
    const { variant, variantStock, quantity } = this.state;

    const availableQuantity = this.getAvailableQuantity();
    const isOutOfStock = !!variant && variantStock === 0;
    const isNoItemsAvailable = !!variant && !isOutOfStock && !availableQuantity;
    const isLowStock =
      !!variant &&
      !isOutOfStock &&
      !isNoItemsAvailable &&
      availableQuantity < LOW_STOCK_QUANTITY;

    return (
      <div className="product-description">
        <h3>{name}</h3>
        {isOutOfStock ? (
          this.renderErrorMessage("Out of stock")
        ) : (
          <h4>{this.getProductPrice()}</h4>
        )}
        {isLowStock && this.renderErrorMessage("Low stock")}
        {isNoItemsAvailable && this.renderErrorMessage("No items available")}
        <div className="product-description__variant-picker">
          <ProductVariantPicker
            productVariants={this.props.productVariants}
            onChange={this.onVariantPickerChange}
            selectSidebar={true}
            queryAttributes={this.props.queryAttributes}
            onAttributeChangeHandler={this.props.onAttributeChangeHandler}
          />
        </div>
        <div className="product-description__quantity-input">
          <QuantityTextField
            quantity={quantity}
            maxQuantity={availableQuantity}
            disabled={isOutOfStock || isNoItemsAvailable}
            onQuantityChange={this.handleQuantityChange}
            hideErrors={!variant || isOutOfStock || isNoItemsAvailable}
          />
        </div>
        <AddToCart
          onSubmit={this.handleSubmit}
          disabled={!this.canAddToCart()}
        />
     <div className="container">
  <div className="interior">
    <a  href="#open-modal" className="under"><button class="btn third">View Size Chart</button></a>
  </div>
</div>
<div id="open-modal" className="modal-window">
  <div>
    <a href="#" title="Close" className="modal-close">X</a>
    <span className="mysize"> WOMEN`S SIZE CHART (Measurements in inches)</span>
    <div className="content">
    
            <table>
  <thead>
    <tr> 
      <th  className="cont">SIZE  (UK/USA)  </th>
      <th  className="cont">BUST</th>
      <th  className="cont">WAIST</th>
      <th className="cont" >HIP </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-column="First Name">UK4 / US0</td>
      <td data-column="Last Name">31</td>
      <td data-column="Job Title">23.5</td>
      <td data-column="Twitter">33</td>
    </tr>
    <tr>
      <td data-column="First Name">UK6 / US2</td>
      <td data-column="Last Name">32</td>
      <td data-column="Job Title">24.5</td>
      <td data-column="Twitter">34</td>
    </tr>
    <tr>
      <td data-column="First Name">UK8 / US4</td>
      <td data-column="Last Name">33</td>
      <td data-column="Job Title">25.5</td>
      <td data-column="Twitter">35</td>
    </tr>
    <tr>
      <td data-column="First Name">UK10 / US6</td>
      <td data-column="Last Name">35</td>
      <td data-column="Job Title">27.5</td>
      <td data-column="Twitter">37</td>
    </tr>
    <tr>
      <td data-column="First Name">UK12 / US8</td>
      <td data-column="Last Name">37</td>
      <td data-column="Job Title">29.5</td>
      <td data-column="Twitter">39</td>
    </tr>
        <tr>
      <td data-column="First Name">UK14 / US10</td>
      <td data-column="Last Name">39</td>
      <td data-column="Job Title">31.5</td>
      <td data-column="Twitter">41</td>
    </tr>
        <tr>
      <td data-column="First Name">UK16 / US12</td>
      <td data-column="Last Name">41</td>
      <td data-column="Job Title">33.5</td>
      <td data-column="Twitter">43</td>
    </tr>
 
            <tr>
      <td data-column="First Name">UK18 / US14</td>
      <td data-column="Last Name">43.5</td>
      <td data-column="Job Title">36</td>
      <td data-column="Twitter">45.5</td>
    </tr>
            <tr>
      <td data-column="First Name">UK20 / US16</td>
      <td data-column="Last Name">46.5</td>
      <td data-column="Job Title">39</td>
      <td data-column="Twitter">48.5</td>
    </tr>
            <tr>
      <td data-column="First Name">UK22 / US18</td>
      <td data-column="Last Name">49</td>
      <td data-column="Job Title">41.5</td>
      <td data-column="Twitter">51</td>
    </tr>
              <tr>
      <td data-column="First Name">UK24 / US20</td>
      <td data-column="Last Name">52</td>
      <td data-column="Job Title">44.5</td>
      <td data-column="Twitter">54</td>
    </tr>
  </tbody>
</table>
            </div>
 
 
  </div>
    </div>
      </div>

    );


  }
}

export default ProductDescription;
